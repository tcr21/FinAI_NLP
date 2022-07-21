import os
import sys
# for params
dirname = os.path.dirname(__file__)
sys.path.append(os.path.join(dirname, '../../parameters_backend'))
from parameters import gpt_prompts_param_dict

def generate_prompt(user_input_clean, res_bert):
    if res_bert == "route1":
        print("TEST Sending this to GPT as prompt for route 1: ")
        print(gpt_prompts_param_dict[1].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[1].format(
        user_input_clean.capitalize()
        )
    elif res_bert == "route2":
        print("TEST Sending this to GPT as prompt for route 2: ")
        print(gpt_prompts_param_dict[2].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[2].format(
            user_input_clean.capitalize()
            )
    elif res_bert == "route3":
        print("TEST Sending this to GPT as prompt for route 3: ")
        print(gpt_prompts_param_dict[3].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[3].format(
            user_input_clean.capitalize()
            )
    else: 
        print("TEST Sending this to GPT as prompt for route 4: ")
        print(gpt_prompts_param_dict[4].format(
        user_input_clean.capitalize()
        ))
        return gpt_prompts_param_dict[4].format(
            user_input_clean.capitalize()
            ) 