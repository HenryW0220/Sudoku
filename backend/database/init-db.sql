CREATE DATABASE t24_db;

CREATE TABLE IF NOT EXISTS Board (
    board_id INT AUTO_INCREMENT PRIMARY KEY,
    board_contents VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255)
);