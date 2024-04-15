-- CREATE DATABASE TEST_DB;
CREATE DATABASE IF NOT EXISTS TEST_DB;
USE TEST_DB;

CREATE TABLE IF NOT EXISTS Board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    board_contents VARCHAR(255),
    board_answer VARCHAR(255)
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

INSERT INTO Board (board_id, board_contents, board_answer) VALUES (3, '4,0,7,2,1,6,0,9,3,0,3,0,4,5,0,6,7,0,0,0,9,3,0,7,4,0,0,1,0,8,0,6,4,0,3,0,9,7,6,0,0,0,0,2,4,3,0,5,0,7,0,9,6,1,8,9,2,0,0,3,0,5,0,5,0,3,7,0,8,0,4,0,7,6,0,5,0,1,3,8,0', '4,8,7,2,1,6,5,9,3,2,3,1,4,5,9,6,7,8,6,5,9,3,8,7,4,1,2,1,2,8,9,6,4,7,3,5,9,7,6,1,3,5,8,2,4,3,4,5,8,7,2,9,6,1,8,9,2,6,4,3,1,5,7,5,1,3,7,9,8,2,4,6,7,6,4,5,2,1,3,8,9');

INSERT INTO User (user_id, user_name, user_pwd) VALUES (0, 'test_user', 'test_password');
