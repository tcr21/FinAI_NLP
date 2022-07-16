import os 
import sys

import openai

from flask import Flask, redirect, render_template, request, url_for
from flask_cors import CORS, cross_origin

dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, './high_level_classification'))
# TO DO: why does this show + using cash (this is not normal, bert etc warning) here, without get_bert_response even being called?
print("TEST: bertmodel.py has just been imported!") 
from bertmodel import get_response_bert

sys.path.append(os.path.join(dirname, './low_level_classification'))
from gptthree import get_response_gpt

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/", methods=("GET", "POST"))
@cross_origin()
def start():
    print("TEST: start() function is running...")
    text = "I am being physically harmed by my loan provider"
    res = get_response_bert(text)
    print("TEST: done running get_bert_response!")
    
    # res = get_response_gpt(text)
    # ret_val = res['choices'][0]['text']

    return res
