from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/endpoint', methods=['GET'])
def get_data():
    return 'Success!'