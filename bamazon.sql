CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sip of Sunshine IPA", "beer", 6.99, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pliny the Elder", "beer", 12.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Michter's Celebration", "bourbon", 4999.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pappy van Winkle 20 year", "bourbon", 259.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("George T Stagg", "bourbon", 129.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("WL Weller 12 year", "bourbon", 26.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eagle Rare", "bourbon", 29.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Four Roses Single Barrel", "bourbon", 62.99, 64);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Focal Banger", "beer", 4.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Heady Topper", "beer", 5.99, 12);