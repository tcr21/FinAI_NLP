import os
import sys
import pandas as pd 

dirname = os.path.dirname(__file__)
# for functions
sys.path.append(os.path.join(dirname, '../../high_level_classification/bertmodel_utilities'))
from preprocess_data import generate_input_data_dict
# for params
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import user_questions_param_dict

def preprocess_user_input(user_input_json):
    # Concatenate questions to user and answers
    user_input_clean = ""
    for k, v in user_questions_param_dict.items():
        user_input_clean += (v + " " + user_input_json['messages']['message'+str(k)] + '\n')
    return user_input_clean

def preprocess_training_data(dtf_training_data):
    dtf_results = pd.DataFrame(columns=["input"])
    # Genereate input data dict
    training_data_dict = generate_input_data_dict(dtf_training_data, "message")
    # Concatenate each user answer with corresponding question
    for k,v in training_data_dict.items():
        j = 0 #answers index
        for j in range(len(v)):
            v[j] = user_questions_param_dict[str(j+1)] + " " + v[j] + "\n"
            j = j + 1
    # For each user in dict, join the elements (questions and answers) in the array into one big string
    for k, v in training_data_dict.items():
        user_questions_answers = " "
        user_questions_answers = user_questions_answers.join(v)
        # Put that big string into dataframe (one row per user)
        dtf_results.loc[len(dtf_results.index)] = [user_questions_answers]

    dtf_results["bert_res"] = dtf_training_data["category"]

    return dtf_results

    
    
    
    