import os
import sys

# functions
dirname = os.path.dirname(__file__)
from visualise_utilities import print_evaluation_metrics
from visualise_utilities import plot_confusion_matrix
sys.path.append(os.path.join(dirname, '../bertmodel_utilities'))
from read_data import read_training_data_into_dtf
from preprocess_data import preprocess_data_dtf
from preprocess_data import generate_input_data_dict
from encode_with_bert import load_bert_tokenizer_and_model
from encode_with_bert import generate_mean_vector_dict
from calculate_cosine_similarity import generate_similarity_matrix_dtf
sys.path.append(os.path.join(dirname, '../glovemodel_utilities'))
from generate_clusters import load_glove_model
from generate_clusters import generate_clusters_dict

def evaluate_bert(data_file_path):
    # Read in & preprocess "training" data (optional)
    dtf_training_data = read_training_data_into_dtf(os.path.join(dirname, data_file_path))
    preprocess_data_dtf(dtf_training_data)
    print("TEST: Dtf training data preprocessed-------------------------------")
    print(dtf_training_data)

    # Load glove model
    glove_model = load_glove_model()
    print("TEST: Glove model loaded")
    # Create clusters. Note: can call visualise_clusters from within generate_clusters if needed
    glove_clusters_dict = generate_clusters_dict(glove_model)
    print("TEST: Glove clusters dict-------------------------------")
    print(glove_clusters_dict)

    # Create training data dict to prep for embedding
    training_data_dict = generate_input_data_dict(dtf_training_data, "clean")
    print("TEST: Training data dict-------------------------------")
    print(training_data_dict)

    # Load bert tokenizer and model
    bert_tokenizer, bert_model = load_bert_tokenizer_and_model()
    print("TEST: Bert model and tokenizer loaded")

    # Embed & get mean vector for clusters
    mean_vecs_clusters_dict = generate_mean_vector_dict(glove_clusters_dict, bert_tokenizer, bert_model)
    # Embed & get mean vector for "training" data (optional)
    mean_vecs_training_data_dict = generate_mean_vector_dict(training_data_dict, bert_tokenizer, bert_model) # TR calls embed text with bert
    print("TEST: mean vecs training data dict----------------------------")
    print(mean_vecs_training_data_dict)

    # Generate similarity score, prediction & truth matrix by "training" data line & cluster (optional)
    similarity_matrix_training_data_dtf = generate_similarity_matrix_dtf(mean_vecs_clusters_dict, mean_vecs_training_data_dict, dtf_training_data, training_data_dict)
    print("TEST: similarity matrix training data----------------------------")
    print(similarity_matrix_training_data_dtf)

    print("TEST: similarity matrix training data - cols")
    print(similarity_matrix_training_data_dtf["route1"])
    print(similarity_matrix_training_data_dtf["route2"])
    print(similarity_matrix_training_data_dtf["route3"])
    print(similarity_matrix_training_data_dtf["predicted"])

    # Evaluate on "training" data (cannot run Matplotlib GUI when running flask app)
    print_evaluation_metrics(similarity_matrix_training_data_dtf)
    plot_confusion_matrix(similarity_matrix_training_data_dtf)
    

evaluate_bert('../../data/test-data.json')
