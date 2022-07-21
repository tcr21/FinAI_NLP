import os
import sys
# for params
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import user_questions_param_dict

def preprocess_user_input(user_input_json):
    # Concatenate questions to user and answers
    user_input_clean = ""
    for k, v in user_questions_param_dict.items():
        user_input_clean += (v + " " + user_input_json['messages']['message'+str(k)] + '\n')
    return user_input_clean