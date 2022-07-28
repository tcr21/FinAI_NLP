import os
import pandas as pd; 

dirname = os.path.dirname(__file__)

def get_mfi_list():
    mfi_list_dtf = pd.read_csv(filepath_or_buffer=os.path.join(dirname, '../data/mfis-list.csv'), delimiter=";")
    mfi_list_json = mfi_list_dtf.to_json(orient="table")

    print("MFI list dtf")
    print(mfi_list_dtf)
    print("MFI list json")
    print(mfi_list_json)

    return mfi_list_json; 
