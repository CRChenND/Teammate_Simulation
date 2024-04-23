from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, PromptTemplate
from langchain_openai.chat_models import ChatOpenAI
import configparser
import os
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel
from generator import generate_persona_attributes, generate_persona_description, load_json, generate_topic, post_process_output

prompt_json = load_json('prompt.json')

current_file_path = os.path.abspath(__file__)
current_dir_path = os.path.dirname(current_file_path)
config = configparser.ConfigParser()
config.read(os.path.join(current_dir_path, 'config.ini'))
os.environ['OPENAI_API_KEY'] = config['DEFAULT']['OPENAI_API_KEY']


class output_format(BaseModel):
    name: str
    conversation: str

agent1 = generate_persona_attributes({"guidance": "Alice: a 18-year-old computer science student who is passionate about AI."})
agent1 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent1)})
agent2 = generate_persona_attributes({"guidance": "Bob: a 20-year-old applied physic student who is interested in investing in AI."})
agent2 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent2)})
agent3 = generate_persona_attributes({"guidance": "Charlie: a 22-year-old AI researcher who is working on a new AI model"})
agent3 = generate_persona_description({"guidance": prompt_json["profile_description"] + str(agent3)})


prompt = prompt_json["grouping_simulation"]
prompt += f"1. {agent1} 2. {agent2} 3. {agent3}"
# prompt = prompt.replace('"', '')
# #remove all the word guidance in the prompt
# prompt = prompt.replace("guidance", "")
# # remove all the brackets in the prompt
# prompt = prompt.replace("{", "")
# prompt = prompt.replace("}", "")
# # remove all the newline in the prompt
# prompt = prompt.replace("\n", "")
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

# parser = PydanticOutputParser(pydantic_object=output_format)
#
# prompt = PromptTemplate(
#     template="generate a profile based on {guidance} {format_instructions}",
#     input_variables=['guidance'],
#     partial_variables={"format_instructions": parser.get_format_instructions()},
# )

runnable = prompt | model

from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

store = {}


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]


with_message_history = RunnableWithMessageHistory(
    runnable,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

topic_example = 'Implement a libiary system program.'


# generate a topic using the prompt
topic_random = generate_topic({"guidance": topic_example})
# # remove all the quotation marks
# topic_random = topic_random.replace('"', '')
# # remove all the newline in the prompt
# topic_random = topic_random.replace("\n", "")
# # remove all the word guidance in the prompt
# topic_random = topic_random.replace("guidance", "")
# # remove all the brackets in the prompt
# topic_random = topic_random.replace("{", "")
# topic_random = topic_random.replace("}", "")
topic_random = post_process_output(topic_random)

print('topic:', topic_random)

with_message_history.invoke(
    {"input": "Here is a project: " + topic_random + "Now these prople should form a group. Discuss how to finish this project in a group"},
    config={"configurable": {"session_id": "abc123"}},
)

# print(with_message_history.get_session_history("abc123"))

# Remembers
with_message_history.invoke(
    {"input": "please generate more conversation between this 3 person"},
    config={"configurable": {"session_id": "abc123"}},
)

print(with_message_history.get_session_history("abc123"))

