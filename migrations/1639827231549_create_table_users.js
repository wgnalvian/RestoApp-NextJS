module.exports = {
    up : "CREATE TABLE users (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, num_table INT NOT NULL,is_done VARCHAR(1) NOT NULL,is_pay VARCHAR(1) NOT NULL, created_at VARCHAR(255) NOT NULL,updated_at VARCHAR(255) NOT NULL)",
    down : "DROP TABLE users"
}