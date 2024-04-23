from pydantic import BaseModel
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
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

class Personality_traits_dict(BaseModel):
    Openness: str = Field(None, description="select from Curious, Inventive, Conservative, Cautious")
    Conscientiousness: str = Field(None, description="select from Efficient, Organized, Easygoing, Careless")
    Extraversion: str = Field(None, description="select from Outgoing, Energetic, Solitary, Reserved")
    Agreeableness: str = Field(None, description="select from Friendly, Compassionate, Challenging, Detached")
    Neuroticism: str = Field(None, description="select from Sensitive, Nervous, Secure, Confident")

class Leadership_traits_bool(BaseModel):
    Coercive: bool
    Authoritative: bool
    Affiliative: bool
    Democratic: bool
    Pacesetting: bool
    Coaching: bool


class Leadership_traits(str, Enum):
    Coercive = 'Coercive'
    Authoritative = 'Authoritative'
    Affiliative = 'Affiliative'
    Democratic = 'Democratic'
    Pacesetting = 'Pacesetting'
    Coaching = 'Coaching'

class Leadership_traits_dict(BaseModel):
    Leadership_style: str = Field(None, description="select from Coercive, Authoritative, Affiliative, Democratic, Pacesetting, Coaching")

class PersonaProfile(BaseModel):
    first_name: str = Field(None, description="First name of the persona, cannot be left blank")
    last_name: str = Field(None, description="Last name of the persona, cannot be left blank")
    age: str = Field(None, description="Age of the persona, cannot be left blank")
    gender: str = Field(None, description="Gender of the persona, cannot be left blank")
    english_proficiency: str = Field(None, description="English proficiency of the persona, e.g. beginner, intermediate, advanced, native")
    major: str = Field(None, description="Major of the persona, e.g. computer science, physics, etc.")
    grades: str = Field(None, description="Grades in the format freshman, sophomore, junior, senior")
    personality_traits: Personality_traits_dict
    leadership_traits: Leadership_traits = Field(None, description="Leadership style of the persona: Coercive, Authoritative, Affiliative, Democratic, Pacesetting, Coaching")
    additional_info: str = Field(None, description="Any additional information about the persona, e.g. hobbies, interests, etc.")



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
        template="generate a profile based on {guidance} {format_instructions}, do not leave any field blank or null",
        input_variables=['guidance'],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=0.7),
                         prompt=prompt)
    result = chain.invoke(input={
        'guidance':input_data
    })
    print(result["text"])
    return result["text"]



def generate_persona_description(input_data: PersonaInput) -> str:
    parser = PydanticOutputParser(pydantic_object=PersonaInput)

    prompt = PromptTemplate(
        template="generate a description of a persona based on {guidance} {format_instructions}",
        input_variables=['guidance'],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=0.7),
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

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=0.7),
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


# load json file
prompt = load_json('prompt.json')

attributes = generate_persona_attributes({"guidance": prompt["random_attributes"]})

print('//////////////////////////')



generate_persona_description({"guidance": prompt["profile_description"]+str(attributes)})
# format the output, remove all the quotation marks
# output = output.replace('"', '')
