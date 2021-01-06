DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
    id INT unsigned AUTO_INCREMENT,
    name VARCHAR(300) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INT unsigned AUTO_INCREMENT,
    title VARCHAR(300) UNIQUE NOT NULL,
    salary DECIMAL unsigned NOT NULL,
    department_id INT unsigned NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_department 
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE CASCADE 
);
CREATE TABLE employee (
    id INT unsigned AUTO_INCREMENT,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    role_id INT unsigned NOT NULL,
    manager_id INT unsigned,
    PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY  (role_id) REFERENCES role(id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE 
);


SELECT * FROM employeedb