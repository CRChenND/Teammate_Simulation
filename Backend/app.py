from flask import Flask, request, jsonify
from generator import generate_persona_description

app = Flask(__name__)

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
    result = generate_persona_description(guidance)
    
    # Return the result as JSON
    return jsonify({'response': result}), 200

if __name__ == '__main__':
    app.run(debug=True)
