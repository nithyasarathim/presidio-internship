-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    INDEX idx_phone_number (phone_number)
);

-- Posts table
CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) 
);

-- Likes table
CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ,
    UNIQUE(post_id, user_id) -- prevent duplicate likes
);

-- Comments table
CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
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
DELIMITER $$
CREATE PROCEDURE delete_post(IN p_post_id INT)
BEGIN
    START TRANSACTION;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK TO before_delete;
        ROLLBACK;                  
    END;
    SAVEPOINT before_delete;
    DELETE FROM Comments
    WHERE post_id = p_post_id;
    DELETE FROM Likes
    WHERE post_id = p_post_id;
    DELETE FROM Posts
    WHERE post_id = p_post_id;
    COMMIT;
END
$$ DELIMITER ;

--delete_post(101); -- Call the procedure to delete post with id 101



