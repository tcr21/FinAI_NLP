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

# ERROR HANDLING ===============================================================

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

def load_bert_tokenizer_and_model():
    # load model and tokenizer 
    bert_tokenizer = torch.hub.load(bert_tokenizer_transformer_param_str, bert_tokenizer_type_param_str, bert_tokenizer_name_param_str, trust_repo=True)    # Download vocabulary from S3 and cache.
    bert_model = torch.hub.load(bert_model_transformer_param_str, bert_model_type_param_str, bert_model_name_param_str)    # Download model and configuration from S3 and cache.
    return bert_tokenizer, bert_model

def embed_text_with_bert(text_input_clean, bert_tokenizer, bert_model):
    
    tokenized_text = bert_tokenizer.encode(text_input_clean)

    tokenized_text = np.array(tokenized_text)[None,:]  
    
    tokenized_text = torch.from_numpy(tokenized_text) # bert model expects a torch tensor
    
    embedded_text = bert_model(tokenized_text)

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