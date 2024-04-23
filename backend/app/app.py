from typing import List, Dict
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

CORS(app)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)


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


"""

    GET ENDPOINTS

"""


@app.get('/boards/retrieve_all_board_ids')
def retrieve_all_board_ids():
    """
    This function handles the GET request to retrieve all board ids from the database.

    Returns:
    JSON: A JSON response containing all board ids in the database.
    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')
    cursor.execute('SELECT * FROM Board')
    boards = cursor.fetchall()
    connection.close()

    # Parse results into list of lists with id followed by contents
    boards_list = [board[0] for board in boards]

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
        board_id, board_contents, board_answer = result

        board_contents = [int(num)
                          for num in board_contents.split()]
        board_answer = [int(num) for num in board_answer.split()]

        response_data = {
            'board_id': board_id,
            'board_contents': board_contents,
            'board_answer': board_answer
        }
        response = jsonify(response_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return jsonify({'message': 'Invalid Board ID: Board Not Found'}), 404


@app.get('/users/<int:user_id>/partial_boards/retrieve_all_partial_board_ids')
def retrieve_all_partial_board_ids(user_id):
    """
    This function handles the GET request to retrieve all partial board ids from the database.

    Returns:
    JSON: A JSON response containing all partial board ids in the database.
    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')
    cursor.execute('SELECT * FROM PartialBoard')
    boards = cursor.fetchall()
    connection.close()

    # Format results into list of dictionaries
    boards_list = [{'user_id': board[0], 'board_id': board[1]}
                   for board in boards]

    response = jsonify(boards_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


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


@app.get('/users/retrieve_all_users')
def retrieve_all_users():
    """
    This function handles the GET request to retrieve all users from the database.

    Returns:
    JSON: A JSON response containing all users in the database.
    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')
    cursor.execute('SELECT * FROM User')
    users = cursor.fetchall()
    connection.close()

    # Parse results into list of dictionaries
    users_list = [{'user_id': user[0], 'user_name': user[1]} for user in users]

    response = jsonify(users_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.get('/users/retrieve_user/<int:user_id>')
def retrieve_user(user_id):
    """
    This function handles the GET request to retrieve a specific user by their ID.
    The user ID is passed as a path parameter in the URL.

    Parameters:
    user_id (int): The ID of the user to be retrieved.

    Returns:
    JSON: A JSON response containing the user ID and their name if the user is found.
          If the user is not found, it returns a JSON response with an error message and a 404 status code.

    """
    # Connect to MySQL DB
    connection, cursor = get_db_connection()
    cursor.execute('USE TEST_DB')

    # Retrieve row of cursor whose id is equal to that of user_id
    cursor.execute('SELECT * FROM User WHERE user_id = %s', (user_id,))
    result = cursor.fetchone()
    connection.close()

    if result:
        user_data = {'user_id': result[0], 'user_name': result[1]}
        response = jsonify(user_data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return jsonify({'message': 'Invalid User ID: User Not Found'}), 404


"""

    POST ENDPOINTS

"""


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
            'INSERT INTO Board (board_id, board_contents, board_answer) VALUES (%s, %s, %s)', (board_id, board_string, answer_string))
        connection.commit()
        connection.close()
        # Return a response with CORS headers
        return Response(f'Sudoku Board (id: {board_id}) Stored Successfully!', headers={'Access-Control-Allow-Origin': '*'})
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
    partial_board_contents = request.json.get('partial_board_contents')

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
        # Return a response with CORS headers
        return Response(f'Partial Board (user_id: {user_id}, board_id: {board_id}) Stored Successfully!', headers={'Access-Control-Allow-Origin': '*'})
    else:
        return jsonify({'message': 'Partial Board Contents Not Provided: Bad Request'}), 400


@app.route('/login', methods=['POST'])
def login():
    """
    Log in a user by providing a username and password.

    Parameters:
        username (str): The username of the user.
        password (str): The password of the user.

    Returns:
        A JSON response containing a success message and a JWT token if the login is successful,
        or an error message if the user is not found or the password is incorrect.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cnx, cursor = get_db_connection()
    cursor = cnx.cursor(dictionary=True)

    # Check if the user exists in the database
    query = "SELECT * FROM User WHERE user_name = %s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()

    if user is not None:
        if check_password_hash(user['user_pwd'], password):
            # Use the create_jwt function to create a token
            token = create_access_token(identity=username)
            return jsonify({"message": "Login successful", "token": token, "username":username}), 200
        else:
            return jsonify({"message": "Wrong password"}), 401

    return jsonify({"message": "User not found"}), 404


@app.route('/register', methods=['POST'])
def register():
    """
    Register a new user in the system.

    Parameters:
        username (str): The username of the user.
        password (str): The password of the user.

    Returns:
        A JSON response containing a success message if the user is registered successfully, or an error message if the username is already taken.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cnx, cursor = get_db_connection()

    # Check if the user_name has already been registered
    query = "SELECT * FROM User WHERE user_name = %s"
    cursor.execute(query, (username,))
    if cursor.fetchone() is not None:
        return jsonify({"message": "Username already exists"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Insert the new user into the database
    query = "INSERT INTO User (user_name, user_pwd) VALUES (%s, %s)"
    cursor.execute(query, (username, hashed_password))
    cnx.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/me', methods=['GET'])
@jwt_required()
def me():
    """
    Get the information of the currently logged-in user.

    Returns:
        A JSON response containing the user's information if found, or an error message if not found.
    """
    # Use the get_jwt_identity function to get the identity
    username = get_jwt_identity()

    # Get the user's information from the database
    cnx, cursor = get_db_connection()
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM User WHERE user_name = %s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()

    if user is not None:
        # Return the user's information
        return jsonify({"message": "User found", "username": user['user_name']}), 200
    else:
        return jsonify({"message": "User not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
