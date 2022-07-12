#===============================================================

## for data
import json
from tkinter.messagebox import YES
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
                  top_number=10, nlp_model=glove_model)
clusters_dict["Route 2: Personal finance"] = get_similar_words(['loan','need','money','family', 'debt', 'help', 'budget', 'household']
                  , top_number=10, nlp_model=glove_model)
clusters_dict["Route 3: Emergency"] = get_similar_words(['attack','threat','danger', 'death'], 
                   top_number=10, nlp_model=glove_model)
# Print some similar words
# for k,v in clusters_dict.items():
#     print(k, ": ", v[:], "...", len(v))



# VISUALISE CLUSTERS===============================================================
# word embedding
all_words = [word for v in clusters_dict.values() for word in v]
X = glove_model[all_words]
        
## pca
pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
X = pca.fit_transform(X)

print("SHAPE X ===FOR TEST=====")
print(X.shape)
print(X)
print("CLUSTER DICS===== FOR TEST=====")
print(clusters_dict)

# create dtf
dtf = pd.DataFrame()
for k,v in clusters_dict.items():
    size = len(dtf) + len(v)
    dtf_group = pd.DataFrame(X[len(dtf):size], columns=["x","y"], 
                             index=v)
    dtf_group["cluster"] = k
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


# MAP DATA (USER ANSWERS) ON CLUSTERS==============================================

# Tensorflow version - don't use
# // tokenizer = transformers.BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=True)
# // bert_model = transformers.TFBertModel.from_pretrained('bert-base-uncased')

# TORCH: LOAD TOKENIZER
bert_tokenizer = torch.hub.load('huggingface/pytorch-transformers', 'tokenizer', 'bert-base-uncased', trust_repo=True)    # Download vocabulary from S3 and cache.
# Optional
# tokenizer = torch.hub.load('huggingface/pytorch-transformers', 'tokenizer', './test/bert_saved_model/')  # E.g. tokenizer was saved using `save_pretrained('./test/saved_model/')`

# TORCH: LOAD MODEL
bert_model = torch.hub.load('huggingface/pytorch-transformers', 'model', 'bert-base-uncased')    # Download model and configuration from S3 and cache.
# Optional
# bert_model = torch.hub.load('huggingface/pytorch-transformers', 'model', './test/bert_model/')  # E.g. model was saved using `save_pretrained('./test/saved_model/')`
# bert_model = torch.hub.load('huggingface/pytorch-transformers', 'model', 'bert-base-uncased', output_attentions=True)  # Update configuration during loading
# assert bert_model.config.output_attentions == True

# TESTING
# txt = "river bank"
# ## tokenize
# idx = bert_tokenizer.encode(txt)
# print("tokens:", bert_tokenizer.convert_ids_to_tokens(idx))
# print("ids   :", bert_tokenizer.encode(txt))
# ## word embedding
# idx = np.array(idx)[None,:]
# idx = torch.from_numpy(idx) # bert model expects a torch tensor
# embedding = bert_model(idx)
# print("shape:", embedding[0][0].shape)
# ## vector of the second input word
# print(embedding[0][0][2])

# Function to apply to input text and clusters for embedding
def embed_text_with_bert(text, tokenizer, model):
    idx = tokenizer.encode(text)
    idx = np.array(idx)[None,:]  
    idx = torch.from_numpy(idx) # bert model expects a torch tensor
    embedding = model(idx)
    X = embedding[0][0][1:-1].detach().numpy() 
    return X

# Apply to input text
# create list of input text vector
input_text_mean_vecs_list = [embed_text_with_bert(text, bert_tokenizer, bert_model).mean(0) 
                 for text in df["1. What is your primary concern when it comes to finance?_clean"]]
# create the feature matrix (n news x 768)
X = np.array(input_text_mean_vecs_list)

print("INPUT DATA==================")
print(df["1. What is your primary concern when it comes to finance?_clean"])
# print(input_text_mean_vecs_list)
# print("INPUT DATA FEATURE MATRIX=======")
# print(X.shape) # Returned (25, 768) due to 25 data lines
# print(X)

# Apply to clusters 
# clusters_mean_vecs_dict = {k: embed_text_with_bert(v, bert_tokenizer, bert_model).mean(0) for k,v
#          in clusters_dict.items()}
clusters_mean_vecs_list = [embed_text_with_bert(text, bert_tokenizer, bert_model).mean(0)
                for text in dtf]

# create feature matrix
Y = np.array(clusters_mean_vecs_list)

# create clusters dict mean
clusters_mean_vecs_dict = {}
clusters_mean_vecs_dict["Route 1: Learning"] = Y[0]
clusters_mean_vecs_dict["Route 2: Personal finance"] = Y[1]
clusters_mean_vecs_dict["Route 3: Emergency"] = Y[2]

# print("CLUSTER DATAFRAME======")
# print(dtf)
# print("CLUSTER MEAN VECTOR LIST======")
# print(clusters_mean_vecs_list)
# print("CLUSTER FEATURE MATRIX======")
# print(Y.shape) # Returned (3, 768) due to 3 clusters 
# print(Y)
# print("CLUSTER MEAN VECTOR DICT======")
# print(clusters_mean_vecs_dict)


# MODEL ALGORITHM==============================================

# compute cosine similarities
similarities = np.array(
            [metrics.pairwise.cosine_similarity(X, Y)])
            # .T.tolist()[0] 
            #  for y in clusters_mean_vecs_dict.values()] # TO DO. Replace y with category?
            # ).T
print("SIMILARITIES SHAPE=====")
similarities = similarities.reshape(25, 3)
print(similarities.shape)
print(similarities)
# adjust and rescale
labels = list(clusters_mean_vecs_dict.keys()) 
for i in range(len(similarities)):
    # assign randomly if there is no similarity
    if sum(similarities[i]) == 0:
       similarities[i] = [0]*len(labels)
       similarities[i][np.random.choice(range(len(labels)))] = 1
    # rescale so they sum = 1
    similarities[i] = similarities[i] / sum(similarities[i])

# classify the label with highest similarity score
predicted_prob = similarities
predicted = [labels[np.argmax(pred)] for pred in predicted_prob]

print("PREDICTED LABELS========")
print(predicted) 

#TO DO: Output seems odd/ should not be this bad : has data been disordered somehow? Note nothing was categorised as route 1

# EVALUATE=======================================================

y_test = df["category"].values
classes = np.unique(y_test)
y_test_array = pd.get_dummies(y_test, drop_first=False).values

# Accuracy, Precision, Recall
accuracy = metrics.accuracy_score(y_test, predicted)
auc = metrics.roc_auc_score(y_test, predicted_prob, 
                            multi_class="ovr")
print("Accuracy:",  round(accuracy,2))
print("Auc:", round(auc,2))
print("Detail:")
print(metrics.classification_report(y_test, predicted))

# Plot confusion matrix
cm = metrics.confusion_matrix(y_test, predicted)
fig, ax = plt.subplots()
sns.heatmap(cm, annot=True, fmt='d', ax=ax, cmap=plt.cm.Blues, 
            cbar=False)
ax.set(xlabel="Pred", ylabel="True", xticklabels=classes, 
       yticklabels=classes, title="Confusion matrix")
plt.yticks(rotation=0)
fig, ax = plt.subplots(nrows=1, ncols=2)

# Plot roc
for i in range(len(classes)):
    fpr, tpr, thresholds = metrics.roc_curve(y_test_array[:,i],  
                           predicted_prob[:,i])
    ax[0].plot(fpr, tpr, lw=3, 
              label='{0} (area={1:0.2f})'.format(classes[i], 
                              metrics.auc(fpr, tpr))
               )
ax[0].plot([0,1], [0,1], color='navy', lw=3, linestyle='--')
ax[0].set(xlim=[-0.05,1.0], ylim=[0.0,1.05], 
          xlabel='False Positive Rate', 
          ylabel="True Positive Rate (Recall)", 
          title="Receiver operating characteristic")
ax[0].legend(loc="lower right")
ax[0].grid(True)
    
# Plot precision-recall curve
for i in range(len(classes)):
    precision, recall, thresholds = metrics.precision_recall_curve(
                 y_test_array[:,i], predicted_prob[:,i])
    ax[1].plot(recall, precision, lw=3, 
               label='{0} (area={1:0.2f})'.format(classes[i], 
                                  metrics.auc(recall, precision))
              )
ax[1].set(xlim=[0.0,1.05], ylim=[0.0,1.05], xlabel='Recall', 
          ylabel="Precision", title="Precision-Recall curve")
ax[1].legend(loc="best")
ax[1].grid(True)
plt.show()

# UNDERSTAND EVALUATION=========================================

i = 7
txt_instance = df["1. What is your primary concern when it comes to finance?_clean"].iloc[i]
print("True:", y_test[i], "--> Pred:", predicted[i], " | Similarity:", round(np.max(predicted_prob[i]),2))
print(txt_instance)

## create embedding Matrix
# Same issue as before so used data frame
# y = np.concatenate([embed_text_with_bert(v, bert_tokenizer, bert_model) for v in 
#                     clusters_dict.values()])

print(dtf.index)

y = np.concatenate([embed_text_with_bert(text, bert_tokenizer, bert_model)
                for text in dtf.index])

print("y shape=====")
print(y.shape) # (46, 768)
print("y ARRAY PRINT==========")
print(y)

X = embed_text_with_bert(txt_instance, bert_tokenizer,
                   bert_model).mean(0).reshape(1,-1)

print("Printing X shape")
print(X.shape) # (1, 768)
print("Printing X======")
print(X)

M = np.concatenate([y,X])

# pca
pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
M = pca.fit_transform(M)
y, X = M[:len(y)], M[len(y):]

print("M POST PCA")
print(M)
print("y POST PCA")
print(y)
print("X POST PCA")
print(X)

# FIXING
# create dtf clusters
dtf2 = pd.DataFrame()
for k,v in clusters_dict.items():
    size = len(dtf2) + len(v)
    # ERROR: Shape of passed values is (4, 2), indices imply (14, 2)
    dtf_group2 = pd.DataFrame(y[len(dtf2):size], columns=["x","y"],index=v)
    dtf_group2["cluster"] = k
    dtf2 = pd.concat([dtf2, dtf_group2])

print("Printing dtf2=====")
print(dtf2)

# # FOR REF: create dtf
# dtf = pd.DataFrame()
# for k,v in clusters_dict.items():
#     size = len(dtf) + len(v)
#     dtf_group = pd.DataFrame(X[len(dtf):size], columns=["x","y"], 
#                              index=v)
#     dtf_group["cluster"] = k
#     dtf = pd.concat([dtf, dtf_group])


## plot clusters
fig, ax = plt.subplots()
sns.scatterplot(data=dtf2, x="x", y="y", hue="cluster", ax=ax)
ax.legend().texts[0].set_text(None)
ax.set(xlabel=None, ylabel=None, xticks=[], xticklabels=[], 
       yticks=[], yticklabels=[])
for i in range(len(dtf)):
    ax.annotate(dtf2.index[i], 
               xy=(dtf2["x"].iloc[i],dtf2["y"].iloc[i]), 
               xytext=(5,2), textcoords='offset points', 
               ha='right', va='bottom')

## add txt_instance
ax.scatter(x=X[0][0], y=X[0][1], c="red", linewidth=10)
ax.annotate("x", xy=(X[0][0],X[0][1]), 
ha='center', va='center', fontsize=25)

## calculate similarity
sim_matrix = metrics.pairwise.cosine_similarity(X, y)

## add top similarity
for row in range(sim_matrix.shape[0]):
    ### sorted {keyword:score}
    dic_sim = {n:sim_matrix[row][n] for n in 
               range(sim_matrix.shape[1])}
    dic_sim = {k:v for k,v in sorted(dic_sim.items(), 
                key=lambda item:item[1], reverse=True)}
    ### plot lines
    for k in dict(list(dic_sim.items())[0:5]).keys():
        p1 = [X[row][0], X[row][1]]
        p2 = [y[k][0], y[k][1]]
        ax.plot([p1[0],p2[0]], [p1[1],p2[1]], c="red", alpha=0.5)
plt.show()


