import os
import sys

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") 

# for functions
from gptthree_utilities.generate_prompt import generate_prompt
from gptthree_utilities.preprocess import preprocess_user_input
# for params
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../parameters_backend'))
from parameters import gpt_model_name_param_str, gpt_temperature_param_flt
from params_generate_res import generate_res_based_on_gpt


def get_response_gpt(user_input_json, res_bert):

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






