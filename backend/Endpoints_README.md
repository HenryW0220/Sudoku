# Sudoku Flask API Documentation

This Flask API provides endpoints to interact with Sudoku boards and users.

## Endpoints

### Retrieve All Boards

- **URL**: `/boards/retrieve_all_boards`
- **Method**: GET
- **Description**: Retrieve all Sudoku boards stored in the database.
- **Example Output**:
    ```json
    [[1005, [1, 2, 3, ...], [1, 2, 3, ...]], ...]
    ```

### Retrieve Board by ID

- **URL**: `/boards/retrieve_board/<int:board_id>`
- **Method**: GET
- **Description**: Retrieve a specific Sudoku board by its ID.
- **Parameters**: `board_id` (int)
- **Example Output**:
    ```json
    [1005, 1, 2, 3, ..., 9]
    ```

### Retrieve All Users

- **URL**: `/users/retrieve_all_users`
- **Method**: GET
- **Description**: Retrieve all users stored in the database.
- **Example Output**:
    ```json
    [{"user_id": 1234, "user_name": "test_user"}, ...]
    ```

### Retrieve User by ID

- **URL**: `/users/retrieve_user/<int:user_id>`
- **Method**: GET
- **Description**: Retrieve a specific user by their ID.
- **Parameters**: `user_id` (int)
- **Example Output**:
    ```json
    {"user_id": 1234, "user_name": "test_user"}
    ```

### Retrieve Partial Board

- **URL**: `/users/<int:user_id>/partial_boards/retrieve_partial_board/<int:board_id>`
- **Method**: GET
- **Description**: Retrieve a partially completed Sudoku board for a specific user and board ID.
- **Parameters**: `user_id` (int), `board_id` (int)
- **Example Output**:
    ```json
    {"user_id": 1234, "board_id": 1005, "partial_board_contents": [1, 2, 3, ...], "board_answer": [1, 2, 3, ...]}
    ```

### Store Board

- **URL**: `/boards/store_board/<int:board_id>`
- **Method**: POST
- **Description**: Store a Sudoku board in the database.
- **Parameters**: `board_id` (int), JSON body containing `board_contents` and `board_answer`
- **Example Output**: `Sudoku Board (id: 1006) Stored Successfully!`

### Store Partial Board

- **URL**: `/users/<int:user_id>/partial_boards/store_partial_board/<int:board_id>`
- **Method**: POST
- **Description**: Store a partially completed Sudoku board for a specific user.
- **Parameters**: `user_id` (int), `board_id` (int), JSON body containing `partial_board_contents`
- **Example Output**: `Partial Board (user_id: 1234, board_id: 1006) Stored Successfully!`