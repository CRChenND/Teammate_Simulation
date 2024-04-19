from flask import Flask, request, jsonify

app = Flask(__name__)

def get_profile(input_string):
    return f"Based on {input_string}, generate persona profile"

@app.route('/generate_profile', methods=['POST'])
def generate_profile():
    if request.is_json:
        data = request.get_json()
        guidance = data.get('guidance')
        if guidance:
            result = get_profile(guidance)
            return jsonify({'response': result}), 200
        else:
            return jsonify({'error': 'No guidance provided'}), 400
    else:
        return jsonify({'error': 'Request must be JSON'}), 400

if __name__ == '__main__':
    app.run(debug=True)
