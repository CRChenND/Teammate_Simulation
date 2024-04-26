from flask import Flask, request, jsonify
from flask_cors import CORS
from generator import generate_persona_attributes
from generator import generate_image
from test_simulation import generate_conversation

app = Flask(__name__)
CORS(app) 

generated_persona = []
imageURL = ""

@app.route('/generate_profile', methods=['POST'])
def generate_profile():
    # Ensure the request content type is JSON
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400
    
    data = request.get_json()
    guidance = data.get('guidance', '')  # Use 'None' as default if 'guidance' key is missing
    print(guidance)

    # Check if guidance data was provided
    if not guidance:
        return jsonify({'error': 'No guidance provided'}), 400

    # Call the function that generates the persona description
    profile = generate_persona_attributes(guidance)
    image = generate_image(guidance)

    global imageURL
    imageURL = image

    global generated_persona
    generated_persona = profile
    
    # Return the result as JSON
    return jsonify({'profile': profile, 'image': image}), 200


@app.route('/get_team_conversation', methods=['POST'])
def get_team_conversation():
    # Ensure the request content type is JSON
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400
    
    data = request.get_json()
    topic = data.get('topic', '')  # Use 'None' as default if 'guidance' key is missing
    print(topic)

    # Check if guidance data was provided
    if not topic:
        return jsonify({'error': 'No topic provided'}), 400

    # Call the function that generates the persona description
    input_profile_list = ["Alice: a 18-year-old computer science student who is passionate about AI.", "Bob: a 20-year-old applied physic student who is interested in investing in AI."]
    if len(generated_persona) > 0:
        input_profile_list.append(generated_persona["profile"])
    conversation = generate_conversation(input_profile_list=input_profile_list, topic=topic)
    
    # Return the result as JSON
    return jsonify({'conversation': conversation}), 200


@app.route('/get_team_members', methods=['GET'])
def get_team_members():
    if len(generated_persona) > 0:
        name = generated_persona["first_name"]
    else:
        name = "N/A"
    
    return jsonify({'name':  name, 'image': imageURL}), 200


if __name__ == '__main__':
    app.run(debug=True)
