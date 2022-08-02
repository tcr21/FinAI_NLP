import os
import sys
import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask_cors import CORS, cross_origin

# Import bert
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, './high_level_classification'))
from bertmodel import get_response_bert

# Import gpt3
sys.path.append(os.path.join(dirname, './low_level_classification'))
from gptthree import get_response_gpt

# Import mfi list processing
sys.path.append(os.path.join(dirname, './mfi_upload'))
from mfi_process import get_mfi_list

# CORS error handling
app = Flask(__name__)
# CORS(app, support_credentials=True)
cors = CORS(app) # Changed this TR
app.config["CORS_HEADERS"] = "Content-Type"
# app.config["CORS_ORIGINS"] = "http://localhost:3000"

# Get gpt key
openai.api_key = os.getenv("OPENAI_API_KEY")

# TEST
print("TEST: Server is up and running...")

# TEST
# @app.route("/api")
# @cross_origin()
# def hello():
#     return "World"


@app.route("/", methods=("GET", "POST"))
# @cross_origin(supports_credentials=True) 
@cross_origin(["finance-for-women.vercel.app", "finance-for-women-tcr21.vercel.app", "localhost"]) # Changed this TR
def start():
    print("TEST: start() function is running...")
    if request.method == "POST":
        user_input_json = request.json  # Get message value from callServer
        # Add error handling eg is user_input_json = null, return jsonify ({"error" : "no input"})
        print("TEST user_input_json: ", user_input_json)
        res_bert = get_response_bert(user_input_json)
        res_gpt = get_response_gpt(user_input_json, res_bert)
        # TO CHECK res_gpt is list of strings so TBC if works
        res = jsonify(route=res_bert, service=res_gpt)
        print("TEST: done running get_responses!")
        return res
    else:
        return "No post request received"


@app.route("/mfis", methods=("GET", "POST"))
# @cross_origin(supports_credentials=True) 
@cross_origin(["finance-for-women.vercel.app", "finance-for-women-tcr21.vercel.app", "localhost"]) # Changed this TR
def returnMfis():
    print("TEST: returnMfis() function is running...")
    if request.method == "POST":
        res = get_mfi_list()
        print("TEST: done retrieving Mfis!")
        return res
    else:
        return "No post request received"

if __name__ == "__main__":
    app.run(debug=True)