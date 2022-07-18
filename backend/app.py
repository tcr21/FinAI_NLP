import os 
import sys
import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask_cors import CORS, cross_origin

# Import bert
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, './high_level_classification'))
# TO DO: why does this show + using cash (this is not normal, bert etc warning) here, without get_bert_response even being called?
print("TEST: bertmodel.py has just been imported!") 
from bertmodel import get_response_bert

# Import gpt3
sys.path.append(os.path.join(dirname, './low_level_classification'))
from gptthree import get_response_gpt

# CORS error handling
app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

# Get gpt key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/", methods=("GET", "POST"))
@cross_origin()
def start():
    print("TEST: start() function is running...")
    if request.method == "POST":
        user_input_json =  request.json # Get message value from callServer
        res_bert = get_response_bert(user_input_json)
        res_gpt = get_response_gpt(user_input_json, res_bert)
        res = jsonify(route=res_bert, service=res_gpt)
        print("TEST: done running get_bert_response!")
        return res
