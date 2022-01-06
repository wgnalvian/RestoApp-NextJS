module.exports = {
    "up": "CREATE TABLE foodOrders (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL,food_id INT NOT NULL,amount INT NOT NULL,message VARCHAR(255))",
    "down": "DROP TABLE foodOrders"
}