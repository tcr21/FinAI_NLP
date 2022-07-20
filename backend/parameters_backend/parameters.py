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
1: "What is your primary concern when it comes to finance?",

2: "How would you describe your financial needs?",

3: "What is your income?",

4: "What are your expenses?"

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

    1.
    2.
    3.
        
    """,
    2: """User answer to questions:
    {}

    Questions for you GPT:
    1.Does this person need help with calculating a monthly budget (Yes or No)?
    2.Does this person need to learn how to save money better (Yes or No)?
    3.Does this person need to get a loan from somewhere (Yes or No)?
    4.Is this person in any physical danger (Yes or No)?

    1.
    2.
    3.
        
    """,
    3: """User answer to questions:
    {}

    Questions for you GPT:
    1.Is this person in danger (Yes or No)?
    2.Is this person physically threatened (Yes or No)?
    3.Should this person go to the police or emergency services (Yes or No)?
    4.Is this person in any physical danger (Yes or No)?

    1.
    2.
    3.

    """, 
    4: """User answer to questions:
    {}

    1.Does this person need to learn about finance (Yes or No)?
    2.Does this person need help with their personal finance (Yes or No)?
    3.Does this person need emergency services(Yes or No)?

    """
}

# FIXED (NOT PARAMETERS UNLIKE OTHERS): TAGS------------------------------------------
# Must be manually updated in all quizzes in database if they change here

tags = {}

# MANUAL UPDATE: YES/NO LOGIC ------------------------------------------
# Must be manually updated here if Questions to GPT change

# Make this a function
# If contains "1. Yes" or "1.Yes" or "1. yes" or "1.yes" OR split by new line?
# For routes 1 and 2, if yes to Q4 then need to send to respond emergency and in frontend, if serviceName = emergency then send to emergency 

# If res_bert = route 1, tag (only one tag poss in frontend atm)
# If res_bert = route 2, serviceName(s) (TBC how to send that across, probs jsonify)
# If res_bert = route 3, 
    # This is to catch any false emergencies so need to say if no to all 3 questions, then make another call to gpt with res_bert as "route4"
    # Otherwise return emergency as serviceName (res_gpt) and it won't be used in frontend anyways
# Else -> If yes to Q1, then route1, if yes to Q2, then route2 --> Ask more Qs and take majority
# TO DO (related to Else): say in front end if routeName (res_bert) is not equal to route1, route2, or route3, then it's = to serviceName and serviceName = route1, 2 or 3 (GPT/yesNo logic will have responded). And then logic in frontend as it is should just display all results for that route
