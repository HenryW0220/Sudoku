import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_retrieve_board(client):
    # Test valid board retrieval
    response = client.get('/boards/retrieve_board/1000')
    assert response.status_code == 200
    data = response.get_json()
    assert data[0] == 1  # Check if board ID matches
    # You can add more assertions here to validate the response data

#     # Test invalid board retrieval
#     response = client.get('/boards/retrieve_board/999')
#     assert response.status_code == 404
#     data = response.get_json()
#     assert 'Invalid Board ID' in data['message']

# def test_store_board(client):
#     # Test valid board storage
#     response = client.post('/boards/store_board/2', json={'board_contents': [1, 2, 3, 4, 5, 6, 7, 8, 9]})
#     assert response.status_code == 200
#     assert 'Stored Successfully' in response.data.decode()

#     # Test invalid board storage
#     response = client.post('/boards/store_board/3', json={})
#     assert response.status_code == 400
#     data = response.get_json()
#     assert 'Board Numbers Not Provided' in data['message']
