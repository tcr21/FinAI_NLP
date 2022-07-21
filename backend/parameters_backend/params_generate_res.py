from parameters import tags
from parameters import services

# MANUAL UPDATE: YES/NO LOGIC ------------------------------------------
# Must be manually updated here if Questions to GPT change

def generate_gpt_answers_bool_dict(gpt_res_text, input_num_of_questions_to_gpt):
    gpt_answers_as_bool = {}
    for i in range(1, input_num_of_questions_to_gpt+1): 
        if ((str(i)+". Yes") in gpt_res_text) or ((str(i)+".Yes") in gpt_res_text) or ((str(i)+". yes") in gpt_res_text) or ((str(i)+".yes") in gpt_res_text):
            gpt_answers_as_bool[str(i)] = True
        else:
            gpt_answers_as_bool[str(i)] = False 
    print("TEST gpt_answers_as_bool function:", gpt_answers_as_bool)
    return gpt_answers_as_bool

def generate_res_route1(gpt_res_text, serviceNames):
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 4)
    if gpt_answers_as_bool['4'] == True: # Double check if the person might be in danger
        serviceNames = ['route3']
    else: 
        if gpt_answers_as_bool['1'] == True: 
            serviceNames.append(tags['1'])
        if gpt_answers_as_bool['2'] == True:
            serviceNames.append(tags['2'])
        if gpt_answers_as_bool['3'] == True:
            serviceNames.append(tags['3'])
    if len(serviceNames) == 0:
        for k, v in tags.items():
            serviceNames.append(v)
    serviceNames = list(dict.fromkeys(serviceNames))
    return serviceNames

def generate_res_route2(gpt_res_text, serviceNames):
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 4)
    if gpt_answers_as_bool['4'] == True: # Double check if the person might be in danger
        serviceNames = ['route3']
    else:
        if gpt_answers_as_bool['1'] == True: 
            serviceNames.append(services['1'])
        if gpt_answers_as_bool['2'] == True:
            serviceNames.append(services['1'])
        if gpt_answers_as_bool['3'] == True:
            serviceNames.append(services['2'])
    if len(serviceNames) == 0:
        for k, v in tags.items():
            serviceNames.append(v)
    serviceNames = list(dict.fromkeys(serviceNames))
    return serviceNames

def generate_res_route3(gpt_res_text, serviceNames):
    # If any of responses are true, confirm route3. If none of them are (else), then say unsure if route3
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 3)
    if (gpt_answers_as_bool['1']  == True) or (gpt_answers_as_bool['2']  == True) or (gpt_answers_as_bool['3']  == True):
        serviceNames = ['route3'] 
    else: 
        serviceNames = ['unsure if route3'] 
    return serviceNames 

def generate_res_route_undefined(gpt_res_text, serviceNames):
    gpt_answers_as_bool = generate_gpt_answers_bool_dict(gpt_res_text, 3)
    if (gpt_answers_as_bool['1']  == True) and (gpt_answers_as_bool['2'] != True) and (gpt_answers_as_bool['3'] != True):
        serviceNames = ['route1']
    elif (gpt_answers_as_bool['1'] != True) and (gpt_answers_as_bool['2']  == True) and (gpt_answers_as_bool['3'] != True):
        serviceNames = ['route2']
    elif (gpt_answers_as_bool['1'] != True) and (gpt_answers_as_bool['2'] != True) and (gpt_answers_as_bool['3']  == True):
        serviceNames = ['route3']
    else:
        serviceNames = ['undefined']
    return serviceNames

def generate_res_based_on_gpt(gpt_res_text, res_bert):
    serviceNames = []
    # Different yes/ no logic depending on routes (ie depending on questions to gpt)
    if res_bert == "route1":
        serviceNames = generate_res_route1(gpt_res_text, serviceNames)
        print("TEST serviceNames route1", serviceNames)
    elif res_bert == "route2":
        serviceNames = generate_res_route2(gpt_res_text, serviceNames)
        print("TEST serviceNames route2", serviceNames)
    elif res_bert == "route3": 
        serviceNames = generate_res_route3(gpt_res_text, serviceNames)
        print("TEST serviceNames route3", serviceNames)
    # TO TEST (once have min threshold on Bert. Already set up in frontend)
    else: 
        serviceNames = generate_res_route_undefined(gpt_res_text, serviceNames)
        print("TEST serviceNames undefined", serviceNames)
    return serviceNames

    
