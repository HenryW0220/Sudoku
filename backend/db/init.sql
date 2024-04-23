-- CREATE DATABASE TEST_DB;
CREATE DATABASE IF NOT EXISTS TEST_DB;
USE TEST_DB;

CREATE TABLE IF NOT EXISTS Board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    board_contents VARCHAR(255),
    board_answer VARCHAR(255),
    user_id INT
    -- FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    user_pwd VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PartialBoard (
    user_id INT,
    board_id INT,
    partial_board_contents VARCHAR(255),
    PRIMARY KEY (user_id, board_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (board_id) REFERENCES Board(board_id)
);

INSERT INTO Board (board_id, board_contents, board_answer) VALUES (0, '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9', '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9');

INSERT INTO User (user_id, user_name, user_pwd) VALUES (0, 'test_user', 'test_password');
