-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Posts table
CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Likes table
CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE(post_id, user_id) -- prevent duplicate likes
);

--A user can register for the site using email, dob, phone number, gender and password
INSERT INTO Users (email, dob, phone_number, gender, password)
VALUES ('john@example.com', '1999-05-20', '9876543210', 'Male', 'hashed_password');

-- He can post a message(text) to the platform
INSERT INTO Posts (user_id, content)
VALUES (1, 'Hello world! This is my first post.');

-- A user can like or comment on a post
INSERT INTO Likes (post_id, user_id)
VALUES (101, 2);
INSERT INTO Comments (post_id, user_id, comment_text)
VALUES (101, 3, 'Nice post!');


-- A user can search another user by phone number
SELECT * 
FROM Users
WHERE phone_number = '9876543210';


-- When a post is deleted, All likes and comments should be deleted
DELETE FROM Posts
WHERE post_id = 101;


