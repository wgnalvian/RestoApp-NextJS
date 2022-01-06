module.exports = {
    "up": "CREATE TABLE carts (cart_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL, food_id INT NOT NULL, amount INT NOT NULL, message VARCHAR(255) DEFAULT 'empty',is_ordered VARCHAR(1) NOT NULL DEFAULT 'N', created_at VARCHAR(255) NOT NULL, updated_at VARCHAR(255) NOT NULL)",
    "down": "DROP TABLE carts"
}