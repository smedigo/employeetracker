DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT unsigned AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE role (
    id INT unsigned AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL unsigned NOT NULL,
    department_id INT unsigned NOT NULL,
    PRIMARY KEY (id),
    index dep_ind (department_id);
    constraint fk_department foreign key (department_id) references department(id) on delete CASCADE 
);

CREATE TABLE employee (
    id INT unsigned AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT unsigned NOT NULL,
    manager_id INT unsigned,
    PRIMARY KEY (id),
    INDEX role_ind (role_id);
    constraint fk_role foreign key (role_id) references role(id) on delete CASCADE 
    index manager_ind (manager_id);
    constraint fk_manager foreign key (manager_id) references employee(id) on delete CASCADE 
);