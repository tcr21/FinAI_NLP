from os.path import exists 
# for error handling
import ssl
# for data 
import pandas as pd
import numpy as np
# for processing
import torch
# for bert
import transformers

# for params 
import sys
import os
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import bert_tokenizer_transformer_param_str, bert_tokenizer_type_param_str, bert_tokenizer_name_param_str, bert_model_transformer_param_str, bert_model_type_param_str, bert_model_name_param_str  
from parameters import load_new_bert_tokenizer, selected_saved_bert_tokenizer, name_new_bert_tokenizer, load_new_bert_model, selected_saved_bert_model, name_new_bert_model
# ERROR HANDLING ===============================================================

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

def load_bert_tokenizer_and_model(): 
    # Tokenizer
    # Load bert tokenizer if want to / if no saved tokenizer
    if (load_new_bert_tokenizer == True) or (exists(selected_saved_bert_tokenizer) == False):
        bert_tokenizer = torch.hub.load(bert_tokenizer_transformer_param_str, bert_tokenizer_type_param_str, bert_tokenizer_name_param_str, trust_repo=True)    # Download vocabulary from S3 and cache.
        print("TEST bert tokenizer loaded from torch")
        torch.save(bert_tokenizer, name_new_bert_tokenizer)
        print("TEST bert tokenizer saved")
    # If want to use saved tokenizer and have saved tokenizer 
    else: 
        bert_tokenizer = torch.load(selected_saved_bert_tokenizer)
        print("TEST bert tokenizer loaded from saved tokenizers")

    # Model
    # Load bert model if want to / if no saved model
    if (load_new_bert_model == True) or (exists(selected_saved_bert_model) == False):
        bert_model = torch.hub.load(bert_model_transformer_param_str, bert_model_type_param_str, bert_model_name_param_str)    # Download model and configuration from S3 and cache.
        print("TEST bert model loaded from torch")
        torch.save(bert_model, name_new_bert_model)
        print("TEST bert model saved")
    # If want to use saved model and have saved model
    else: 
        bert_model = torch.load(selected_saved_bert_model)
        print("TEST bert model loaded from saved models")
    
    return bert_tokenizer, bert_model



def embed_text_with_bert(text_input_clean, bert_tokenizer, bert_model):
    
    tokenized_text = bert_tokenizer.encode(text_input_clean) # TBC: replace with API call?

    tokenized_text = np.array(tokenized_text)[None,:]  
    
    tokenized_text = torch.from_numpy(tokenized_text) # bert model expects a torch tensor
    
    embedded_text = bert_model(tokenized_text) # TBC: replace with second API call?

    embedded_text_array = embedded_text[0][0][1:-1].detach().numpy() 

    return embedded_text_array

def generate_mean_vector_dict(input_dict, bert_tokenizer, bert_model):
    # merge cluster words into string and into dtf (1 row per cluster)
    dtf_clusters_as_strings = pd.DataFrame(columns=["cluster", "words"])
    # For each cluster in dict
    for k, v in input_dict.items():
        # Join the elements (words) in the array into one big string
        cluster_words_string = " "
        cluster_words_string = cluster_words_string.join(v)
        # print(cluster_words_string)
        # Put cluster word strings into dataframe (one row per cluster)
        dtf_clusters_as_strings.loc[len(dtf_clusters_as_strings.index)] = [k, cluster_words_string]

    # make list
    mean_vecs_clusters_list = [embed_text_with_bert(text, bert_tokenizer, bert_model).mean(0)
            for text in dtf_clusters_as_strings["words"]] 

    # make array
    mean_vecs_clusters_array = np.array(mean_vecs_clusters_list)

    # make dict
    mean_vecs_clusters_dict  = {}
    i = 0
    for k, v in input_dict.items():
        mean_vecs_clusters_dict[k] = mean_vecs_clusters_array[i]
        i = i + 1

    return mean_vecs_clusters_dict 