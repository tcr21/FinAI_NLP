import os

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") 

# for params
import sys
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../parameters_backend'))
from parameters import gpt_model_name_param_str, gpt_temperature_param_flt, user_questions_param_dict, gpt_prompts_param_dict, generate_res_based_on_gpt


def get_response_gpt(user_input_json, res_bert):
    print("TEST res_bert", res_bert)

    user_input_clean = preprocess_user_input(user_input_json) 
    print("TEST USER INPUT CLEAN from Get resp gpt, preprocess return:")
    print(user_input_clean)
    
    # Note: am giving number questions to GPT in prompt so should give numbered answers. If not will need to ask 1 question at a time and make 1 call to openAI server per question (and send same user responses each time)
    gpt_response = openai.Completion.create(
        model=gpt_model_name_param_str,
        prompt=generate_prompt(user_input_clean, res_bert),
        temperature=gpt_temperature_param_flt,
    )
    print("TEST gpt response['choices'][0]['text']:", gpt_response['choices'][0]['text']) 

    # TO DO: below returns a list of strings (tags or services). Must handle on frontend
    response = generate_res_based_on_gpt(gpt_response['choices'][0]['text'], res_bert)
    print("TEST res based on gpt:", response)

    return response

def generate_prompt(user_input_clean, res_bert):
    if res_bert == "route1":
        print("TEST Sending this to GPT as prompt for route 1: ")
        print(gpt_prompts_param_dict[1].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[1].format(
        user_input_clean.capitalize()
        )
    elif res_bert == "route2":
        print("TEST Sending this to GPT as prompt for route 1: ")
        print(gpt_prompts_param_dict[1].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[2].format(
            user_input_clean.capitalize()
            )
    elif res_bert == "route3":
        print("TEST Sending this to GPT as prompt for route 1: ")
        print(gpt_prompts_param_dict[1].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[3].format(
            user_input_clean.capitalize()
            )
    else: # Not in use. If bert did not classify correctly (did not meet min threshold similarity) so undefined
        return gpt_prompts_param_dict[4].format(
            user_input_clean.capitalize()
            ) 

def preprocess_user_input(user_input_json):
    # Concatenate questions to user and answers
    user_input_clean = ""
    for k, v in user_questions_param_dict.items():
        user_input_clean += (v + " " + user_input_json['messages']['message'+str(k)] + '\n')
    return user_input_clean



# TO DO: evaluate.py evaluate function + call it there


