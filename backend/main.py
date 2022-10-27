# APP ENGINE
import requests
import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

# Import bert
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, './high_level_classification'))
# from bertmodel import get_response_bert # delegated to VM

# Import gpt3
sys.path.append(os.path.join(dirname, './low_level_classification'))
from gptthree import get_response_gpt

# Import mfi list processing
sys.path.append(os.path.join(dirname, './mfi_upload'))
from mfi_process import get_mfi_list

# CORS error handling
app = Flask(__name__)
cors = CORS(app) 
app.config["CORS_HEADERS"] = "Content-Type"

# TEST
print("TEST: Server is up and running...")


@app.route("/", methods=("GET", "POST")) 
@cross_origin([]) # Insert frontend host addresses (3)
def start():
    print("TEST: start() function is running...")
    if request.method == "POST":
        user_input_json = request.json  # Get message value from callServer
        print("TEST user_input_json: ", user_input_json)
        # App Engine posting to VM private IP----------------------------------------------------------------------------
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




# FOR REFERENCE: VM VERSION OF START FUNCTION ----------------------------------------------------------------------------
# @app.route("/", methods=("GET", "POST"))
# @cross_origin([/* Insert backend service address (1) */]) 
# def start():
#     print("TEST: start() function is running from VM...")
#     if request.method == "POST":
#         print("TEST request from VM: ", request)

#         user_input_json = request.json
#         print("TEST user_input_json  from VM: ", user_input_json)

#         res_bert = get_response_bert(user_input_json)
#         print("TEST: res_bert from VM: ", res_bert)
#         print("TEST: done running get_response_bert from VM!")
#         return res_bert
#     else:
#         return "No post request received on VM"
#----------------------------------------------------------------------------------------------------
