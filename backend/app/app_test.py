import pytest
from app import app
from unittest.mock import MagicMock

# # Mocking the database connection function
# def mock_get_db_connection():
#     connection = MagicMock()
#     cursor = MagicMock()
#     cursor.fetchone.return_value = ('1000', '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9')
#     # cursor.fetchone.return_value = None
#     return connection, cursor

# Set up a fixture for the app client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Test cases
def test_retrieve_board_found(client, monkeypatch):
    # Mocking the database connection function
    def mock_get_db_connection():
        connection = MagicMock()
        cursor = MagicMock()
        cursor.fetchone.return_value = ('1000', '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9')
        # cursor.fetchone.return_value = None
        return connection, cursor

    # Mocking the database connection function
    monkeypatch.setattr('app.get_db_connection', mock_get_db_connection)

    # Simulate a board found scenario
    expected_board_id = 1000
    expected_board_contents = '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9'
    expected_response = [expected_board_id] + [int(num) for num in expected_board_contents.split()]

    # Make a request to the endpoint
    response = client.get(f'/boards/retrieve_board/{expected_board_id}')
    print(response.json)

    # Assert response
    assert response.status_code == 200
    assert response.json == expected_response

def test_retrieve_board_not_found(client, monkeypatch):
    # Mocking the database connection function
    def mock_get_db_connection():
        connection = MagicMock()
        cursor = MagicMock()
        cursor.fetchone.return_value = None
        return connection, cursor
    
    # Mocking the database connection function
    monkeypatch.setattr('app.get_db_connection', mock_get_db_connection)
    

    # Simulate a board not found scenario
    non_existent_board_id = 999

    # Make a request to the endpoint
    response = client.get(f'/boards/retrieve_board/{non_existent_board_id}')

    # Assert response
    assert response.status_code == 404
    assert response.json == {'message': 'Invalid Board ID: Board Not Found'}

