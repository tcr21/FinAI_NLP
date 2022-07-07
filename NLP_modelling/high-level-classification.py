#===============================================================

## for data
import json
import pandas as pd
import numpy as np
from sklearn import metrics, manifold

# for processing
import torch
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

#===============================================================

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# READ IN DATA===============================================================

with open('initial-data.json', mode='r', errors='ignore') as json_file:
    string = json_file.read()

json_string = json.loads(string)
# print(json_string)

df = pd.DataFrame(json_string)
# print(df)

# PREPROCESS DATA===============================================================
'''
Preprocess a string.
:parameter
    :param text: string - name of column containing user answers
    :param list_stopwords: list - list of stopwords to remove
    :param flag_stemm: bool - whether stemming is to be applied
    :param flag_lemm: bool - whether lemmitisation is to be applied
:return
    cleaned text
'''
def utils_preprocess_text(text, flag_stemm=False, flag_lemm=True, list_stopwords=None):
    ## clean (convert to lowercase and remove punctuations and characters and then strip)
    text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
            
    ## Tokenize (convert from string to list)
    lst_text = text.split()    
    ## remove Stopwords
    if list_stopwords is not None:
        lst_text = [word for word in lst_text if word not in 
                    list_stopwords]
                
    ## Stemming (remove -ing, -ly, ...)
    if flag_stemm == True:
        ps = nltk.stem.porter.PorterStemmer()
        lst_text = [ps.stem(word) for word in lst_text]
                
    ## Lemmatisation (convert the word into root word)
    if flag_lemm == True:
        lem = nltk.stem.wordnet.WordNetLemmatizer()
        lst_text = [lem.lemmatize(word) for word in lst_text]
            
    ## back to string from list
    text = " ".join(lst_text)
    return text

# Create stop words
# nltk.download('stopwords') // Don't need this
list_stopwords = nltk.corpus.stopwords.words("english")
# print(list_stopwords)

df["1. What is your primary concern when it comes to finance?_clean"] = df["1. What is your primary concern when it comes to finance?"].apply(lambda x: 
          utils_preprocess_text(x, flag_stemm=False, flag_lemm=True, 
          list_stopwords=list_stopwords))
# print(df.head())

# CREATE CLUSTERS===============================================================

glove_model = gensim_api.load("glove-wiki-gigaword-300")
# print(glove_model.most_similar(["obama"], topn=3))

# Function to get similar words through glove in order to create clusters
def get_similar_words(list_words, top_number, nlp_model):
    list_out = list_words
    for word_and_similarity in nlp_model.most_similar(list_words, topn=top_number):
        list_out.append(word_and_similarity[0])
    return list(set(list_out))

# Create dictionary {category:[keywords]}
clusters_dict = {}
clusters_dict["Route 1: Learning"] = get_similar_words(['learn','understand','skills','education'], 
                  top_number=30, nlp_model=glove_model)
clusters_dict["Route 2: Personal finance"] = get_similar_words(['loan','need','money','family', 'debt', 'help', 'budget', 'household']
                  , top_number=30, nlp_model=glove_model)
clusters_dict["Route 3: Emergency"] = get_similar_words(['attack','threat','danger', 'death'], 
                   top_number=30, nlp_model=glove_model)
# Print some similar words
# for k,v in clusters_dict.items():
#     print(k, ": ", v[0:30], "...", len(v))

# VISUALISE CLUSTERS===============================================================
## word embedding
all_words = [word for v in clusters_dict.values() for word in v]
X = glove_model[all_words]
        
## pca
pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
X = pca.fit_transform(X)

## create dtf
dtf = pd.DataFrame()
for k,v in clusters_dict.items():
    size = len(dtf) + len(v)
    dtf_group = pd.DataFrame(X[len(dtf):size], columns=["x","y"], 
                             index=v)
    dtf_group["cluster"] = k
    # TO DO: use pd.concat instead somehow (append will be deprecated in future frame version)
    dtf = pd.concat([dtf, dtf_group])
        
## plot
fig, ax = plt.subplots()
sns.scatterplot(data=dtf, x="x", y="y", hue="cluster", ax=ax)
ax.legend().texts[0].set_text(None)
ax.set(xlabel=None, ylabel=None, xticks=[], xticklabels=[], 
       yticks=[], yticklabels=[])
for i in range(len(dtf)):
    ax.annotate(dtf.index[i], 
               xy=(dtf["x"].iloc[i],dtf["y"].iloc[i]), 
               xytext=(5,2), textcoords='offset points', 
               ha='right', va='bottom')

# print(dtf)
# plt.show()

# # MAP DATA (USER ANSWERS) ON CLUSTERS==============================================

# tokenizer = transformers.BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=True)

# bert_model = transformers.TFBertModel.from_pretrained('bert-base-uncased')

# txt = "river bank"
# ## tokenize
# idx = tokenizer.encode(txt)
# print("tokens:", tokenizer.convert_ids_to_tokens(idx))
# print("ids   :", tokenizer.encode(txt))
# ## word embedding
# idx = np.array(idx)[None,:]
# embedding = bert_model(idx)
# print("shape:", embedding[0][0].shape)
# ## vector of the second input word
# embedding[0][0][2]