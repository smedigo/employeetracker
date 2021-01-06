USE employeeDB;
INSERT INTO department (name)

VALUES
(physical therapy),
(ocupational therapy),
(office management);

INSERT INTO 
role (title, salary, department_id )

VALUES
('physical therapist', 90000, 1),
('director of PT', 150000, 1),
('physical therapy assistant', 50000, 1),
('occupational therapist',90000, 2),
('director OT', 130000, 2),
('ocupational therapist assistant', 45000, 2),
('receptionist', 35000, 3),
("HR", 55000, 3),
('office director', 120000, 3);



INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES

('Kate', 'Smith', 1, null),
('Michael', 'Johnson', 3, 1),
('Dwane', 'North', 2, null),
('Monica', 'Torry', 1, null),
('Elizabeth', 'Empy', 3, 2),
('Biljana', 'Mc', 2, null),
('Natalija', 'W', 5, null),
('Alexander', 'South', 4, null),
('Alex', 'Davidson', 3, 3);