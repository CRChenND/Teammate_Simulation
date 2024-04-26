from pydantic import BaseModel
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper

from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser
from langchain.globals import set_verbose
from enum import Enum
import configparser
import os
import json

set_verbose(False)

def load_json(file_path):
    with open(file_path) as f:
        data = json.load(f)
    return data

class PersonaInput(BaseModel):
    guidance: str

class Personality_traits_bool(BaseModel):
    Curious: bool
    Inventive: bool
    Conservative: bool
    Cautious: bool
    Efficient: bool
    Organized: bool
    Easygoing: bool
    Careless: bool
    Outgoing: bool
    Energetic: bool
    Solitary: bool
    Reserved: bool
    Friendly: bool
    Compassionate: bool
    Challenging: bool
    Detached: bool
    Sensitive: bool
    Nervous: bool
    Secure: bool
    Confident: bool

# class Personality_traits_dict(BaseModel):
#     Openness: str = Field(None, description="select from Curious, Inventive, Conservative, Cautious")
#     Conscientiousness: str = Field(None, description="select from Efficient, Organized, Easygoing, Careless")
#     Extraversion: str = Field(None, description="select from Outgoing, Energetic, Solitary, Reserved")
#     Agreeableness: str = Field(None, description="select from Friendly, Compassionate, Challenging, Detached")
#     Neuroticism: str = Field(None, description="select from Sensitive, Nervous, Secure, Confident")

class Personality_traits_dict(BaseModel):
    openness: str = Field(None, description="a value between 0 to 100 to show the openness, where 0 is close and 100 is open")
    conscientiousness: str = Field(None, description="a value between 0 to 100 to show the conscientiousness, where 0 is spontaneous and 100 is conscientious")
    extraversion: str = Field(None, description="a value between 0 to 100 to show the extraversion, where 0 is introverted and 100 is extraverted")
    agreeableness: str = Field(None, description="a value between 0 to 100 to show the agreeableness, where 0 is hostile and 100 is agreeable")
    neuroticism: str = Field(None, description="a value between 0 to 100 to show the neuroticism, where 0 is stable and 100 is neurotic")


class Leadership_traits_bool(BaseModel):
    Coercive: bool
    Authoritative: bool
    Affiliative: bool
    Democratic: bool
    Pacesetting: bool
    Coaching: bool


class Leadership_traits(str, Enum):
    Coercive = 'coercive'
    Authoritative = 'authoritative'
    Affiliative = 'affiliative'
    Democratic = 'democratic'
    Pacesetting = 'pacesetting'
    Coaching = 'coaching'

class Leadership_traits_dict(BaseModel):
    Leadership_style: str = Field(None, description="select from coercive, authoritative, affiliative, democratic, pacesetting, coaching")

class PersonaProfile(BaseModel):
    first_name: str = Field(None, description="First name of the persona, cannot be left blank, do not always use the most common names")
    last_name: str = Field(None, description="Last name of the persona, cannot be left blank, do not always use the most common names")
    age: str = Field(None, description="Age of the persona, cannot be left blank")
    gender: str = Field(None, description="Gender of the persona, cannot be left blank")
    english_proficiency: str = Field(None, description="English proficiency of the persona, e.g. beginner, intermediate, advanced, native")
    major: str = Field(None, description="Major of the persona, e.g. computer science, physics, etc., do not always use the most common majors")
    grade: str = Field(None, description="Grades in the format freshman, sophomore, junior, senior")
    personality_traits: Personality_traits_dict
    leadership_traits: Leadership_traits #= Field(None, description="Leadership style of the persona: Coercive, Authoritative, Affiliative, Democratic, Pacesetting, Coaching")
    additional_info: str = Field(None, description="Any additional information about the persona, e.g. hobbies, interests, etc.")
    profile: str = Field(None, description="A paragraph of persona description")



# Set up API client
current_file_path = os.path.abspath(__file__)
current_dir_path = os.path.dirname(current_file_path)
config = configparser.ConfigParser()
config.read(os.path.join(current_dir_path, 'config.ini'))
os.environ['OPENAI_API_KEY'] = config['DEFAULT']['OPENAI_API_KEY']

# Function to generate the persona profile
def generate_persona_attributes(input_data: PersonaInput) -> PersonaProfile:
    parser = PydanticOutputParser(pydantic_object=PersonaProfile)

    prompt = PromptTemplate(
        template="generate a profile based on {guidance} {format_instructions}, if some attibutes are not provided, please generate the attributes randomly (do not always choose positive attributes), do not leave any field blank or null",
        input_variables=['guidance'],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=1.3),
                         prompt=prompt)
    result = chain.invoke(input={
        'guidance':input_data
    })
    return eval(result["text"])


def generate_image(input_str):
    prompt = PromptTemplate(
        template="Generate a realistic portrait of a college student based on {guidance}. This photo should be similar to a ID photo and will be used as a LinkedIn profile picture.",
        input_variables=['guidance'],
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0.8),
                     prompt=prompt)

    full_prompt = chain.run(input_str)
    if len(full_prompt) > 1000:
        full_prompt = full_prompt[:1000]

    image_url = DallEAPIWrapper().run(full_prompt)
    print('image url')
    print(image_url)
    return image_url

def generate_persona_description(input_data: PersonaInput) -> str:
    parser = PydanticOutputParser(pydantic_object=PersonaInput)

    prompt = PromptTemplate(
        template="generate a description of a persona based on {guidance} {format_instructions}",
        input_variables=['guidance'],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=1.3),
                         prompt=prompt)
    result = chain.invoke(input={
        'guidance':input_data
    })

    print(result["text"])

    return result["text"]

def generate_topic(input_data: PersonaInput) -> str:
    parser = PydanticOutputParser(pydantic_object=PersonaInput)

    prompt_json = load_json('prompt.json')

    prompt = PromptTemplate(
        template="generate a topic for a conversation that can be used in the grouping simulation task based on {guidance}{format_instructions}."+prompt_json["topic"],
        input_variables=['guidance'],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=1.3),
                         prompt=prompt)
    result = chain.invoke(input={
        'guidance':input_data
    })

    print(result["text"])

    return result["text"]

def post_process_output(output):
    # remove all the quotation marks
    output = output.replace('"', '')
    # remove all the newline in the prompt
    output = output.replace("\n", "")
    # remove all the word guidance in the prompt
    output = output.replace("guidance", "")
    # remove all the brackets in the prompt
    output = output.replace("{", "")
    output = output.replace("}", "")
    return output

input = 'a 20-year-old Asian girl'
generate_image(input)

# load json file
#prompt = load_json('prompt.json')

#attributes = generate_persona_attributes({"guidance": prompt["random_attributes"]})

#print('//////////////////////////')



#generate_persona_description({"guidance": prompt["profile_description"]+str(attributes)})
# format the output, remove all the quotation marks
# output = output.replace('"', '')
