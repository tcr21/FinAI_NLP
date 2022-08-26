import os
import sys
import numpy as np
import pandas as pd

import openai 
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key ="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"

# for functions
dirname = os.path.dirname(__file__)
from visualise_utilities_gpt import plot_confusion_matrix_gpt, print_evaluation_metrics_gpt
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
    # Read in and preprocess data
    dtf_training_data = read_training_data_into_dtf(data_file_path)
    print("dtf training data-----")
    print(dtf_training_data)

    dtf_results = preprocess_training_data(dtf_training_data)

    # Create and populate gpt res and predicted res
    dtf_results["gpt_res"] = ""
    dtf_results["predicted"] = np.empty((len(dtf_results), 0)).tolist() 
    for i in range(len(dtf_results.index)):
        gpt_response = openai.Completion.create(
        model=gpt_model_name_param_str,
        prompt=generate_prompt(dtf_results.iloc[i][dtf_results.columns.get_loc("input")], dtf_results.iloc[i][dtf_results.columns.get_loc("bert_res")]),
        temperature=gpt_temperature_param_flt,
        )
        # dtf_results["gpt_res"] = gpt_response['choices'][0]['text'] #Old version of below line. Does not change anything results wise, only dtf results printing
        dtf_results.iat[i, dtf_results.columns.get_loc("gpt_res")] = gpt_response['choices'][0]['text']
        dtf_results.iat[i, dtf_results.columns.get_loc("predicted")] = generate_res_based_on_gpt(dtf_results.iat[i, dtf_results.columns.get_loc("gpt_res")], 
        dtf_results.iat[i, dtf_results.columns.get_loc("bert_res")])
        i = i + 1
    
    # Add true column
    dtf_results["true"] = dtf_training_data["subcategory"]

    # In case true and predicted are same list but different order, put them in alphabetical order + add 2 cols with str format for sklearn eval functions
    dtf_results["predicted_str"] = ""
    dtf_results["true_str"] = ""
    for i in range(len(dtf_results.index)):
        dtf_results.iloc[i][dtf_results.columns.get_loc("predicted")] = dtf_results.iloc[i][dtf_results.columns.get_loc("predicted")].sort()
        dtf_results.iloc[i][dtf_results.columns.get_loc("true")] = dtf_results.iloc[i][dtf_results.columns.get_loc("true")].sort()
        dtf_results.iat[i, dtf_results.columns.get_loc("predicted_str")] = ' '.join(dtf_results.iat[i, dtf_results.columns.get_loc("predicted")])
        dtf_results.iat[i, dtf_results.columns.get_loc("true_str")] = ' '.join(dtf_results.iat[i, dtf_results.columns.get_loc("true")])
    
    print("dtf results final-----")
    print(dtf_results) 
    print(dtf_results["bert_res"])
    print(dtf_results["gpt_res"])
    print(dtf_results["predicted"])
    print(dtf_results["true"])

    # Evaluate on "training" data (Note: cannot run Matplotlib GUI when running flask app)
    print_evaluation_metrics_gpt(dtf_results)
    plot_confusion_matrix_gpt(dtf_results)

evaluate_gpt('../../data/test-data.json')