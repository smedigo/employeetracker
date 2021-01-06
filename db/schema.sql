DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(30),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id),
    REFERENCES department(id),
    ON DELETE SET NULL,

);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id),
    REFERECENES role(id),
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id),
    REFERENCES employee(id),
    ON DELETE SET NULL,
);