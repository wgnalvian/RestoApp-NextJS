module.exports = {
    "up": "CREATE TABLE foods (food_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,food VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, price VARCHAR(255) NOT NULL, created_at VARCHAR(255) NOT NULL, updated_at VARCHAR(255) NOT NULL);",
    "down": "DROP TABLE foods"
}