from flask import Flask, jsonify, request

app = Flask(__name__)

'''
    GET endpoint to retrieve a user's Sudoku board from the MySQL database.
'''
@app.get('/boards/retrieve_board')
def retrieve_board():
    # Get it with the board ID
    # List of numbers?
    # Parse and return
    pass

'''
    POST endpoint to store a user's Sudoku board in the MySQL database.
'''
@app.post('/boards/store_board')
def store_board():
    # Given a list of numbers
    # Convert to a string of numbers
    # Store with unique board ID
    pass