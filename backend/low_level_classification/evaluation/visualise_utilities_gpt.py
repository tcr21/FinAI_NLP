import os
import sys

from sklearn import metrics
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np
# for plotting
import matplotlib.pyplot as plt
import seaborn as sns
# for combinations
from itertools import combinations

# for params (tags and services fixed)
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import tags, services, route3_options, undefined_options

def print_evaluation_metrics_gpt(dtf_results): 
    # Accuracy, Precision, Recall
    accuracy = metrics.accuracy_score(dtf_results["true_str"], dtf_results["predicted_str"])
    print("Accuracy:",  round(accuracy,3)) # Note: tested
    print("Detail:")
    print(metrics.classification_report(dtf_results["true_str"], dtf_results["predicted_str"]))

def add_route_possible_results(classes_array, possible_results): 
    list1_combinations = []
    for i in range(1, len(tags)+1):
        list1_combinations.append(list(combinations(list(possible_results.values()), i)))
    list1_combinations_as_list = []
    for i in range(len(list1_combinations)):
        list1_combinations_tuple_as_list = []
        for j in list1_combinations[i]:
            list_inside = []
            for k in j:
                list_inside.append(k)
            list1_combinations_tuple_as_list.append(list_inside)
        list1_combinations_as_list.append(list1_combinations_tuple_as_list) 
    for i in list1_combinations_as_list:
        for j in i:
            classes_array.append(j)
    for i in classes_array:
        i = i.sort()


def plot_confusion_matrix_gpt(dtf_results):
    classes_array = []
    # Just for labels
    # Route 1
    add_route_possible_results(classes_array, tags)

    # # Route 2
    add_route_possible_results(classes_array, services)

    # Route 3
    for k, v in route3_options.items():
        classes_array.append([v])

    # Undefined ("route3" already above)
    for k, v in undefined_options.items():
        classes_array.append([v])
    
    # Make each class into string (instead of list) for below
    classes_array_str = []
    for i in classes_array:
        str = ' '.join(i)
        classes_array_str.append(str)

    # classes_array = list(dict.fromkeys(classes_array_str))
    classes = np.array(classes_array_str)

    cm = metrics.confusion_matrix(dtf_results["true_str"], dtf_results["predicted_str"]) 
    fig, ax = plt.subplots()
    sns.heatmap(cm, annot=True, fmt='d', ax=ax, cmap=plt.cm.Blues, 
                cbar=False)
    # TO FIX (failed to convert values to axis units, maybe due to there being 24 possible labels)
    # ax.set_xticks(classes) 
    # ax.set(xlabel="Predicted", ylabel="True", xticklabels=classes, 
    #     yticklabels=classes, title="Confusion matrix")
    # plt.yticks(rotation=0)

    # plt.show() 