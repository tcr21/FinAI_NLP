import os 
import sys 

import openai

from flask import Flask, redirect, render_template, request, url_for
from flask_cors import CORS, cross_origin

from low_level_classification.gptthree import get_response

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
@cross_origin()
def start():
    text = "Donkey"
    res = get_response(text)
    ret_val = res['choices'][0]['text']

    return ret_val