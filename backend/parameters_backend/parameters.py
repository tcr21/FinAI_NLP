"""Optimise backend parameters here

BACKEND PARAMETERS==========================

- Glove model name
- Bert model names (tokenizer and model)
- User questions
- Cluster key words
- Cluster size
- GPT model name, temperature
- GPT prompts

Note: route names are not params (just "route1", "route2", "route3") since their names do not impact Bert classification

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

# BERT MODEL NAMES------------------------------------------

bert_tokenizer_transformer_param_str = 'huggingface/pytorch-transformers'
bert_tokenizer_type_param_str = 'tokenizer'
bert_tokenizer_name_param_str = 'bert-base-uncased'

bert_model_transformer_param_str = 'huggingface/pytorch-transformers'
bert_model_type_param_str = 'model'
bert_model_name_param_str = 'bert-base-uncased'

# USER QUESTIONS------------------------------------------
# Need to be updated manually in frontend Questions component

user_questions_param_dict = {
1: "What is your primary concern when it comes to finance?",

2: "How would you describe your financial needs?",

3: "Please describe your personal situation.",

4: "How would you describe your financial situation?",

5: "What is your income?",

6: "What are your expenses?",

7: "Is there an immediate threat to your life?",
}

# GLOVE MODEL NAMES------------------------------------------

cluster_model_name_param_str = "glove-wiki-gigaword-300"

# CLUSTER KEY WORDS------------------------------------------

cluster_key_words_param_dict = {1: ['learn','skills','education','teach'], 
2: ['loan','debt','income', 'finance', 'job', 'fired'], 
3: ['danger','attack', 'threat', 'physical']}

# CLUSTER SIZE------------------------------------------

cluster_size_param_dict = {1: 30, 2: 30, 3: 30}

# GPT MODEL, TEMP------------------------------------------

gpt_model_name_param_str = "text-davinci-002"
gpt_temperature_param_flt = 0.0

# GPT PROMPTS------------------------------------------

gpt_prompts_param_dict = {
    1: """Solutions: Financial products quiz; Saving and borrowing quiz
        Account: I want to learn about products in finance
        Solution: Financial products quiz
        Account: I want to learn about how to save money
        Solution: Saving and borrowing quiz
        Account: {}
        Solution:""",
    2: """Solutions: Budgeting calculator; Interest rate calculator
        Account: I need help with my personal finances especially a budgeting and saving
        Solution: Budget calculator
        Account: I need help with my personal finances especially loans and interest rates
        Solution: Loan calculator
        Account: {}
        Solution:""",
    3: """If this person is in danger and needs to call an emergency contact, say: Please contact an emergency number.
        Account: {}
            """, 
}

