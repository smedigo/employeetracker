DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
    id INT unsigned AUTO_INCREMENT,
    name VARCHAR(300) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    role_id INT unsigned AUTO_INCREMENT,
    title VARCHAR(300) UNIQUE NOT NULL,
    salary DECIMAL unsigned NOT NULL,
    department_id INT unsigned NOT NULL,
    PRIMARY KEY (id)
    CONSTRAINT fk_department 
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL 
);
CREATE TABLE employee (

    
    id INT unsigned AUTO_INCREMENT,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    role_id INT unsigned,
    manager_id INT unsigned,
    PRIMARY KEY (id)
    CONSTRAINT fk_role_id
    FOREIGN KEY  (role_id)
    
    REFERENCES role(role_id) 
    ON DELETE SET NULL
    CONSTRAINT fk_manager_id
    FOREIGN KEY (manager_id)
     
    REFERENCES employee(id)
     ON DELETE SET NULL
);


SELECT * FROM employeedb