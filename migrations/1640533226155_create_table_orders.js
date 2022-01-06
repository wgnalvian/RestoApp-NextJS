module.exports = {
    "up": "CREATE TABLE orders (order_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL,  is_served VARCHAR(1) DEFAULT 'N',created_at VARCHAR(255) NOT NULL, updated_at VARCHAR(255) NOT NULL)",
    "down": "DROP TABLE orders"
}