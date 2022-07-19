# for processing
import re
import nltk
import pandas as pd

def create_stop_words():
    list_stopwords = nltk.corpus.stopwords.words("english")
    return list_stopwords


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
def preprocess_text_input(text, flag_stemm=False, flag_lemm=True):
    list_stopwords = create_stop_words()
    
    # clean (convert to lowercase and remove punctuations and characters and then strip)
    text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
            
    # tokenize (convert from string to list)
    lst_text = text.split()    
    
    # remove stopwords
    if list_stopwords is not None:
        lst_text = [word for word in lst_text if word not in 
                    list_stopwords]
                
    # stemming (remove -ing, -ly, ...)
    if flag_stemm == True:
        ps = nltk.stem.porter.PorterStemmer()
        lst_text = [ps.stem(word) for word in lst_text]
                
    # lemmatisation (convert the word into root word)
    if flag_lemm == True:
        lem = nltk.stem.wordnet.WordNetLemmatizer()
        lst_text = [lem.lemmatize(word) for word in lst_text]
            
    # back to string from list
    text_input_clean = " ".join(lst_text)
    return text_input_clean


def preprocess_data_dtf(dtf_training_data):
    # TO DO: make scalable for more questions
    dtf_training_data["1. What is your primary concern when it comes to finance?_clean"] = dtf_training_data["1. What is your primary concern when it comes to finance?"].apply(lambda x: 
          preprocess_text_input(x, flag_stemm=False, flag_lemm=True))