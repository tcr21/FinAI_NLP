import ssl
# for processing
import re
import nltk

# Solution 1 NLTK: DID NOT WORK
# import os 
# dir_path = os.path.dirname(os.path.realpath(__file__))
# nltk.data.path.append(dir_path)

# Solution 2 NLTK
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context



def create_stop_words():
    nltk.download("stopwords") # Solution 2 NLTK
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
                
    nltk.download("omw-1.4") # Solution 2 NLTK
    nltk.download("wordnet") # Solution 2 NLTK

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


def preprocess_data_dtf(dtf_data):
    for col, value in dtf_data.items():
        if "message" in col:
            dtf_data[col+"_clean"] = dtf_data[col].apply(lambda x: 
                preprocess_text_input(x, flag_stemm=False, flag_lemm=True))


def generate_input_data_dict(dtf_data, criteria):
    input_data_dict = {}
    for i in range(0, len(dtf_data)):
        input_data_dict[i] = []
        for col, value in dtf_data.items():
            if criteria in col:
                input_data_dict[i].append(dtf_data.iloc[i][dtf_data.columns.get_loc(col)])
    return input_data_dict

# print(create_stop_words())
# print(preprocess_text_input("I need help with financial issues"))