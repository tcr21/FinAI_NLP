"""Optimise backend parameters here

BACKEND PARAMETERS========================== 

Parameters:
- Glove model params
- Cluster params
- Bert model names (tokenizer and model)
- GPT model name, temperature
- User questions
- GPT prompts
- Yes/ no logic in params_generate_res.py

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

# GLOVE MODEL PARAMS------------------------------------------

cluster_model_name_param_str = "glove-wiki-gigaword-300"

load_new_glove_model = False

# Versions for app (bertmodel.py)
# selected_saved_glove_model = 'high_level_classification/glovemodel_utilities/glove_models/glove_model.bin' 
# name_new_glove_model = 'high_level_classification/glovemodel_utilities/glove_models/glove_model.bin'

# Versions for local, for evaluation (evaluate.py) - TO TEST
selected_saved_glove_model = '../glovemodel_utilities/glove_models/glove_model.bin' 
name_new_glove_model = '../glovemodel_utilities/glove_models/glove_model.bin'


# CLUSTER PARAMS------------------------------------------

cluster_key_words_param_dict = {1: ['learn','skills','education','teach'], 
2: ['loan','debt','income', 'finance', 'job', 'fired'], 
3: ['danger','attack', 'threat', 'physical']}

cluster_size_param_dict = {1: 30, 2: 30, 3: 30}

# BERT MODEL PARAMS------------------------------------------

bert_tokenizer_transformer_param_str = 'huggingface/pytorch-transformers'
bert_tokenizer_type_param_str = 'tokenizer'
bert_tokenizer_name_param_str = 'bert-base-uncased'

bert_model_transformer_param_str = 'huggingface/pytorch-transformers'
bert_model_type_param_str = 'model'
bert_model_name_param_str = 'bert-base-uncased'

similarity_min_threshold = 0.5 # note: not scaled

load_new_bert_tokenizer = False 

# Versions for app (bertmodel.py)
# selected_saved_bert_tokenizer = 'high_level_classification/bertmodel_utilities/bert_tokenizers/bert_tokenizer.bin' 
# name_new_bert_tokenizer = 'high_level_classification/bertmodel_utilities/bert_tokenizers/bert_tokenizer.bin' 

# Versions for local, for evaluation (evaluate.py) - TO TEST
selected_saved_bert_tokenizer = '../bertmodel_utilities/bert_tokenizers/bert_tokenizer.bin' 
name_new_bert_tokenizer = '../bertmodel_utilities/bert_tokenizers/bert_tokenizer.bin' 


load_new_bert_model = False 

# Versions for app (bertmodel.py)
# selected_saved_bert_model = 'high_level_classification/bertmodel_utilities/bert_models/bert_model.bin' 
# name_new_bert_model = 'high_level_classification/bertmodel_utilities/bert_models/bert_model.bin'

# Versions for local, for evaluation (evaluate.py) - TO TEST
selected_saved_bert_model = '../bertmodel_utilities/bert_models/bert_model.bin' 
name_new_bert_model = '../bertmodel_utilities/bert_models/bert_model.bin'

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
3.Does this person need to get a loan from somewhere, or learn how to repay their existing loan, or learn about loans in general (Yes or No)?
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

# FIXED (NOT PARAMETERS UNLIKE OTHERS): TAGS & SERVICES------------------------------------------
# Tags: Must be manually updated in all quizzes in database if they change here
# Service names: Must be manually updated in front end

# Route1: below tags, and all combinations
tags = {'1': 'saving', '2': 'borrowing', '3': 'finance products', '4': 'banking'}

# Route2: below services, and all combinations
services = {'1': 'Budget calculator', '2': 'Loan calculator'}

# Route3

route3_options = {'1': 'route3', '2': 'unsure if route3'}

# Undefined

undefined_options = {'1': 'route1', '2': 'route2', '3': 'route3', '4': 'undefined'}

