DROP USER IF EXISTS 'bestradeapp'@'localhost';
FLUSH privileges;
CREATE USER 'bestradeapp'@'localhost' IDENTIFIED BY 'bestradeapp';
GRANT ALL PRIVILEGES ON * . * TO 'bestradeapp'@'localhost';
ALTER USER 'bestradeapp'@'localhost' IDENTIFIED BY 'bestradeapp';