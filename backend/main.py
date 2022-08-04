# ---------------------------------------
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
# ONGOING GCP CHANGES TR (VM)----------------------------------------------------------------------------
@cross_origin(["https://service-7-dot-finance-for-women-3.ew.r.appspot.com/"])
def start():
    print("TEST: start() function is running from VM...")
    if request.method == "POST":
        # Will it decode the data from the request (was sent in byte format, whereas idk if axios sends in different format)
        print("TEST request from VM: ", request)

        user_input_json = request.json
        print("TEST user_input_json  from VM: ", user_input_json)

        res_bert = get_response_bert(user_input_json)
        print("TEST: res_bert from VM: ", res_bert)
        print("TEST: done running get_response_bert from VM!")
        # TO DO: Is it fine to return as is? Or do I need to encode it to bytes again?
        return res_bert
    else:
        return "No post request received on VM"
#----------------------------------------------------------------------------------------------------

# Note: the below is not in use on VM

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
    app.run(host='0.0.0.0', port='5000') #Doesn't seem to work, TO DO: edit in flask env variables