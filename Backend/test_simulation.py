from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, PromptTemplate
from langchain_openai.chat_models import ChatOpenAI
from langchain_openai import OpenAI
from langchain.chains import LLMChain
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
import configparser
import os
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel
from generator import generate_persona_attributes, generate_persona_description, load_json, generate_topic, post_process_output
import json

prompt_json = load_json('prompt.json')

current_file_path = os.path.abspath(__file__)
current_dir_path = os.path.dirname(current_file_path)
config = configparser.ConfigParser()
config.read(os.path.join(current_dir_path, 'config.ini'))
os.environ['OPENAI_API_KEY'] = config['DEFAULT']['OPENAI_API_KEY']


# class output_format(BaseModel):
#     name: str
#     conversation: str
#
# #agent1 = generate_persona_attributes({"guidance": "Alice: a 18-year-old computer science student who is passionate about AI."})
# agent1 = generate_persona_attributes({"guidance": ""})
# agent1 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent1)})
# #agent2 = generate_persona_attributes({"guidance": "Bob: a 20-year-old applied physic student who is interested in investing in AI."})
# agent2 = generate_persona_attributes({"guidance": ""})
# agent2 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent2)})
# #agent3 = generate_persona_attributes({"guidance": "Charlie: a 22-year-old AI researcher who is working on a new AI model"})
# agent3 = generate_persona_attributes({"guidance": ""})
# agent3 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent3)})
#
#
# prompt = prompt_json["grouping_simulation"]
# prompt += f"1. {agent1} 2. {agent2} 3. {agent3}"
#
# prompt = post_process_output(prompt)
# print('prompt:', prompt)
#
# model = ChatOpenAI()
# prompt = ChatPromptTemplate.from_messages(
#     [
#         (
#             "system",
#             prompt,
#         ),
#         MessagesPlaceholder(variable_name="history"),
#         ("human", "{input}"),
#     ]
# )
#
#
# runnable = prompt | model
#
#
#
# store = {}
#
#
# def get_session_history(session_id: str) -> BaseChatMessageHistory:
#     if session_id not in store:
#         store[session_id] = ChatMessageHistory()
#     return store[session_id]
#
#
# with_message_history = RunnableWithMessageHistory(
#     runnable,
#     get_session_history,
#     input_messages_key="input",
#     history_messages_key="history",
# )
#
# topic_example = 'Implement a library system program.'
#
#
# # generate a topic using the prompt
# topic_random = generate_topic({"guidance": topic_example})
# topic_random = post_process_output(topic_random)
#
# print('topic:', topic_random)
#
# with_message_history.invoke(
#     {"input": "Here is a project: " + topic_random + "Now these prople should form a group. Discuss how to finish this project in a group"},
#     config={"configurable": {"session_id": "abc123"}},
# )
#
# # print(with_message_history.get_session_history("abc123"))
#
# # Remembers
# with_message_history.invoke(
#     {"input": "please generate more conversation between them, you can stimulate some conflicts between them."},
#     config={"configurable": {"session_id": "abc123"}},
# )
#
# #print(with_message_history.get_session_history("abc123"))
# text = str(with_message_history.get_session_history("abc123"))
# print('//////////////////////////')
# print(text)
#
# # Split the conversation into individual dialogues
# dialogues = text.split('\n')
#
# # Create a list to hold the structured data
# structured_data = []
#
# # Parse each dialogue and extract the speaker and their message
# for idx, dialogue in enumerate(dialogues):
#     if ': ' in dialogue:
#         if idx == 0:
#             pass
#         else:
#             speaker, message = dialogue.split(': ', 1)
#             if speaker == 'Human':
#                 pass
#             elif speaker == 'AI':
#                 speaker, message = message.split(': ', 1)
#                 structured_data.append({'speaker': speaker, 'message': message})
#             else:
#                 structured_data.append({'speaker': speaker, 'message': message})
#
# # Convert the structured data into JSON format
# json_data = json.dumps(structured_data, indent=4)
#
# # Save the JSON data to a file
# with open('conversation.json', 'w') as json_file:
#     json_file.write(json_data)

store = {}
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

def convert_text_to_json(text_str):
    # Split the conversation into individual dialogues
    dialogues = text_str.split('\n')

    # Create a list to hold the structured data
    structured_data = []

    # Parse each dialogue and extract the speaker and their message
    for idx, dialogue in enumerate(dialogues):
        if ': ' in dialogue:
            if idx == 0:
                pass
            else:
                speaker, message = dialogue.split(': ', 1)
                if speaker == 'Human':
                    pass
                elif speaker == 'AI':
                    speaker, message = message.split(': ', 1)
                    structured_data.append({'speaker': speaker, 'message': message})
                else:
                    structured_data.append({'speaker': speaker, 'message': message})

    # Convert the structured data into JSON format
    json_data = json.dumps(structured_data, indent=4)

    # Save the JSON data to a file
    with open('conversation.json', 'w') as json_file:
        json_file.write(json_data)

    return json_data



def generate_conversation(input_profile_list, topic=''):
    """
    generate the conversation based on the input profile list
    """

    prompt_json = load_json('prompt.json')
    prompt = prompt_json["grouping_simulation"]
    for idx, profile in enumerate(input_profile_list):
        prompt += str(idx+1) + '. ' + profile
    prompt = post_process_output(prompt)
    print('prompt:', prompt)

    model = ChatOpenAI()
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                prompt,
            ),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{input}"),
        ]
    )
    runnable = prompt | model

    with_message_history = RunnableWithMessageHistory(
        runnable,
        get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )

    # generate a topic using the prompt
    # topic_random = generate_topic({"guidance": topic})
    # topic_random = post_process_output(topic_random)
    topic_random = topic

    print('topic:', topic_random)

    with_message_history.invoke(
        {
            "input": "Here is a project: " + topic_random + "Now these prople should form a group. Discuss how to finish this project in a group"},
        config={"configurable": {"session_id": "abc123"}},
    )

    with_message_history.invoke(
        {"input": "please generate more conversation between them, you can stimulate some conflicts between them."},
        config={"configurable": {"session_id": "abc123"}},
    )

    text = str(with_message_history.get_session_history("abc123"))
    print('//////////////////////////')
    print(text)

    json_file = convert_text_to_json(text)

    return eval(json_file)

# def generate_more_conversation(with_message_history):
#     text_previous = str(with_message_history.get_session_history("abc123"))
#
#     with_message_history.invoke(
#         {"input": "please generate more conversation between them, you can stimulate some conflicts between them."},
#         config={"configurable": {"session_id": "abc123"}},
#     )
#     text_after = str(with_message_history.get_session_history("abc123"))
#     text = text_after.replace(text_previous, "", 1)
#
#     json_file = convert_text_to_json(text)
#
#     return json_file, with_message_history


#agent1 = generate_persona_attributes({"guidance": "Alice: a 18-year-old computer science student who is passionate about AI."})
# agent1 = generate_persona_attributes({"guidance": ""})
# agent1 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent1)})
# #agent2 = generate_persona_attributes({"guidance": "Bob: a 20-year-old applied physic student who is interested in investing in AI."})
# agent2 = generate_persona_attributes({"guidance": ""})
# agent2 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent2)})
# #agent3 = generate_persona_attributes({"guidance": "Charlie: a 22-year-old AI researcher who is working on a new AI model"})
# agent3 = generate_persona_attributes({"guidance": ""})
# agent3 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent3)})

# agent_list = []
# agent_list.append(agent1)
# agent_list.append(agent2)
# agent_list.append(agent3)

# generate_conversation(agent_list)








