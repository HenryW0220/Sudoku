from typing import List, Dict
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

CORS(app)


def get_db_connection():
    """
    Establishes a connection to the database and returns the connection and cursor objects.

    Returns:
        tuple: A tuple containing the connection and cursor objects.
    """
    connection = mysql.connector.connect(
        user='root',
        password='password',
        host='db',
        port='3306',
        database='TEST_DB'
    )
    cursor = connection.cursor()
    return connection, cursor
    # Return the data as JSON response


@app.get('/boards/retrieve_board/<int:board_id>')
def retrieve_board(board_id):
    """
    This function handles the GET request to retrieve a specific board by its ID.
    The board ID is passed as a path parameter in the URL.

    Parameters:
    board_id (int): The ID of the board to be retrieved.

    Returns:
    JSON: A JSON response containing the board ID and its contents if the board is found.
          If the board is not found, it returns a JSON response with an error message and a 404 status code.

    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()

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


@app.post('/boards/store_board/<int:board_id>')
def store_board(board_id):
    """
    Store a Sudoku board in the database.

    Parameters:
    - board_id (int): The ID of the Sudoku board.

    Returns:
    - str: A success message if the board is stored successfully, or a JSON response with an error message if the board numbers are not provided.

    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    # Grab the board contents from the request body
    board_contents = request.json.get('board_contents')
    if board_contents:
        # Convert the list of numbers back to a string
        board_string = ' '.join(str(num) for num in board_contents)
        # Create a new instance of the board and store it in the database
        cursor.execute(
            'INSERT INTO Board (board_id, board_contents) VALUES (%s, %s)', (board_id, board_string))
        connection.commit()
        connection.close()
        return f'Sudoku Board (id: {board_id}) Stored Successfully!'
    else:
        return jsonify({'message': 'Board Numbers Not Provided: Bad Board Request'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
