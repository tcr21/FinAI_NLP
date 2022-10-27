# APP ENGINE
# GCP CHANGES TR
import requests
#------------------------ -----------------------
import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

# Import bert
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, './high_level_classification'))
# from bertmodel import get_response_bert # now delegated to VM

# Import gpt3
sys.path.append(os.path.join(dirname, './low_level_classification'))
from gptthree import get_response_gpt

# Import mfi list processing
sys.path.append(os.path.join(dirname, './mfi_upload'))
from mfi_process import get_mfi_list

# CORS error handling
app = Flask(__name__)
cors = CORS(app) # Changed this TR
app.config["CORS_HEADERS"] = "Content-Type"

# TEST
print("TEST: Server is up and running...")

# TEST
# @app.route("/api")
# @cross_origin()
# def hello():
#     return "World"


@app.route("/", methods=("GET", "POST")) 
@cross_origin([]) # Insert frontend host addresses (3)
def start():
    print("TEST: start() function is running...")
    if request.method == "POST":
        user_input_json = request.json  # Get message value from callServer
        # Add error handling eg is user_input_json = null, return jsonify ({"error" : "no input"})
        print("TEST user_input_json: ", user_input_json)
        # ONGOING GCP CHANGES TR----------------------------------------------------------------------------
        try:
            url = # Insert VM private IP
            req = requests.post(url, json=user_input_json)
            res_bert = req.text
            print("TEST res_bert", res_bert)
        except Exception as e:
            print(e)
            return str(e)
        #----------------------------------------------------------------------------------------------------
        res_gpt = get_response_gpt(user_input_json, res_bert) # Keep this here since it's an API call, so only get_res_bert runs on VM
        res = jsonify(route=res_bert, service=res_gpt)
        print("TEST: done running get_responses!")
        return res
    else:
        return "No post request received"


@app.route("/mfis", methods=("GET", "POST"))
@cross_origin([]) # Insert frontend host addresses (3)
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