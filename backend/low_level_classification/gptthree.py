import os

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY") 


def get_response_gpt(user_input_json, res_bert):
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_prompt(user_input_json, res_bert),
        temperature=0.0,
    )
    response_value = response['choices'][0]['text']
    return response_value

# TO DO: See guide on prompts: replace animal param
def generate_prompt(user_input_json, res_bert):
    user_input = user_input_json['message']['message']
    if res_bert == "Route 1: Learning":
        return """Solutions: Formal finance; Saving and borrowing
        Account: I want to learn about formal banks
        Solution: Formal finance
        Account: I want to learn about how to save money
        Solution: Saving and borrowing
        Account: {}
        Solution: 
        """.format(
        user_input.capitalize()
        )
    elif res_bert == "Route 2: Personal finance":
        return """Solutions: Budgeting calculator; Interest rate calculator
        Account: I need help with my personal finances especially a budgeting and saving
        Solution: Budget calculator
        Account: I need help with my personal finances especially loans and interest rates
        Solution: Loan calculator
        Account: {}
        Solution:
            """.format(
            user_input.capitalize()
            )
    else:
        return """Can you confirm this person is in danger and needs to call an emergency contact? 
        If yes, say: Please contact an emergency number.
        Account: {}
            """.format(
            user_input.capitalize()
            )
    