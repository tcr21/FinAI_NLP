import os
import sys
import numpy as np
import pandas as pd

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)'
openai.api_key = #TO DO WHEN TEST: INPUT AS STRING 

# for functions
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../high_level_classification/bertmodel_utilities'))
from read_data import read_training_data_into_dtf
sys.path.append(os.path.join(dirname, '../gptthree_utilities'))
from preprocess import preprocess_training_data
from generate_prompt import generate_prompt

# for params
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import gpt_model_name_param_str, gpt_temperature_param_flt
from params_generate_res import generate_res_based_on_gpt

def evaluate_gpt(data_file_path):
    dtf_training_data = read_training_data_into_dtf(data_file_path)
    print("dtf training data-----")
    print(dtf_training_data)

    dtf_results = preprocess_training_data(dtf_training_data)

    # Create and populate gpt res and predicted res
    dtf_results["gpt_res"] = ""
    dtf_results["predicted"] = np.empty((len(dtf_results), 0)).tolist() # TO FIX
    for i in range(len(dtf_results.index)):
        gpt_response = openai.Completion.create(
        model=gpt_model_name_param_str,
        prompt=generate_prompt(dtf_results.iloc[i][dtf_results.columns.get_loc("input")], dtf_results.iloc[i][dtf_results.columns.get_loc("bert_res")]),
        temperature=gpt_temperature_param_flt,
        )
        dtf_results["gpt_res"] = gpt_response['choices'][0]['text']

        # TO FIX (note: generate res does give back a list)
        dtf_results.iloc[i][dtf_results.columns.get_loc("predicted")] = generate_res_based_on_gpt(dtf_results.iloc[i][dtf_results.columns.get_loc("gpt_res")], 
        dtf_results.iloc[i][dtf_results.columns.get_loc("bert_res")])
        print("dtf predicted line by line")
        print(dtf_results.iloc[i][dtf_results.columns.get_loc("predicted")])
    
        i = i + 1
        

    print("dtf results final-----")
    print(dtf_results) 
    print(dtf_results["bert_res"])
    print(dtf_results["gpt_res"])
    print(dtf_results["predicted"])

    # TO DO: add true gpt labels to dataset + use evaluate/visualise metrics from bert utilities


evaluate_gpt('../../data/test-data.json')