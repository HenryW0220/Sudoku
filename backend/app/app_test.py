import pytest
from app import app
from unittest.mock import MagicMock
from flask import jsonify

# Define the mock_get_db_connection function to create a closure
# This allows us to create different instances of mock_db_connection with a different fetchone_return_value to customize its behavior for different test cases
def mock_get_db_connection(fetchone_return_value):
    def mock_db_connection():
        connection = MagicMock()
        cursor = MagicMock()
        cursor.fetchone.return_value = fetchone_return_value
        return connection, cursor
    return mock_db_connection

def mock_get_all_db_connection(fetchall_return_value):
    def mock_db_connection():
        connection = MagicMock()
        cursor = MagicMock()
        cursor.fetchall.return_value = [(board_id,) for board_id in fetchall_return_value]
        return connection, cursor
    return mock_db_connection

def mock_get__db_connection(fetchall_return_value):
    def mock_db_connection():
        connection = MagicMock()
        cursor = MagicMock()
        cursor.fetchall.return_value = fetchall_return_value
        return connection, cursor
    return mock_db_connection

# Define the mock_post_db_connection function to create a closure
def mock_post_db_connection(fetchone_return_value):
    def mock_db_connection():
        connection = MagicMock()
        cursor = MagicMock()
        # Mocking the execution of the SQL insert query
        cursor.execute.return_value = None
        cursor.fetchone.return_value = fetchone_return_value
        return connection, cursor
    return mock_db_connection

# Set up a fixture for the app client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


"""

    GET ENDPOINTS TESTS

"""
def test_retrieve_board_found(client, monkeypatch):
    # Board found scenario
    expected_board_id = 0
    expected_board_contents = '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9'
    expected_board_answer = '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9'
    
    expected_response = {
        'board_id': expected_board_id,
        'board_contents': [int(num) for num in expected_board_contents.split()],
        'board_answer': [int(num) for num in expected_board_answer.split()]
    }

    # Mocking the database connection function
    monkeypatch.setattr('app.get_db_connection', mock_get_db_connection(((expected_board_id), expected_board_contents, expected_board_answer)))

    # Make a request to the endpoint
    response = client.get(f'/boards/retrieve_board/{expected_board_id}')

    # Assert response
    assert response.status_code == 200
    assert response.json == expected_response

def test_retrieve_board_not_found(client, monkeypatch):
    # Board not found scenario
    non_existent_board_id = 999

    # Mocking the database connection function
    monkeypatch.setattr('app.get_db_connection', mock_get_db_connection(None))

    # Make a request to the endpoint
    response = client.get(f'/boards/retrieve_board/{non_existent_board_id}')

    # Assert response
    assert response.status_code == 404
    assert response.json == {'message': 'Invalid Board ID: Board Not Found'}

def test_retrieve_all_board_ids(client, monkeypatch):
    expected_board_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    # Mocking the database connection function to return the expected board IDs
    monkeypatch.setattr('app.get_db_connection', mock_get_all_db_connection(expected_board_ids))

    response = client.get('/boards/retrieve_all_board_ids')

    # Assert response
    assert response.status_code == 200
    assert response.json == expected_board_ids

# Define the test case for retrieve_all_users endpoint
def test_retrieve_all_users(client, monkeypatch):
    # Define the expected users from the database
    expected_users = [(1, 'User1'), (2, 'User2'), (3, 'User3')]

    # Mocking the database connection function to return the expected users
    monkeypatch.setattr('app.get_db_connection', mock_get__db_connection(expected_users))

    # Make a request to the endpoint
    response = client.get('/users/retrieve_all_users')

    # Assert response
    assert response.status_code == 200
    assert response.json == [{'user_id': user[0], 'user_name': user[1]} for user in expected_users] 

# Define the test case for retrieve_user endpoint
def test_retrieve_user_found(client, monkeypatch):
    # Define the expected user ID and name from the database
    expected_user_id = 1
    expected_user_name = 'User1'

    # Mocking the database connection function to return the expected user
    monkeypatch.setattr('app.get_db_connection', mock_get_db_connection((expected_user_id, expected_user_name)))

    # Make a request to the endpoint
    response = client.get(f'/users/retrieve_user/{expected_user_id}')

    # Assert response
    assert response.status_code == 200
    assert response.json == {'user_id': expected_user_id, 'user_name': expected_user_name}

def test_retrieve_user_not_found(client, monkeypatch):
    # Define a user ID that does not exist in the database
    non_existent_user_id = 999

    # Mocking the database connection function to return None (user not found)
    monkeypatch.setattr('app.get_db_connection', mock_get_db_connection(None))

    # Make a request to the endpoint
    response = client.get(f'/users/retrieve_user/{non_existent_user_id}')

    # Assert response
    assert response.status_code == 404
    assert response.json == {'message': 'Invalid User ID: User Not Found'}

"""

    POST ENDPOINTS TESTS

"""
def test_store_board_success(client, monkeypatch):
    # Store board success scenario
    board_id = 9999
    board_contents = '0 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9'
    board_answer = '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9'
    # Mocking the database connection function
    monkeypatch.setattr('app.get_db_connection', mock_post_db_connection(f'Sudoku Board (id: {board_id}) Stored Successfully!'))

    # Make a request to the endpoint
    response = client.post(f'/boards/store_board/{board_id}', json={'board_contents': board_contents, 'board_answer': board_answer})

    # Assert response
    assert response.status_code == 200
    assert response.data == f'Sudoku Board (id: {board_id}) Stored Successfully!'.encode('utf-8')

def test_store_board_unsuccess(client, monkeypatch):
    # Store board unsuccess scenario
    board_id = 9999
    board_contents = ''
    board_answer = ''

    # Mocking the database connection function
    monkeypatch.setattr('app.get_db_connection', mock_post_db_connection('Board Numbers Not Provided: Bad Board Request'))

    # Make a request to the endpoint
    response = client.post(f'/boards/store_board/{board_id}', json={'board_contents': board_contents, 'board_answer': board_answer})

    # Assert response
    assert response.status_code == 400
    assert response.json == {'message': 'Board Numbers Not Provided: Bad Board Request'}