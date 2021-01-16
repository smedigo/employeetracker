const connection = require("./connection");

// module.exports = {
//      getDepartment() {
//       return connection.query("SELECT * FROM department")

//      },

class employeeDB {
    // KEEP A REFERENCE TO connection
    constructor(contructor) {
        this.connection = connection;
    }
    findAllEmployees() {
        // Find all employees, join with roles and departments to 
        //display their roles, salaries, departments, managers
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id; "
        );
    }
    // Find all employees except the given employee id 
    findAllPossibleManagers(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );

    }
    // Create a new employee 
    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }


    // Remove a new employee with given Id 
    deleteEmployee(employeeId) {
        return this.connection.query("DELETE FROM employee WHERE id = ?", employeeId)

    }

    // Update an employee with the given role 
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId])
    }

    // Update the employee's given manager

    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId])
    }

    // find all roles, join with departments to display the department name
    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // create new role

    // remove a role from the database

    // create new department

    // remove a department

    // Find all employees in a given department, join with roles to display titles

    // Find all employees by manager, join with departments and roles to display titles and department names

}

// can we do without class and constructor

modeule.exports = new employeeDB(connection);







