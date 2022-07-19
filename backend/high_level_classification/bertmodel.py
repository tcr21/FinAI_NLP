import os
import pandas as pd
import json
# functions 
from bertmodel_utilities.read_data import read_training_data_into_dtf
from bertmodel_utilities.read_data import read_user_input_into_dtf
from bertmodel_utilities.preprocess_data import preprocess_data_dtf
from glovemodel_utilities.generate_clusters import load_glove_model
from glovemodel_utilities.generate_clusters import generate_clusters_dict
from bertmodel_utilities.encode_with_bert import load_bert_tokenizer_and_model
from bertmodel_utilities.encode_with_bert import generate_mean_vector_clusters
from bertmodel_utilities.calculate_cosine_similarity import generate_similarity_matrix_training_data
from bertmodel_utilities.evaluate import print_evaluation_metrics
from bertmodel_utilities.evaluate import plot_confusion_matrix

# =================================================================================

def get_response_bert(user_input_json):
    # Read in & preprocess "training" data (optional)
    dirname = os.path.dirname(__file__)
    dtf_training_data = read_training_data_into_dtf(os.path.join(dirname, '../data/initial-data.json'))
    preprocess_data_dtf(dtf_training_data)
    # Read in & preprocess user input
    dtf_user_input = read_user_input_into_dtf(user_input_json)
    preprocess_data_dtf(dtf_user_input)
    print("TEST: Dtf user input clean-------------------------------")
    print(dtf_user_input)
    
    # Load glove model
    glove_model = load_glove_model()
    print("TEST: Glove model loaded")
    # Create clusters. Note: can call visualise_clusters from within generate_clusters if needed
    glove_clusters_dict = generate_clusters_dict(glove_model)
    
    # Load bert tokenizer and model
    bert_tokenizer, bert_model = load_bert_tokenizer_and_model()
    print("TEST: Bert model and tokenizer loaded")

    # TO FIX FOR MORE THAN 1 COLUMN
    # Embed & get mean vector for "training" data (optional)
    mean_vecs_training_data_dict = generate_mean_vector_clusters(dtf_training_data, bert_tokenizer, bert_model) # TR calls embed text with bert
    print("TEST: mean vecs training data dict")
    print(mean_vecs_training_data_dict)
    # Embed & get mean vector for user input
    mean_vec_user_input_dict = generate_mean_vector_clusters(dtf_user_input, bert_tokenizer, bert_model)
    
    # Embed & get mean vector for clusters
    mean_vecs_clusters_dict = generate_mean_vector_clusters(glove_clusters_dict, bert_tokenizer, bert_model)

    # TO FIX FOR MORE THAN 1 COLUMN
    # Generate similarity score, prediction & truth matrix by "training" data line & cluster (optional)
    similarity_matrix_training_data_dtf = generate_similarity_matrix_training_data(mean_vecs_clusters_dict, mean_vecs_training_data_dict, dtf_training_data)
    # Generate similarity score & prediction matrix between user input and each cluster
    similarity_matrix_user_input_dtf = generate_similarity_matrix_training_data(mean_vecs_clusters_dict, mean_vec_user_input_dict, dtf_user_input)
    print(similarity_matrix_training_data_dtf)
    print(similarity_matrix_user_input_dtf)
    # Classify user input
    response = similarity_matrix_user_input_dtf["Predicted"][0]

    # TO FIX FOR MORE THAN 1 COLUMN
    # Evaluate on "training" data (cannot run Matplotlib GUI when running flask app)
    # print_evaluation_metrics(similarity_matrix_training_data_dtf)
    # plot_confusion_matrix(similarity_matrix_training_data_dtf)

    return response
