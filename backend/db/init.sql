-- CREATE DATABASE TEST_DB;
CREATE DATABASE IF NOT EXISTS TEST_DB;
USE TEST_DB;

CREATE TABLE IF NOT EXISTS Board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    board_contents VARCHAR(255),
    user_id INT
    -- FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    user_pwd VARCHAR(255)
);

INSERT INTO Board (board_id, board_contents) VALUES (1000, '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9'), (1002, '1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9');
