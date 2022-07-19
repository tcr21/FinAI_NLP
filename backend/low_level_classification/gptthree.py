import os

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") 

# for params
import sys
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../parameters_backend'))
from parameters import gpt_model_name_param_str, gpt_temperature_param_flt, gpt_prompts_param_dict, route_names_param_dict



def get_response_gpt(user_input_json, res_bert):
    response = openai.Completion.create(
        model=gpt_model_name_param_str,
        prompt=generate_prompt(user_input_json, res_bert),
        temperature=gpt_temperature_param_flt,
    )
    response_value = response['choices'][0]['text']
    return response_value

def generate_prompt(user_input_json, res_bert):
    user_input = user_input_json['message']['message']
    if res_bert == route_names_param_dict[1]:
        return gpt_prompts_param_dict[1].format(
        user_input.capitalize()
        )
    elif res_bert == route_names_param_dict[2]:
        return gpt_prompts_param_dict[2].format(
            user_input.capitalize()
            )
    elif res_bert == route_names_param_dict[3]:
        return gpt_prompts_param_dict[3].format(
            user_input.capitalize()
            )
    else:
        return """Account: {} 
        Please just say the following: 
        Sorry, something went wrong""".format(
            user_input.capitalize()
            )

