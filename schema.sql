CREATE DATABASE chat_app;
USE chat_app;

CREATE TABLE messages (
    id integer PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(100) NOT NULL, 
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO messages (user, content)
VALUES 
('First user', 'Content of first user'),
('Second user', 'Content of second user');
