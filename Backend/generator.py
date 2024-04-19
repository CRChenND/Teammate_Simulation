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

class PersonaProfile(BaseModel):
    name: str
    age: str
    job: str
    home: str
    hobbies: list 



# Set up API client
current_file_path = os.path.abspath(__file__)
current_dir_path = os.path.dirname(current_file_path)
config = configparser.ConfigParser()
config.read(os.path.join(current_dir_path, 'config.ini'))
os.environ['OPENAI_API_KEY'] = config['DEFAULT']['OPENAI_API_KEY']

# Function to generate the persona profile
def generate_persona_description(input_data: PersonaInput) -> PersonaProfile:
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

    print(result["text"])

    return result

generate_persona_description({"guidance": "a 20 year old white man"})

