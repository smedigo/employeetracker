DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(300) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role (
    role_id INT AUTO_INCREMENT,
    title VARCHAR(300) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (role_id),
     
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL 
);
CREATE TABLE employee (

    
    id INT AUTO_INCREMENT,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    role_id INT ,
    manager_id INT ,
    PRIMARY KEY (id),
    
    FOREIGN KEY  (role_id)
    
    REFERENCES role(role_id) 
    ON DELETE SET NULL,
    
    FOREIGN KEY (manager_id)
     
    REFERENCES employee(id)
     ON DELETE SET NULL
);


--SELECT * FROM employeedb






