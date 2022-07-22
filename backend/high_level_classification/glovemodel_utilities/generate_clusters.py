from os.path import exists 
# for w2v
import gensim.downloader as gensim_api
from gensim.models import KeyedVectors
# for plotting
from sklearn import manifold
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# for params 
import sys
import os
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import cluster_model_name_param_str, cluster_key_words_param_dict, cluster_size_param_dict, load_new_glove_model, selected_saved_glove_model, name_new_glove_model 



def get_similar_words(list_words, top_number, nlp_model):
    list_out = list_words
    for word_and_similarity in nlp_model.most_similar(list_words, topn=top_number):
        list_out.append(word_and_similarity[0])
    return list(set(list_out))

def visualise_clusters(clusters_dict, nlp_model):
    # word embedding
    all_words = [word for v in clusters_dict.values() for word in v]

    glove_word_encodings = nlp_model[all_words]
            
    # pca
    pca = manifold.TSNE(perplexity=40, n_components=2, init='pca')
    glove_word_encodings = pca.fit_transform(glove_word_encodings)

    # create dtf
    dtf_glove_cluster_words_coordinates = pd.DataFrame()
    # For each cluster (k is route, v is array of glove words for that cluster)
    # Set size to = current size of dtf + length of that array of words
    # Create new dtf_next_cluster that takes the x and y coordinates of words from end of previous array to size of current target array, 
    # and has as an index the actual word (index = word, column1 = x, column2 = y)
    # Create a new column for that dtf_next_cluster and set all values to k (ie the name/ route of that cluster)
    # Add that cluster to the main dtf of clusters
    for k,v in clusters_dict.items():
        size = len(dtf_glove_cluster_words_coordinates) + len(v)
        dtf_next_cluster = pd.DataFrame(glove_word_encodings[len(dtf_glove_cluster_words_coordinates):size], columns=["x","y"], 
                                index=v)
        dtf_next_cluster["cluster"] = k
        dtf_glove_cluster_words_coordinates = pd.concat([dtf_glove_cluster_words_coordinates, dtf_next_cluster])

    # plot
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

    plt.show()

def load_glove_model():
    # Load glove model used to generate similar words if want to / if no saved model
    if (load_new_glove_model == True) or (exists(selected_saved_glove_model) == False):
        glove_model = gensim_api.load(cluster_model_name_param_str)
        print("TEST glove model loaded from gensim")
        glove_model.save(name_new_glove_model)
        print("TEST glove model saved")
    # If want to use saved model and have saved model
    else: 
        glove_model = KeyedVectors.load(selected_saved_glove_model)
        print("TEST glove model loaded from saved models")
    return glove_model

def generate_clusters_dict(glove_model):
    # Create dictionary {category:[keywords]}
    glove_clusters_dict = {}
    glove_clusters_dict["route1"] = get_similar_words(cluster_key_words_param_dict[1], 
                    top_number=cluster_size_param_dict[1], nlp_model=glove_model)
    glove_clusters_dict["route2"] = get_similar_words(cluster_key_words_param_dict[2], 
                    top_number=cluster_size_param_dict[2], nlp_model=glove_model)
    glove_clusters_dict["route3"] = get_similar_words(cluster_key_words_param_dict[3], 
                    top_number=cluster_size_param_dict[3], nlp_model=glove_model)
    
    # Visualise clusters (optional)
    # visualise_clusters(glove_clusters_dict, glove_model)

    return glove_clusters_dict
