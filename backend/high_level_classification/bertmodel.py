import os
# functions 
from bertmodel_utilities.read_data import read_user_input_into_dtf
from bertmodel_utilities.preprocess_data import preprocess_data_dtf
from bertmodel_utilities.preprocess_data import generate_input_data_dict
from glovemodel_utilities.generate_clusters import load_glove_model
from glovemodel_utilities.generate_clusters import generate_clusters_dict
from bertmodel_utilities.encode_with_bert import load_bert_tokenizer_and_model
from bertmodel_utilities.encode_with_bert import generate_mean_vector_dict
from bertmodel_utilities.calculate_cosine_similarity import generate_similarity_matrix_dtf

# =================================================================================

def get_response_bert(user_input_json):
    # Read in & preprocess user input
    dtf_user_input = read_user_input_into_dtf(user_input_json)
    preprocess_data_dtf(dtf_user_input)
    print("TEST: Dtf user input preprocessed-------------------------------")
    print(dtf_user_input)
    
    # Load glove model
    glove_model = load_glove_model()
    print("TEST: Glove model loaded")
    # Create clusters. Note: can call visualise_clusters from within generate_clusters if needed
    glove_clusters_dict = generate_clusters_dict(glove_model)

    # Create user input data dict to prep for embedding
    user_input_dict = generate_input_data_dict(dtf_user_input)

    # Load bert tokenizer and model
    bert_tokenizer, bert_model = load_bert_tokenizer_and_model()
    print("TEST: Bert model and tokenizer loaded")

    # Embed & get mean vector for clusters
    mean_vecs_clusters_dict = generate_mean_vector_dict(glove_clusters_dict, bert_tokenizer, bert_model)
    # Embed & get mean vector for user input
    mean_vec_user_input_dict = generate_mean_vector_dict(user_input_dict, bert_tokenizer, bert_model)

    # Generate similarity score & prediction matrix between user input and each cluster
    similarity_matrix_user_input_dtf = generate_similarity_matrix_dtf(mean_vecs_clusters_dict, mean_vec_user_input_dict, dtf_user_input, user_input_dict)
    print("TEST: similarity matrix user input----------------------------")
    print(similarity_matrix_user_input_dtf)
    
    # Classify user input
    response = similarity_matrix_user_input_dtf["predicted"][0]

    return response
