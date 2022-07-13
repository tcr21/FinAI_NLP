#===============================================================

## for data
import json
from tkinter.messagebox import YES
import pandas as pd
import numpy as np
from pyparsing import col
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

# ERROR HANDLING ===============================================================

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

dtf_input_data = pd.DataFrame(json_string)
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
list_stopwords = nltk.corpus.stopwords.words("english")
# print(list_stopwords)

dtf_input_data["1. What is your primary concern when it comes to finance?_clean"] = dtf_input_data["1. What is your primary concern when it comes to finance?"].apply(lambda x: 
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
glove_clusters_dict = {}
glove_clusters_dict["Route 1: ENTERTAINMENT"] = get_similar_words(['celebrity','cinema','movie','music'], 
                  top_number=30, nlp_model=glove_model)
glove_clusters_dict["Route 2: POLITICS"] = get_similar_words(['gop','clinton','president','obama','republican']
                  , top_number=30, nlp_model=glove_model)
glove_clusters_dict["Route 3: TECH"] = get_similar_words(['amazon','android','app','apple','facebook',
                   'google','tech'], top_number=30, nlp_model=glove_model)
# Print some similar words
# for k,v in glove_clusters_dict.items():
#     print(k, ": ", v[:], "...", len(v))

print("CLUSTERS DICT=========")
# print(glove_clusters_dict)


# VISUALISE CLUSTERS===============================================================
# word embedding
all_words = [word for v in glove_clusters_dict.values() for word in v]

print("ALL_WORDS=======")
# print(all_words)

glove_word_encodings = glove_model[all_words]

print("Glove_Word_Encodings PRE PCA========")
print(glove_word_encodings.shape)
# print(glove_word_encodings)
        
# pca
pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
glove_word_encodings = pca.fit_transform(glove_word_encodings)

print("Glove_Word_Encodings POST PCA========")
print(glove_word_encodings.shape)
# print(glove_word_encodings)


# create dtf
dtf_glove_cluster_words_coordinates = pd.DataFrame()
# For each cluster (k is route, v is array of glove words for that cluster)
# Set size to = current size of dtf + length of that array of words
# Create new dtf_next_cluster that takes the x and y coordinates of words from end of previous array to size of current target array, 
# and has as an index the actual word (index = word, column1 = x, column2 = y)
# Create a new column for that dtf_next_cluster and set all values to k (ie the name/ route of that cluster)
# Add that cluster to the main dtf of clusters
for k,v in glove_clusters_dict.items():
    size = len(dtf_glove_cluster_words_coordinates) + len(v)
    dtf_next_cluster = pd.DataFrame(glove_word_encodings[len(dtf_glove_cluster_words_coordinates):size], columns=["x","y"], 
                             index=v)
    dtf_next_cluster["cluster"] = k
    dtf_glove_cluster_words_coordinates = pd.concat([dtf_glove_cluster_words_coordinates, dtf_next_cluster])

print("DTF GLOVE CLUSTER WORD COORDINATES========")
# print(dtf_glove_cluster_words_coordinates)
        
# plot
# TO DO: hue cluster 1 label not showing in legend
fig, ax = plt.subplots()
sns.scatterplot(data=dtf_glove_cluster_words_coordinates, x="x", y="y", hue="cluster", ax=ax)
ax.legend().texts[0].set_text(None)
ax.set(xlabel=None, ylabel=None, xticks=[], xticklabels=[], 
       yticks=[], yticklabels=[])
for i in range(len(dtf_glove_cluster_words_coordinates)):
    ax.annotate(dtf_glove_cluster_words_coordinates.index[i], 
               xy=(dtf_glove_cluster_words_coordinates["x"].iloc[i],dtf_glove_cluster_words_coordinates["y"].iloc[i]), 
               xytext=(5,2), textcoords='offset points', 
               ha='right', va='bottom')

print("GLOVE CLUSTER PLOT==========")
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
    tokenized_text = tokenizer.encode(text)
    print("EMBED WITH BERT: TOKENIZED TEXT================")
    # print(tokenized_text)

    tokenized_text = np.array(tokenized_text)[None,:]  
    print("EMBED WITH BERT: TOKENIZED TEXT NP ARRAY================")
    # print(tokenized_text.shape) # returned (1, 9) for 7 words, bert tokenizer inserts special tokens at beginning and end of sentences (101 and 102)
    # print(tokenized_text)

    tokenized_text = torch.from_numpy(tokenized_text) # bert model expects a torch tensor
    print("EMBED WITH BERT: TOKENIZED TEXT TORCH TENSOR================")
    # print(tokenized_text.shape) # as above
    # print(tokenized_text)

    bert_embedded_text = model(tokenized_text)
    print("EMBED WITH BERT: BERT EMBEDDED TEXT================")
    # print(bert_embedded_text)

    bert_embedded_text_array = bert_embedded_text[0][0][1:-1].detach().numpy() 
    print("EMBED WITH BERT: BERT EMBEDDED TEXT ARRAY================")
    print(bert_embedded_text_array.shape) # returns (no of words, 768)
    # print(bert_embedded_text_array)

    return bert_embedded_text_array

# Test: passed (function returned array of shape (7, 768) which is current)
# txt = "Hillary Clinton and Obama are great politicians"
# embed_text_with_bert(txt, bert_tokenizer, bert_model)

# APPLY EMBEDDING TO INPUT TEXT
print("INPUT DATA (CLEAN)==================")
print(dtf_input_data.shape)
# print(dtf_input_data["1. What is your primary concern when it comes to finance?_clean"])

# create list of input text vector: for each line in input data, embed text with bert, and then get mean of each dimension across words for that line
mean_vec_per_input_text_list = [embed_text_with_bert(text, bert_tokenizer, bert_model).mean(0) 
                 for text in dtf_input_data["1. What is your primary concern when it comes to finance?_clean"]]
print("MEAN VECTOR PER TEXT LINE (LIST)===========")
# print(mean_vec_per_input_text_list)

# create the feature matrix (n input lines x 768)
mean_vec_per_input_text_array = np.array(mean_vec_per_input_text_list)
print("MEAN VECTOR PER TEXT LINE (ARRAY) = INPUT DATA FEATURE MATRIX===========")
print(mean_vec_per_input_text_array.shape)
# print(mean_vec_per_input_text_array)

# create input text lines dict mean (input text line: mean vector)
mean_vec_per_input_text_dict = {}
i = 0
for text in dtf_input_data["1. What is your primary concern when it comes to finance?_clean"]:
    mean_vec_per_input_text_dict[text] = mean_vec_per_input_text_array[i]
    i = i + 1
print("MEAN VECTOR PER TEXT LINE (DICT)===================")
# print(mean_vec_per_input_text_dict)

# APPLY EMBEDDING TO CLUSTERS 
# DID NOT WORK (TYPE ERROR) mean_vec_per_cluster_dict = {k: embed_text_with_bert(v, bert_tokenizer, bert_model).mean(0) for k,v
#          in glove_clusters_dict.items()}

dtf_glove_clusters_as_strings = pd.DataFrame(columns=["cluster", "words"])
# For each cluster in dict
for k, v in glove_clusters_dict.items():
    # Join the elements (words) in the array into one big string
    cluster_words_string = " "
    cluster_words_string = cluster_words_string.join(v)
    # print(cluster_words_string)
    # Put cluster word strings into dataframe (one row per cluster)
    dtf_glove_clusters_as_strings.loc[len(dtf_glove_clusters_as_strings.index)] = [k, cluster_words_string]

print("DTF GLOVE CLUSTERS AS STRINGS====================")
# print(dtf_glove_clusters_as_strings)

# Embed clusters in dataframe into list of mean vectors
mean_vec_per_cluster_list = [embed_text_with_bert(text, bert_tokenizer, bert_model).mean(0)
            for text in dtf_glove_clusters_as_strings["words"]] 
print("MEAN VECTOR PER CLUSTER (LIST)===========")
# print(mean_vec_per_cluster_list)

# create feature matrix (n clusters x 768)
mean_vec_per_cluster_array = np.array(mean_vec_per_cluster_list)
print("MEAN VECTOR PER CLUSTER (ARRAY) = CLUSTER FEATURE MATRIX===========")
print(mean_vec_per_cluster_array.shape)
# print(mean_vec_per_cluster_array)

# create clusters dict mean
mean_vec_per_cluster_dict = {}
i = 0
for k, v in glove_clusters_dict.items():
    mean_vec_per_cluster_dict[k] = mean_vec_per_cluster_array[i]
    i = i + 1
print("MEAN VECTOR PER CLUSTER (DICT)==========")
print(mean_vec_per_cluster_dict)

# MODEL ALGORITHM==============================================

# Compute cosine similarities
#  TO DO: Is the issue here? Could the similarities be being computed wrong?
print("MEAN VEC PER INPUT TEXT (DICT)============")
print(mean_vec_per_input_text_dict)

# Create text input column
dtf_similarity_scores_by_input_text_and_cluster = pd.DataFrame(columns=["input"])
# Create 1 column per route
for cluster, cluster_vector in mean_vec_per_cluster_dict.items():
    dtf_similarity_scores_by_input_text_and_cluster[cluster] = ""

# Populate cosine similarities
keys_clst = list(mean_vec_per_cluster_dict.keys())
keys_ipt = list(mean_vec_per_input_text_dict.keys())

print("CLUSTER VECTOR======")
print(mean_vec_per_cluster_dict.get(keys_clst[0]).shape)
print(mean_vec_per_cluster_dict.get(keys_clst[0]))
print("INPUT TEXT VECTOR======")
print(mean_vec_per_input_text_dict.get(keys_ipt[0]).shape)
print(mean_vec_per_input_text_dict.get(keys_ipt[0]))

for input, input_vector in mean_vec_per_input_text_dict.items():
    # TO DO: make vectors as : array_vec_1 = np.array([[12,41,60,11,21]])

    dtf_similarity_scores_by_input_text_and_cluster.loc[len(dtf_similarity_scores_by_input_text_and_cluster.index)] = [input,  
    metrics.pairwise.cosine_similarity([input_vector], [mean_vec_per_cluster_dict.get(keys_clst[0])]),
    metrics.pairwise.cosine_similarity([input_vector], [mean_vec_per_cluster_dict.get(keys_clst[1])]),
    metrics.pairwise.cosine_similarity([input_vector], [mean_vec_per_cluster_dict.get(keys_clst[2])])]

print("DTF SIMILARITIES======")
print(dtf_similarity_scores_by_input_text_and_cluster)

# Didn't work: expecting 2D input but got 1D
# i = 0
# for text in dtf_input_data:
#     dtf_similarity_scores_by_input_text_and_cluster.loc[len(dtf_similarity_scores_by_input_text_and_cluster)] = [text, metrics.pairwise.cosine_similarity(mean_vec_per_input_text_array[i], mean_vec_per_input_text_array[0]),
#     metrics.pairwise.cosine_similarity(mean_vec_per_input_text_array[i], mean_vec_per_input_text_array[1]),
#     metrics.pairwise.cosine_similarity(mean_vec_per_input_text_array[i], mean_vec_per_input_text_array[2])]
#     i = i + 1

# For ref
# dtf_glove_clusters_as_strings.loc[len(dtf_glove_clusters_as_strings.index)] = [k, cluster_words_string]

# For ref
# for k,v in glove_clusters_dict.items():
#     size = len(dtf_glove_cluster_words_coordinates) + len(v)
#     dtf_next_cluster = pd.DataFrame(glove_word_encodings[len(dtf_glove_cluster_words_coordinates):size], columns=["x","y"], 
#                              index=v)
#     dtf_next_cluster["cluster"] = k
#     dtf_glove_cluster_words_coordinates = pd.concat([dtf_glove_cluster_words_coordinates, dtf_next_cluster])

# For np
# similarities = np.array([metrics.pairwise.cosine_similarity(mean_vec_per_input_text_dict, v)
#             for k,v in mean_vec_per_cluster_dict.items()])


# print("SIMILARITIES============")
# similarities = similarities.reshape(25, 3)
# print(similarities.shape)
# print(similarities)

# TO DO: SOMEHOW PUT EVERYTHING IN THE SAME DTF (INPUT TEXT, REAL VALUE, PREDICTION) so I know not doing wrong things

# # adjust and rescale
# labels = list(mean_vec_per_cluster_dict.keys()) 
# for i in range(len(similarities)):
#     # assign randomly if there is no similarity
#     if sum(similarities[i]) == 0:
#        similarities[i] = [0]*len(labels)
#        similarities[i][np.random.choice(range(len(labels)))] = 1
#     # rescale so they sum = 1
#     similarities[i] = similarities[i] / sum(similarities[i])

# # classify the label with highest similarity score
# predicted_prob = similarities
# predicted = [labels[np.argmax(pred)] for pred in predicted_prob]

# print("PREDICTED LABELS========")
# print(predicted) 

# # EVALUATE=======================================================

# y_test = df["category"].values
# classes = np.unique(y_test)
# y_test_array = pd.get_dummies(y_test, drop_first=False).values

# # Accuracy, Precision, Recall
# accuracy = metrics.accuracy_score(y_test, predicted)
# auc = metrics.roc_auc_score(y_test, predicted_prob, 
#                             multi_class="ovr")
# print("Accuracy:",  round(accuracy,2))
# print("Auc:", round(auc,2))
# print("Detail:")
# print(metrics.classification_report(y_test, predicted))

# # Plot confusion matrix
# cm = metrics.confusion_matrix(y_test, predicted)
# fig, ax = plt.subplots()
# sns.heatmap(cm, annot=True, fmt='d', ax=ax, cmap=plt.cm.Blues, 
#             cbar=False)
# ax.set(xlabel="Pred", ylabel="True", xticklabels=classes, 
#        yticklabels=classes, title="Confusion matrix")
# plt.yticks(rotation=0)
# fig, ax = plt.subplots(nrows=1, ncols=2)

# # Plot roc
# for i in range(len(classes)):
#     fpr, tpr, thresholds = metrics.roc_curve(y_test_array[:,i],  
#                            predicted_prob[:,i])
#     ax[0].plot(fpr, tpr, lw=3, 
#               label='{0} (area={1:0.2f})'.format(classes[i], 
#                               metrics.auc(fpr, tpr))
#                )
# ax[0].plot([0,1], [0,1], color='navy', lw=3, linestyle='--')
# ax[0].set(xlim=[-0.05,1.0], ylim=[0.0,1.05], 
#           xlabel='False Positive Rate', 
#           ylabel="True Positive Rate (Recall)", 
#           title="Receiver operating characteristic")
# ax[0].legend(loc="lower right")
# ax[0].grid(True)
    
# # Plot precision-recall curve
# for i in range(len(classes)):
#     precision, recall, thresholds = metrics.precision_recall_curve(
#                  y_test_array[:,i], predicted_prob[:,i])
#     ax[1].plot(recall, precision, lw=3, 
#                label='{0} (area={1:0.2f})'.format(classes[i], 
#                                   metrics.auc(recall, precision))
#               )
# ax[1].set(xlim=[0.0,1.05], ylim=[0.0,1.05], xlabel='Recall', 
#           ylabel="Precision", title="Precision-Recall curve")
# ax[1].legend(loc="best")
# ax[1].grid(True)
# plt.show()

# # UNDERSTAND EVALUATION PLOT 1=========================================

# i = 7
# txt_instance = df["1. What is your primary concern when it comes to finance?_clean"].iloc[i]
# print("True:", y_test[i], "--> Pred:", predicted[i], " | Similarity:", round(np.max(predicted_prob[i]),2))
# print(txt_instance)

# # create embedding Matrix
# # Same issue as before so used data frame
# # y = np.concatenate([embed_text_with_bert(v, bert_tokenizer, bert_model) for v in 
# #                     glove_clusters_dict.values()])

# print(dtf.index)

# y = np.concatenate([embed_text_with_bert(text, bert_tokenizer, bert_model)
#                 for text in dtf.index])

# print("y shape=====")
# print(y.shape) # (46, 768)
# print("y ARRAY PRINT==========")
# print(y)

# X = embed_text_with_bert(txt_instance, bert_tokenizer,
#                    bert_model).mean(0).reshape(1,-1)

# print("Printing X shape")
# print(X.shape) # (1, 768)
# print("Printing X======")
# print(X)

# M = np.concatenate([y,X])

# # pca
# pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
# M = pca.fit_transform(M)
# y, X = M[:len(y)], M[len(y):]

# print("M POST PCA")
# print(M)
# print("y POST PCA")
# print(y)
# print("X POST PCA")
# print(X)

# # create dtf clusters
# dtf2 = pd.DataFrame()
# for k,v in glove_clusters_dict.items():
#     size = len(dtf2) + len(v)
#     # ERROR: Shape of passed values is (4, 2), indices imply (14, 2)
#     dtf_group2 = pd.DataFrame(y[len(dtf2):size], columns=["x","y"],index=v)
#     dtf_group2["cluster"] = k
#     dtf2 = pd.concat([dtf2, dtf_group2])

# print("Printing dtf2=====")
# print(dtf2)

# # plot clusters
# fig, ax = plt.subplots()
# sns.scatterplot(data=dtf2, x="x", y="y", hue="cluster", ax=ax)
# ax.legend().texts[0].set_text(None)
# ax.set(xlabel=None, ylabel=None, xticks=[], xticklabels=[], 
#        yticks=[], yticklabels=[])
# for i in range(len(dtf)):
#     ax.annotate(dtf2.index[i], 
#                xy=(dtf2["x"].iloc[i],dtf2["y"].iloc[i]), 
#                xytext=(5,2), textcoords='offset points', 
#                ha='right', va='bottom')

# # add txt_instance
# ax.scatter(x=X[0][0], y=X[0][1], c="red", linewidth=10)
# ax.annotate("x", xy=(X[0][0],X[0][1]), 
# ha='center', va='center', fontsize=25)

# # calculate similarity
# sim_matrix = metrics.pairwise.cosine_similarity(X, y)

# ## add top similarity
# for row in range(sim_matrix.shape[0]):
#     ### sorted {keyword:score}
#     dic_sim = {n:sim_matrix[row][n] for n in 
#                range(sim_matrix.shape[1])}
#     dic_sim = {k:v for k,v in sorted(dic_sim.items(), 
#                 key=lambda item:item[1], reverse=True)}
#     ### plot lines
#     for k in dict(list(dic_sim.items())[0:5]).keys():
#         p1 = [X[row][0], X[row][1]]
#         p2 = [y[k][0], y[k][1]]
#         ax.plot([p1[0],p2[0]], [p1[1],p2[1]], c="red", alpha=0.5)
# plt.show()

# # UNDERSTAND EVALUATION PLOT 2=========================================

# print("UNDERSTAND EVALUATION PLOT 2")

# # create embedding Matrix
# # Same issue as before so used data frame
# # y = np.concatenate([embed_text_with_bert(v, bert_tokenizer, bert_model) for v in 
# #                     glove_clusters_dict.values()])

# print(dtf.index)

# y = np.concatenate([embed_text_with_bert(text, bert_tokenizer, bert_model)
#                 for text in dtf.index])

# print("y shape=====")
# print(y.shape) # (46, 768)
# print("y ARRAY PRINT==========")
# print(y)

# X = np.concatenate([embed_text_with_bert(word, bert_tokenizer, bert_model)
#         for word in txt_instance.split()])

# print("Printing X shape")
# print(X.shape) # (1, 768)
# print("Printing X======")
# print(X)

# M = np.concatenate([y,X])

# # pca
# pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
# M = pca.fit_transform(M)
# y, X = M[:len(y)], M[len(y):]

# print("M POST PCA")
# print(M)
# print("y POST PCA")
# print(y)
# print("X POST PCA")
# print(X)

# # create dtf clusters
# dtf3 = pd.DataFrame()
# for k,v in glove_clusters_dict.items():
#     size = len(dtf3) + len(v)
#     dtf_group3 = pd.DataFrame(y[len(dtf3):size], columns=["x","y"],index=v)
#     dtf_group3["cluster"] = k
#     dtf3 = pd.concat([dtf3, dtf_group3])

# print("Printing dtf3=====")
# print(dtf3)


# ## plot clusters
# fig, ax = plt.subplots()
# sns.scatterplot(data=dtf3, x="x", y="y", hue="cluster", ax=ax)
# ax.legend().texts[0].set_text(None)
# ax.set(xlabel=None, ylabel=None, xticks=[], xticklabels=[], 
#        yticks=[], yticklabels=[])
# for i in range(len(dtf3)):
#     ax.annotate(dtf3.index[i], 
#                xy=(dtf3["x"].iloc[i],dtf3["y"].iloc[i]), 
#                xytext=(5,2), textcoords='offset points', 
#                ha='right', va='bottom')



# # add txt_instance
# tokens = bert_tokenizer.convert_ids_to_tokens(
#                bert_tokenizer.encode(txt_instance))[1:-1]
# # ERROR: Shape of passed values (X) is (1, 2), indices imply (5, 2) due to X having 5 words (but only one x, y pair)
# dtf4 = pd.DataFrame(X, columns=["x","y"], index=tokens)
# dtf4 = dtf4[~dtf4.index.str.contains("#")]
# dtf4 = dtf4[dtf4.index.str.len() > 1]
# X = dtf4.values

# print("Printing dtf4=====")
# print(dtf4)

# print("Printing X====")
# print(X)

# ax.scatter(x=dtf4["x"], y=dtf4["y"], c="red")
# for i in range(len(dtf4)):
#      ax.annotate(dtf4.index[i], 
#                  xy=(dtf4["x"].iloc[i],dtf4["y"].iloc[i]), 
#                  xytext=(5,2), textcoords='offset points', 
#                  ha='right', va='bottom')

# # calculate similarity
# sim_matrix = metrics.pairwise.cosine_similarity(X, y)

# # add top similarity
# for row in range(sim_matrix.shape[0]):
#     # sorted {keyword:score}
#     dic_sim = {n:sim_matrix[row][n] for n in 
#                range(sim_matrix.shape[1])}
#     dic_sim = {k:v for k,v in sorted(dic_sim.items(), 
#                 key=lambda item:item[1], reverse=True)}
#     # plot lines
#     for k in dict(list(dic_sim.items())[0:5]).keys():
#         p1 = [X[row][0], X[row][1]]
#         p2 = [y[k][0], y[k][1]]
#         ax.plot([p1[0],p2[0]], [p1[1],p2[1]], c="red", alpha=0.5)

# print("Show last plot")

# plt.show()