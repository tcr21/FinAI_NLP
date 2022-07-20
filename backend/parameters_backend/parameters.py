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

# GPT PROMPTS------------------------------------------

gpt_prompts_param_dict = {
    1: """Solutions: finance products; banking; saving; borrowing; 
        Account: I want to learn about products in finance
        Solution: finance products
        Account: I want to learn about how to save money
        Solution: saving
        Account: {}
        Solution:
        
        """,
    2: """Solutions: Budgeting calculator; Interest rate calculator
        Account: I need help with my personal finances especially a budgeting and saving
        Solution: Budget calculator
        Account: I need help with my personal finances especially loans and interest rates
        Solution: Loan calculator
        Account: {}
        Solution:
        
        """,
    3: """If this person is in danger and needs to call an emergency contact, say: Please contact an emergency number.
        Account: {}
            """, 
}

