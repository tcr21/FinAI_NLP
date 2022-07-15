# for data 
import pandas as pd
from sklearn import metrics
# other
import random

def generate_similarity_matrix_text_input(mean_vecs_clusters_dict, mean_vec_text_input, text_input_clean):
    # Create text input column
    similarity_matrix_text_input_dtf = pd.DataFrame(columns=["Input"])
    # Create 1 column per route
    for cluster, cluster_vector in mean_vecs_clusters_dict.items():
        similarity_matrix_text_input_dtf[cluster] = ""
    
    # Calculate cosine similarity scores by cluster
    keys_clst = list(mean_vecs_clusters_dict.keys())
    similarity_matrix_text_input_dtf.loc[len(similarity_matrix_text_input_dtf.index)] = [text_input_clean,  
    metrics.pairwise.cosine_similarity([mean_vec_text_input], [mean_vecs_clusters_dict.get(keys_clst[0])]),
    metrics.pairwise.cosine_similarity([mean_vec_text_input], [mean_vecs_clusters_dict.get(keys_clst[1])]),
    metrics.pairwise.cosine_similarity([mean_vec_text_input], [mean_vecs_clusters_dict.get(keys_clst[2])])]

    # Create 1 column per route for rescaling
    for cluster, cluster_vector in mean_vecs_clusters_dict.items():
        similarity_matrix_text_input_dtf["Rescaled: "+cluster] = ""
    # Create 1 column for predicted label
    similarity_matrix_text_input_dtf["Predicted"] = ""
    # Rescale & set prediction
    for i in range(len(similarity_matrix_text_input_dtf.index)):
        # If all 3 route scores = 0, then assign 1 to random route in the rescaled columns
        similarity_matrix_text_input_dtf.iloc[i,1:4][0] = int(similarity_matrix_text_input_dtf.iloc[i,1:4][0])
        if sum(similarity_matrix_text_input_dtf.iloc[i,1:4]) == 0: # Note: sum does work
            random_assigned_index = random.randint(4, 6) # Note: not tested
            similarity_matrix_text_input_dtf.iloc[i,random_assigned_index] = 1
        # Track max score
        max_score = 0
        max_pred = ""
        # For each cluster score column (cols 1, 2, 3)
        for j in range(1, 4):
            # Add rescaled scores to 3 empty rescaled score columns. Note: rescaling does work
            similarity_matrix_text_input_dtf.iloc[i,j+3] = similarity_matrix_text_input_dtf.iloc[i,j] / sum(similarity_matrix_text_input_dtf.iloc[i,1:4])
            # Determine highest score: right now using initial highest score (not scaled one, but should be the same) 
            if similarity_matrix_text_input_dtf.iloc[i,j][0] > max_score:
                max_score = similarity_matrix_text_input_dtf.iloc[i,j][0] 
                max_pred = similarity_matrix_text_input_dtf.columns[j] 
        # TO DO: set min for max_score (if below a certain threshold then get user to pick path themselves)
        # Set prediction based on highest score
        similarity_matrix_text_input_dtf.iloc[i, 7] = max_pred

    return similarity_matrix_text_input_dtf

def generate_similarity_matrix_training_data(mean_vecs_clusters_dict, mean_vecs_training_data_dict, dtf_training_data):

    # TO DO: Refactor code duplication with above (differences: for loop metrics pairwise, truth label at end)
    
    # Create text input column
    similarity_matrix_training_data_dtf = pd.DataFrame(columns=["Input"])
    # Create 1 column per route
    for cluster, cluster_vector in mean_vecs_clusters_dict.items():
        similarity_matrix_training_data_dtf[cluster] = ""
    
    # Calculate cosine similarity scores by cluster
    keys_clst = list(mean_vecs_clusters_dict.keys())
    for input, input_vector in mean_vecs_training_data_dict.items():
        similarity_matrix_training_data_dtf.loc[len(similarity_matrix_training_data_dtf.index)] = [input,  
        metrics.pairwise.cosine_similarity([input_vector], [mean_vecs_clusters_dict.get(keys_clst[0])]),
        metrics.pairwise.cosine_similarity([input_vector], [mean_vecs_clusters_dict.get(keys_clst[1])]),
        metrics.pairwise.cosine_similarity([input_vector], [mean_vecs_clusters_dict.get(keys_clst[2])])]

    # Create 1 column per route for rescaling
    for cluster, cluster_vector in mean_vecs_clusters_dict.items():
        similarity_matrix_training_data_dtf["Rescaled: "+cluster] = ""
    # Create 1 column for predicted label
    similarity_matrix_training_data_dtf["Predicted"] = ""
    # Rescale & set prediction
    for i in range(len(similarity_matrix_training_data_dtf.index)):
        # If all 3 route scores = 0, then assign 1 to random route in the rescaled columns
        similarity_matrix_training_data_dtf.iloc[i,1:4][0] = int(similarity_matrix_training_data_dtf.iloc[i,1:4][0])
        if sum(similarity_matrix_training_data_dtf.iloc[i,1:4]) == 0: # Note: sum does work
            random_assigned_index = random.randint(4, 6) # Note: not tested
            similarity_matrix_training_data_dtf.iloc[i,random_assigned_index] = 1
        # Track max score
        max_score = 0
        max_pred = ""
        # For each cluster score column (cols 1, 2, 3)
        for j in range(1, 4):
            # Add rescaled scores to 3 empty rescaled score columns. Note: rescaling does work
            similarity_matrix_training_data_dtf.iloc[i,j+3] = similarity_matrix_training_data_dtf.iloc[i,j] / sum(similarity_matrix_training_data_dtf.iloc[i,1:4])
            # Determine highest score: right now using initial highest score (not scaled one, but should be the same) 
            if similarity_matrix_training_data_dtf.iloc[i,j][0] > max_score:
                max_score = similarity_matrix_training_data_dtf.iloc[i,j][0] 
                max_pred = similarity_matrix_training_data_dtf.columns[j] 
        # TO DO: set min for max_score (if below a certain threshold then get user to pick path themselves)
        # Set prediction based on highest score
        similarity_matrix_training_data_dtf.iloc[i, 7] = max_pred

    # Create 1 column for true label
    similarity_matrix_training_data_dtf["True"] = dtf_training_data["category"]

    return similarity_matrix_training_data_dtf


