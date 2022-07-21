"""Optimise backend parameters here

BACKEND PARAMETERS==========================

Parameters:
- Glove model name
- Cluster key words
- Cluster size
- Bert model names (tokenizer and model)
- GPT model name, temperature
- User questions
- GPT prompts

Note: route names are not params (just "route1", "route2", "route3") since their names do not impact Bert classification

Note: tags are fixed (since database uses them)

FILES AFFECTED BY BACKEND PARAMETERS==========================

High level classification/
- bert utilities/encode_with_bert : bert tokenizer params, bert model params
- bert utilities/preprocess_data.py : user questions
- glove utilities/generate_clusters : glove model name, (route names), key words, 
cluster size (number of similarity words)

Low level classification/
- gptthree.py : (route names), gpt model name, gpt temperature, gpt prompts

Data/ = Manual updates required
-> Bert training data needs manual updating: (route names)
-> Any GPT training data (on top of prompts) will need manual updating

"""

# GLOVE MODEL NAMES------------------------------------------

from select import select
from regex import F


cluster_model_name_param_str = "glove-wiki-gigaword-300"

# CLUSTER KEY WORDS------------------------------------------

cluster_key_words_param_dict = {1: ['learn','skills','education','teach'], 
2: ['loan','debt','income', 'finance', 'job', 'fired'], 
3: ['danger','attack', 'threat', 'physical']}

# CLUSTER SIZE------------------------------------------

cluster_size_param_dict = {1: 30, 2: 30, 3: 30}

# BERT MODEL NAMES------------------------------------------

bert_tokenizer_transformer_param_str = 'huggingface/pytorch-transformers'
bert_tokenizer_type_param_str = 'tokenizer'
bert_tokenizer_name_param_str = 'bert-base-uncased'

bert_model_transformer_param_str = 'huggingface/pytorch-transformers'
bert_model_type_param_str = 'model'
bert_model_name_param_str = 'bert-base-uncased'

# USER QUESTIONS------------------------------------------
# TO DO: Need to be updated manually in frontend Questions component

user_questions_param_dict = {
'1': "1. What is your primary concern when it comes to finance?",

'2': "2. How would you describe your financial needs?",

'3': "3. What is your income?",

'4': "4. What are your expenses?"

}

# GPT MODEL PARAMS-----------------------------------------

gpt_model_name_param_str = "text-davinci-002"
gpt_temperature_param_flt = 0.1
# TO DO: add Max length, Stop sentences, TopP, Frequency penalty, Presence penalty, Best of

# QUESTIONS TO GPT------------------------------------------
# YES/NO Logic must be manually updated if Qs to GPT change

gpt_prompts_param_dict = {
    1: """User answer to questions:
{}

Questions for you GPT:
1.Does this person need to learn about saving money (Yes or No)?
2.Does this person need to learn about borrowing money (Yes or No)?
3.Does this person need to learn about finance products (Yes or No)?
4.Is this person in any physical danger (Yes or No)?

Answer saying 'Yes' or 'No' only, next to each of the numbers:
1.
2.
3.
4.
        
    """,
    2: """User answer to questions:
{}

Questions for you GPT: 
1.Does this person need help with calculating a monthly budget (Yes or No)?
2.Does this person need to learn how to save money better (Yes or No)?
3.Does this person need to get a loan from somewhere (Yes or No)?
4.Is this person in any physical danger (Yes or No)?

Answer saying 'Yes' or 'No' only, next to each of the numbers:
1.
2.
3.
4.
        
    """,
    3: """User answer to questions:
{}

Questions for you GPT:
1.Is this person in danger (Yes or No)?
2.Is this person physically threatened (Yes or No)?
3.Should this person go to the police or emergency services (Yes or No)?

Answer saying 'Yes' or 'No' only, next to each of the numbers:
1.
2.
3.

    """, 
    4: """User answer to questions:
{}

Questions for you GPT:
1.Does this person need to learn about finance (Yes or No)?
2.Does this person need help with their personal finance (Yes or No)?
3.Does this person need emergency services(Yes or No)?

Answer saying 'Yes' or 'No' only, next to each of the numbers:
1.
2.
3.

    """
}

# FIXED (NOT PARAMETERS UNLIKE OTHERS): TAGS, SERVICE NAMES------------------------------------------
# Tags: Must be manually updated in all quizzes in database if they change here
# Service names: Must be manually updated in front end

tags = {'1': 'saving', '2': 'borrowing', '3': 'finance products', '4': 'banking'}

services = {'1': 'Budget calculator', '2': 'Loan calculator'}

# MANUAL UPDATE: YES/NO LOGIC ------------------------------------------
# Must be manually updated here if Questions to GPT change

def generate_gpt_answers_bool_dict(gpt_res_text, input_num_of_questions_to_gpt):
    gpt_answers_as_bool = {}
    for i in range(1, input_num_of_questions_to_gpt+1): 
        if ((str(i)+". Yes") in gpt_res_text) or ((str(i)+".Yes") in gpt_res_text) or ((str(i)+". yes") in gpt_res_text) or ((str(i)+".yes") in gpt_res_text):
            gpt_answers_as_bool[str(i)] = True
        else:
            gpt_answers_as_bool[str(i)] = False 
    print("TEST gpt_answers_as_bool function:", gpt_answers_as_bool)
    return gpt_answers_as_bool

def generate_res_route1(gpt_res_text, serviceNames):
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 4)
    if gpt_answers_as_bool['4'] == True: # Double check if the person might be in danger
        serviceNames = ['route3']
    else: 
        if gpt_answers_as_bool['1'] == True: 
            serviceNames.append(tags['1'])
        if gpt_answers_as_bool['2'] == True:
            serviceNames.append(tags['2'])
        if gpt_answers_as_bool['3'] == True:
            serviceNames.append(tags['3'])
    if len(serviceNames) == 0:
        for k, v in tags.items():
            serviceNames.append(v)
    serviceNames = list(dict.fromkeys(serviceNames))
    return serviceNames

def generate_res_route2(gpt_res_text, serviceNames):
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 4)
    if gpt_answers_as_bool['4'] == True: # Double check if the person might be in danger
        serviceNames = ['route3']
    else:
        if gpt_answers_as_bool['1'] == True: 
            serviceNames.append(services['1'])
        if gpt_answers_as_bool['2'] == True:
            serviceNames.append(services['1'])
        if gpt_answers_as_bool['3'] == True:
            serviceNames.append(services['2'])
    if len(serviceNames) == 0:
        for k, v in tags.items():
            serviceNames.append(v)
    serviceNames = list(dict.fromkeys(serviceNames))
    return serviceNames

def generate_res_route3(gpt_res_text, serviceNames):
    # If any of responses are true, confirm route3. If none of them are (else), then say unsure if route3
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 3)
    if (gpt_answers_as_bool['1']  == True) or (gpt_answers_as_bool['2']  == True) or (gpt_answers_as_bool['3']  == True):
        serviceNames = ['route3'] 
    else: 
        serviceNames = ['unsure if route3'] 
    return serviceNames 

def generate_res_route_undefined(gpt_res_text, serviceNames):
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 3)
    if (gpt_answers_as_bool['1']  == True) and (gpt_answers_as_bool['2'] != True) and (gpt_answers_as_bool['3'] != True):
        serviceNames = ['route1']
    elif (gpt_answers_as_bool['1'] != True) and (gpt_answers_as_bool['2']  == True) and (gpt_answers_as_bool['3'] != True):
        serviceNames = ['route2']
    elif (gpt_answers_as_bool['1'] != True) and (gpt_answers_as_bool['2'] != True) and (gpt_answers_as_bool['3']  == True):
        serviceNames = ['route3']
    else:
        serviceNames = ['undefined']
    return serviceNames

def generate_res_based_on_gpt(gpt_res_text, res_bert):
    serviceNames = []
    # Different yes/ no logic depending on routes (ie depending on questions to gpt)
    if res_bert == "route1":
        serviceNames = generate_res_route1(gpt_res_text, serviceNames)
        print("TEST serviceNames route1", serviceNames)
    elif res_bert == "route2":
        serviceNames = generate_res_route2(gpt_res_text, serviceNames)
        print("TEST serviceNames route2", serviceNames)
    elif res_bert == "route3": 
        serviceNames = generate_res_route3(gpt_res_text, serviceNames)
        print("TEST serviceNames route3", serviceNames)
    # TO TEST (once have min threshold on Bert. Already set up in frontend)
    else: 
        serviceNames = generate_res_route_undefined(gpt_res_text, serviceNames)
        print("TEST serviceNames undefined", serviceNames)
    return serviceNames

    
