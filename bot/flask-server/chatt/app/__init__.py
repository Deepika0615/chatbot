# app/__init__.py

import os
from flask import Flask, render_template, request, jsonify
import openai

# Create a Flask web application instance
app = Flask(__name__)

# Set your OpenAI GPT-3 API key here
openai.api_key = "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"

def get_completion(prompt, model="text-davinci-002"):
    context = f"you are a biomedical chatbot, if asked outside the biomedical domain, you are not supposed to answer.\nUser: {prompt}\n"
    
    try:
        # Send the joined context and user input as a single prompt
        response = openai.Completion.create(
            engine=model,
            prompt=context,
            temperature=0.7,
            max_tokens=150
        )

        # Extract and return the generated completion
        if 'choices' in response and len(response['choices']) > 0:
            completion = response['choices'][0]['text']
            return completion
        else:
            return "Error: Unable to generate a completion."
    except Exception as e:
        return "Error: " + str(e)

def is_biomedical_question(question):
    # For simplicity, assume all questions are biomedical
    return True

# Main route to render the HTML page
@app.route("/")
def index():
    return render_template("index.html")

# Route to handle the chatbot request
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        data = request.get_json()
        question = data["question"]
        bot_response = get_completion(question)
        return jsonify({"response": bot_response})
    except Exception as e:
        return jsonify({"response": "Error: " + str(e)})

if __name__ == "__main__":
    app.run()
