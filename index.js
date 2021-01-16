const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
require("console.table");
// used for hiding information for security purposes
require("dotenv").config()
// const { createPromptModule } = require("inquirer");

connection.connect(function(err) {
  if (err) throw err;
init();
});


function init() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Find all employees except the given employee id",
          "Create a new employee",
          "Remove a new employee with given Id",
          "Update an employee with the given role",
          "Update the employee's given manager",
          "find all roles, join with departments to display the department name",
          
           "exit"
        ]
      })

      .then((res) => {

        // call the appropriate function depending on what the user choses
        switch (res.action) {
        case "View All Employees":
          findAllEmployees();
          return;
  
        case "Find all employees except the given employee id":
          findAllPossibleManagers();
          return;
  
        case "Create a new employee":
        createEmployee();
          return;

        case "Remove a new employee with given Id":
          deleteEmployee();
        return;

        case "Update an employee with the given role":
          updateEmployeeRole();
        return;

        case "Update the employee's given manager":
          updateEmployeeManager();
        return;

        case "find all roles, join with departments to display the department name":
          findAllRoles();
        return;

  
        default:
          connection.end();
         
        }
      });
    }

    function findAllEmployees() {
      connection.query(
        `SELECT employee.id, employee.first_name AS “first name”, employee.last_name AS “last name”,
          role.title, role.salary, department.name AS “department”,
          CONCAT(manager.first_name,” “,manager.last_name) AS “manager”
          FROM employee
          LEFT JOIN role ON employee.role_id = role.id
          LEFT JOIN department ON role.department_id = department.id
          LEFT JOIN employee manager ON manager.id = employee.manager_id;`,
        function(err, res) {
          console.table(res);
          init();
        }
      );
    }
    function findAllPossibleManagers() {

      connection.query(
        `SELECT CONCAT(manager.first_name,” “,manager.last_name) AS “manager”,
        CONCAT(employee.first_name,” “,employee.last_name) AS “Employee”, role.title, role.salary,
        department.name AS “department”
          FROM employee
          LEFT JOIN role ON employee.role_id = role.id
          LEFT JOIN department ON role.department_id = department.id
          LEFT JOIN employee manager ON manager.id = employee.manager_id
          ORDER BY manager;`,
        function(err, res) {
          console.table(res);
          init();
        }
      );




    }


    function createEmployee() {

connection.query("Select title, id FROM role", function(errRole, resRole) {
  if (errRole) throw errRole;
  connection.query(
    `SELECT CONCAT(first_name, " ", last_name) AS ManagerName, id FROM employee;`,
    function(errManager, resManager) {
      if (errManager) throw errManager;
      inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "Enter the employee's first name."
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee's last name."
      },
      {
        name: "employeeRole",
        type: "list",
        message: "Select employees role.",
        choices: resRole.map(role => {
          return {
            name: role.title,
            value: role.id
          };
        })
      },
      {
        name: "employeeManager",
        type: "list",
        message: "Enter the employee's manager.",
        choices: resManager.map(manager => {
          return {
            name: manager.MANAGERname,
            value: manager.id
          }
        })
      },
    ]) .then(function(answer) {
      connection.query (
        "INSERT INTO employee SET ?",
        {
         first_name: answer.firstName,
         last_name: answer.lastName,
         role_id: answer.employeeRole,
         manager_id: answer.employeeManager
        },
        function(err) {
          if (err) throw err;
          init();
        }
      );
    });
    }
  )
})


    }

    function deleteEmployee () {

    connection.query( `SELECT CONCAT(first_name," ", last_name) AS nameOfEmployee, id FROM employee;`,
    function(err, res) {
      if (err) throw err;
      inquirer
      .prompt([
        {
          name: "deleteEmployee",
          type: "list",
          message: "Select an employee to remove",
          choices: res.map(employee => {
            return {
              name: employee.nameOfEmployee,
              value: employee.id
            };
          })
        }
      ])
      .then(function(answer) {
        connection.query(
          "DELETE FROM employee WHERE id = ?",
          [answer.deleteEmployee],
          function(err) {
            if (err) throw err;
            console.log("Employee removed!");
            init();
          }
        );
      });
  }
);
}

function updateEmployeeRole() {

  connection.query(`SELECT CONCAT(first_name," ", last_name) AS nameOfEmployee, id FROM employee`,
  function(errEmployee, resEmployee) {
    if (errEmployee) throw errEmployee;
    connection.query("Select title, id FROM role", function(
      errRole,
      resRole
    ){
      if (errRole) throw errRole;
      inquirer.prompt([{
        name: "nameOfEmployee",
        type: "list",
        message:"Select employee.",
        choices: resEmployee.map(employee => {
          return {
            name: employee.nameOfEmployee,
            value: employee.id
          };
        })
      },

      {
        name: "employeeRole",
        type: "lsit",
        message:"Select employee's new role",
        choices: resRole.map(role => {
          return {
            name: role.title,
            value: role.id
          };
        })
      },
    ]) .then (function(answer) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answer.employeeRole, answer.nameOfEmployee],
        function(err) {
          if (err) throw err;
          console.log("Employee role updated!");
          init();
        }
      );
    });
    })

  }
  );


}

function updateEmployeeManager() {



}

function findAllRoles ()
{

} 


askforAction();














