import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

from main import action

@app.route('/')
def root():
    return jsonify({
        "service": "notchbegone-api",
        "status": "ok",
    })

@app.route('/upload', methods=["POST"])
def upload():
    (response, response_code, headers) = action(request)
    return jsonify(response), response_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, use_reloader=True)
