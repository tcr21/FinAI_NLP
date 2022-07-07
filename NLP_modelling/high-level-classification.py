# Test : unable to download tensorflow for now (M1 issues)
# import tensorflow as tf
# print(tf. __version__) 

#===============================================================

## for data
import json
import pandas as pd
import numpy as np
from sklearn import metrics, manifold

# for processing
import torch
print(torch.__version__)
import re
import nltk

# for plotting
import matplotlib.pyplot as plt
import seaborn as sns
# for w2v
import gensim
import gensim.downloader as gensim_api
# for bert
import transformers

import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# nltk.download()

# # #===============================================================
# # READ IN DATA

# # Note for encoding error
# # df = pd.read_csv(datapath, encoding='ISO-8859-1')

# lst_dics = []
# # TO DO: TR to create data (untagged, is for evaluation only)
# with open('News_Category_Dataset_v2.json', mode='r', errors='ignore') as json_file:
#     for dic in json_file:
#         lst_dics.append( json.loads(dic) )

# # print the first one
# print(lst_dics[0])

# ## create dtf
# dtf = pd.DataFrame(lst_dics)

# # TO DO: remove filter, rename - when input own data
# ## filter categories
# dtf = dtf[ dtf["category"].isin(['ENTERTAINMENT','POLITICS','TECH'])        ][["category","headline"]]
# ## rename columns
# dtf = dtf.rename(columns={"category":"y", "headline":"text"})
# # print 5 random rows
# print(dtf.sample(5))

# # CLEAN DATA. TO DO: there should be a better way of doing this with Pytorch (eg with a preprocess URL)
# '''
# Preprocess a string.
# :parameter
#     :param text: string - name of column containing text
#     :param lst_stopwords: list - list of stopwords to remove
#     :param flg_stemm: bool - whether stemming is to be applied
#     :param flg_lemm: bool - whether lemmitisation is to be applied
# :return
#     cleaned text
# '''
# def utils_preprocess_text(text, flg_stemm=False, flg_lemm=True, lst_stopwords=None):
#     ## clean (convert to lowercase and remove punctuations and characters and then strip)
#     text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
            
#     ## Tokenize (convert from string to list)
#     lst_text = text.split()    
#     ## remove Stopwords
#     if lst_stopwords is not None:
#         lst_text = [word for word in lst_text if word not in 
#                     lst_stopwords]
                
#     ## Stemming (remove -ing, -ly, ...)
#     if flg_stemm == True:
#         ps = nltk.stem.porter.PorterStemmer()
#         lst_text = [ps.stem(word) for word in lst_text]
                
#     ## Lemmatisation (convert the word into root word)
#     if flg_lemm == True:
#         lem = nltk.stem.wordnet.WordNetLemmatizer()
#         lst_text = [lem.lemmatize(word) for word in lst_text]
            
#     ## back to string from list
#     text = " ".join(lst_text)
#     return text

# Create stop words
nltk.download('stopwords')
lst_stopwords = nltk.corpus.stopwords.words("english")
print(lst_stopwords)


