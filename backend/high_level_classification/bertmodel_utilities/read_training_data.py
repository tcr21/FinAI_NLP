import json
import pandas as pd

def read_training_data_into_dtf(data_file_path):
    with open(data_file_path, mode='r', errors='ignore') as json_file:
        string = json_file.read()

    json_string = json.loads(string)

    dtf_training_data = pd.DataFrame(json_string)

    return dtf_training_data