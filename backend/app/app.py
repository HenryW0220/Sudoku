from typing import List, Dict
from flask import Flask, jsonify, request
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
    cursor.execute('USE TEST_DB')

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
    cursor.execute('USE TEST_DB')
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