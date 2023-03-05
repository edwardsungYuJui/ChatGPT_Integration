from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)
openai.api_key = os.environ.get("API_KEY")

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/gpt', methods=['POST'])
def gpt_response():
    message = request.json['message']
    response = openai.Completion.create(
        engine="davinci-codex",
        prompt=message,
        max_tokens=1024,
        n=1,
        stop='\n',
        temperature=0.5,
    )
    return jsonify({'response': response.choices[0].text.strip()})

