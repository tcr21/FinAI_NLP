import os
import sys
# for data 
import pandas as pd
from sklearn import metrics
# other
import random
# parameters
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import similarity_min_threshold

def generate_similarity_matrix_dtf(mean_vecs_clusters_dict, mean_vecs_input_data_dict, dtf_input_data, input_dict):
    
    # Create text input column
    similarity_matrix_dtf = pd.DataFrame(columns=["input"])
    # Create 1 column per route
    for cluster, cluster_vector in mean_vecs_clusters_dict.items():
        similarity_matrix_dtf[cluster] = ""
    
    # Calculate cosine similarity scores by cluster, for each user input (ie each row)
    keys_clst = list(mean_vecs_clusters_dict.keys())
    i = 0
    for input, input_vector in mean_vecs_input_data_dict.items():
        # Inputs user input in col 0, score 1 in col 1, score 2 in col 2, score 3 in col 3
        similarity_matrix_dtf.loc[len(similarity_matrix_dtf.index)] = [input_dict[i],  
        metrics.pairwise.cosine_similarity([input_vector], [mean_vecs_clusters_dict.get(keys_clst[0])]),
        metrics.pairwise.cosine_similarity([input_vector], [mean_vecs_clusters_dict.get(keys_clst[1])]),
        metrics.pairwise.cosine_similarity([input_vector], [mean_vecs_clusters_dict.get(keys_clst[2])])]
        i += 1
    
    # Create 1 column per route for rescaling
    for cluster, cluster_vector in mean_vecs_clusters_dict.items():
        similarity_matrix_dtf["rescaled: "+cluster] = ""
    # Create 1 column for predicted label
    similarity_matrix_dtf["predicted"] = ""  

    for i in range(len(similarity_matrix_dtf.index)):
        # Convert cluster score cols from string to int 
        similarity_matrix_dtf.iloc[i,1:4][0] = int(similarity_matrix_dtf.iloc[i,1:4][0])
        # If all 3 route scores = 0, then assign 1 to random route in the rescaled columns
        if sum(similarity_matrix_dtf.iloc[i,1:4]) == 0: # Note: sum does work
            random_assigned_index = random.randint(4, 6) # Note: not tested
            similarity_matrix_dtf.iloc[i,random_assigned_index] = 1
        # Track max score
        max_score = 0
        max_pred = ""
        # For each cluster score column (cols 1, 2, 3)
        for j in range(1, 4):
            # Add rescaled scores to 3 empty rescaled score columns. Note: rescaling does work
            similarity_matrix_dtf.iloc[i,j+3] = similarity_matrix_dtf.iloc[i,j] / sum(similarity_matrix_dtf.iloc[i,1:4])
            # Determine highest score: right now using initial highest score (not scaled one) 
            if similarity_matrix_dtf.iloc[i,j][0] > max_score:
                max_score = similarity_matrix_dtf.iloc[i,j][0] 
                max_pred = similarity_matrix_dtf.columns[j] 
        # TO DO: set min for max_score (if below a certain threshold then return undefined-route and it will go to that component on frontend)
        # Set prediction based on highest score (not scaled)
        if (max_score >= similarity_min_threshold):
            similarity_matrix_dtf.iloc[i, 7] = max_pred
        else:
            similarity_matrix_dtf.iloc[i, 7] = "undefined"

    # Create 1 column for true label for training data 
    if "category" in dtf_input_data:
        similarity_matrix_dtf["true"] = dtf_input_data["category"]
    
    return similarity_matrix_dtf
