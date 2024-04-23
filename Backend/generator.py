from pydantic import BaseModel
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser
from langchain.globals import set_verbose
import configparser
import os

set_verbose(False)

class PersonaInput(BaseModel):
    guidance: str

class Personality_traits_dict(BaseModel):
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

class Leadership_traits_dict(BaseModel):
    Coercive: bool
    Authoritative: bool
    Affiliative: bool
    Democratic: bool
    Pacesetting: bool
    Coaching: bool

class PersonaProfile(BaseModel):
    first_name: str
    last_name: str
    age: str
    gender: str
    english_proficiency: str
    major: str
    grades: str
    personality_traits: Personality_traits_dict
    leadership_traits: Leadership_traits_dict



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
        template="generate a profile based on {guidance} {format_instructions}",
        input_variables=['guidance'],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = LLMChain(llm=ChatOpenAI(model_name='gpt-3.5-turbo',temperature=0.7),
                         prompt=prompt)
    result = chain.invoke(input={
        'guidance':input_data
    })



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

attributes = generate_persona_attributes({"guidance": "a 18 year old white girl in applied physics major"})

print('//////////////////////////')
generate_persona_description({"guidance": "generate a description of a persona of about 200 words in one paragraph, add some details, refer to the following characteristic (but do not just purely list the characteristics, make it more vivid like an introduction of a student):"+str(attributes)})

