from typing import List, Dict
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

CORS(app)

@app.route('/') 
def setup():
    connection = mysql.connector.connect(
        user='root', 
        password='password',
        host='db',
        port='3306',
        database='TEST_DB'
    )

    cursor = connection.cursor()
    cursor.execute('USE TEST_DB')
    cursor.execute('SELECT * FROM Board')
    result = cursor.fetchall()  # Fetch all rows from the cursor
    connection.close()
    
    # Convert result to a list of dictionaries for JSON serialization
    data = [{'board_id': row[0], 'board_contents': row[1]} for row in result]
    
    # Return the data as JSON response
    return data

# GET endpoint to retrieve a user's Sudoku board from the MySQL database.
@app.get('/boards/retrieve_board/<int:board_id>')
def retrieve_board(board_id):
    # Connect to MySQL DB
    connection = mysql.connector.connect(
        user='root', 
        password='password',
        host='db',
        port='3306',
        database='TEST_DB'
    )

    cursor = connection.cursor()
    # Retrieve row of cursor whose id is equal to that of board_id
    cursor.execute('SELECT * FROM Board WHERE board_id = %s', (board_id,))
    result = cursor.fetchone()
    connection.close()

    if result:
        # Get board contents from the query result
        board_contents = result[1]
        # Convert the board contents to a list of integers
        board_contents = [int(num) for num in board_contents.split()]
        # Parse result into list with id followed by contents
        sudoku_board = [board_id] + board_contents

        response = jsonify(sudoku_board)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return jsonify({'message': 'Invalid Board ID: Board Not Found'}), 404

# POST endpoint to store a user's Sudoku board in the MySQL database.
@app.post('/boards/store_board/<int:board_id>')
def store_board(board_id):
    # Connect to MySQL DB
    connection = mysql.connector.connect(
        user='root', 
        password='password',
        host='db',
        port='3306',
        database='TEST_DB'
    )

    cursor = connection.cursor()    
    # Grab the board contents from the request body
    board_contents = request.json.get('board_contents')
    if board_contents:
        # Convert the list of numbers back to a string
        board_string = ' '.join(str(num) for num in board_contents)
        # Create a new instance of the board and store it in the database
        cursor.execute('INSERT INTO Board (board_id, board_contents) VALUES (%s, %s)', (board_id, board_string))
        connection.commit()
        connection.close()
        return f'Sudoku Board (id: {board_id}) Stored Successfully!'
    else:
        return jsonify({'message': 'Board Numbers Not Provided: Bad Board Request'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)