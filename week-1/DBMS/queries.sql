--schemas are created in the schemas.sql file

-- Get a user by phone number
SELECT * 
FROM Users 
WHERE phone_number = '9876543210';

-- Fetch all posts of a user
SELECT post_id, content, created_at
FROM Posts
WHERE user_id = 1;

-- Get the all posts along with their total likes and total comments
SELECT p.post_id, p.content,
       COUNT(DISTINCT l.like_id) AS total_likes,
       COUNT(DISTINCT c.comment_id) AS total_comments
FROM Posts p
LEFT JOIN Likes l ON p.post_id = l.post_id
LEFT JOIN Comments c ON p.post_id = c.post_id
GROUP BY p.post_id, p.content;


-- Find the most liked post
SELECT p.post_id, p.content, COUNT(l.like_id) AS like_count
FROM Posts p
JOIN Likes l ON p.post_id = l.post_id
GROUP BY p.post_id, p.content
ORDER BY like_count DESC
LIMIT 1;


-- Fetch all comments for a post
SELECT c.comment_id, c.comment_text, u.email AS commenter_email, c.created_at
FROM Comments c
JOIN Users u ON c.user_id = u.user_id
WHERE c.post_id = 101
ORDER BY c.created_at;
