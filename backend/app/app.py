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


@app.get('/boards/retrieve_all_boards')
def retrieve_all_boards():
    """
    This function handles the GET request to retrieve all boards from the database.

    Returns:
    JSON: A JSON response containing all boards in the database.
    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')
    cursor.execute('SELECT * FROM Board')
    boards = cursor.fetchall()
    connection.close()

    # Parse results into list of lists with id followed by contents
    boards_list = [(board[0], [int(num) for num in board[1].split()], [
                    int(num) for num in board[2].split()]) for board in boards]

    response = jsonify(boards_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


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
    cursor.execute('USE TEST_DB')

    # Retrieve row of cursor whose id is equal to that of board_id
    cursor.execute('SELECT * FROM Board WHERE board_id = %s', (board_id,))
    result = cursor.fetchone()
    connection.close()
    print(result)
    if result:
        # Get board contents from the query result
        board_contents = result[1]
        # Convert the board contents to a list of integers
        board_contents = [int(num) for num in board_contents.split()]
        # Get board answer from the query result
        board_answer = result[2]
        # Convert the board answer to a list of integers
        board_answer = [int(num) for num in board_answer.split()]
        # Parse result into list with id followed by contents
        sudoku_board = [board_id] + board_contents + board_answer

        response = jsonify(sudoku_board)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return jsonify({'message': 'Invalid Board ID: Board Not Found'}), 404


@app.get('/users/<int:user_id>/partial_boards/retrieve_partial_board/<int:board_id>')
def retrieve_partial_board(user_id, board_id):
    """
    Retrieve a partially completed Sudoku board for a specific user.

    Parameters:
    - user_id (int): The ID of the user.
    - board_id (int): The ID of the Sudoku board.

    Returns:
    - JSON: A JSON response containing the user ID, board ID, partial board contents, and the corresponding board's answer if found.
            If the partial board or answer is not found, it returns a JSON response with an error message and a 404 status code.

    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')

    # Retrieve the partial board contents and answer for the user and board ID
    cursor.execute('''
        SELECT p.user_id, p.board_id, p.partial_board_contents, b.board_answer
        FROM PartialBoard p
        INNER JOIN Board b ON p.board_id = b.board_id
        WHERE p.user_id = %s AND p.board_id = %s
        ''', (user_id, board_id))
    result = cursor.fetchone()
    connection.close()

    if result:
        user_id, board_id, partial_board_contents, board_answer = result
        # Convert the partial board contents and board answer to lists of integers
        partial_board_contents = [int(num)
                                  for num in partial_board_contents.split()]
        board_answer = [int(num) for num in board_answer.split()]
        # Construct the response JSON
        response_data = {
            'user_id': user_id,
            'board_id': board_id,
            'partial_board_contents': partial_board_contents,
            'board_answer': board_answer
        }
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return jsonify({'message': 'Invalid User ID or Board ID: Partial Board Not Found'}), 404


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
    cursor.execute('USE TEST_DB')
    # Grab the board contents from the request body
    board_contents = request.json.get('board_contents')
    # Grab the board answer from the request body
    board_answer = request.json.get('board_answer')

    if board_contents:
        # Convert the list of numbers back to a string
        board_string = ' '.join(str(num) for num in board_contents)
        # Convert the list of numbers back to a string
        answer_string = ' '.join(str(num) for num in board_answer)
        # Create a new instance of the board and store it in the database
        cursor.execute(
            'INSERT INTO Board (board_id, board_contents, board_answer) VALUES (%s, %s)', (board_id, board_string, answer_string))
        connection.commit()
        connection.close()
        return f'Sudoku Board (id: {board_id}) Stored Successfully!'
    else:
        return jsonify({'message': 'Board Numbers Not Provided: Bad Board Request'}), 400


@app.post('/users/<int:user_id>/partial_boards/store_partial_board/<int:board_id>')
def store_partial_board(user_id, board_id):
    """
    Store a partially completed Sudoku board for a specific user.

    Parameters:
    - user_id (int): The ID of the user.
    - board_id (int): The ID of the Sudoku board.

    Returns:
    - str: A success message if the partial board is stored successfully, or a JSON response with an error message if the board numbers are not provided.

    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')

    # Grab the partial board contents from the request body
    # test values was: request.json.get('partial_board_contents')
    partial_board_contents = '123456789123456678353245234523452345'
    # request.json.get('board_answer')
    if partial_board_contents:
        # Convert the list of numbers back to a string
        partial_board_string = ' '.join(str(num)
                                        for num in partial_board_contents)
        # Check if the user already has a partial board for the given board ID
        cursor.execute(
            'SELECT * FROM PartialBoard WHERE user_id = %s AND board_id = %s', (user_id, board_id))
        existing_partial_board = cursor.fetchone()

        if existing_partial_board:
            # Update the existing partial board
            cursor.execute(
                'UPDATE PartialBoard SET partial_board_contents = %s WHERE user_id = %s AND board_id = %s',
                (partial_board_string, user_id, board_id))
        else:
            # Insert a new partial board for the user
            cursor.execute(
                'INSERT INTO PartialBoard (user_id, board_id, partial_board_contents) VALUES (%s, %s, %s)',
                (user_id, board_id, partial_board_string))
        connection.commit()
        connection.close()
        return f'Partial Board (user_id: {user_id}, board_id: {board_id}) Stored Successfully!'
    else:
        return jsonify({'message': 'Partial Board Contents Not Provided: Bad Request'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
