import os

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") 


def get_response_gpt(user_input_json, res_bert):
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_prompt(user_input_json, res_bert),
        temperature=0.6,
    )
    response_value = response['choices'][0]['text']
    return response_value

# TO DO: See guide on prompts: replace animal param
def generate_prompt(animal, user_input_json, res_bert):
    user_input = user_input_json['message']['message']
    if res_bert == "Route 1: Learning":
            # TO DO : See guide on prompts: how to add both user input and additional prompt
            return user_input + """Is the person more concerned about savings and budget, or about formal finance?
            """.format(
            animal.capitalize()
        )

    elif res_bert == "Route 2: Personal finance":
        # TO DO

    else:
        # TO DO Emergency
    
    
