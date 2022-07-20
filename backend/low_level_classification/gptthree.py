import os

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") 

# for params
import sys
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../parameters_backend'))
from parameters import gpt_model_name_param_str, gpt_temperature_param_flt, gpt_prompts_param_dict


def get_response_gpt(user_input_json, res_bert):
    # TO DO: Insert questions in user input at right places using preprocess function
    # Get cleaner user input from rest bert instead of json?

    # Note: am giving number questions to GPT in prompt so should give numbered answers. If not will need to ask 1 question at a time and make 1 call to openAI server per question (and send same user responses each time)
    response = openai.Completion.create(
        model=gpt_model_name_param_str,
        prompt=generate_prompt(user_input_json, res_bert),
        temperature=gpt_temperature_param_flt,
    )
    response_value = response['choices'][0]['text']
    print("gpt response", response)
    print("gpt response['choices'][0]['text']", response['choices'][0]['text'])
    # TO DO Clean up response value here using yes/no logic function

    return response_value

def generate_prompt(user_input_json, res_bert):
    user_input = user_input_json['messages']['message1'] # TO DO: See above, use cleaned user input
    if res_bert == "route1":
        return gpt_prompts_param_dict[1].format(
        user_input.capitalize()
        )
    elif res_bert == "route2":
        return gpt_prompts_param_dict[2].format(
            user_input.capitalize()
            )
    elif res_bert == "route3":
        return gpt_prompts_param_dict[3].format(
            user_input.capitalize()
            )
    else: # If bert did not classify correctly (or did not meet min threshold similarity) so undefined
        return gpt_prompts_param_dict[4].format(
            user_input.capitalize()
            ) 

# TO DO: evaluate.py evaluate function + call it there


