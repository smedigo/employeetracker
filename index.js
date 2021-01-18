const { prompt } = require("inquirer");
const db = require("./db");
// an npm package that displays the data well
require("console.table");
init();
// Display logo text
function init() {
// intial readout when application is run on console
console.log("           EMPLOYEE TRACKER   ");
  loadMainPrompts();
}
// the async keyword is added to functions to tell them to return a promise rather than directly returning the value.
// await only works inside of asyn functions & can be  put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value.
async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);
  // Call the appropriate function depending on what the user chooses
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    default:
      return quit();
  }
}
async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);
  const employees = await db.findAllEmployeesByDepartment(departmentId);
  console.log("\n");
  console.table(employees);
  loadMainPrompts();
}
async function removeEmployee() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);
  await db.removeEmployee(employeeId);
  console.log("Removed employee from the database");
  loadMainPrompts();
}
async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);
  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));
  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);
  await db.updateEmployeeRole(employeeId, roleId);
  console.log("Updated employee's role");
  loadMainPrompts();
}
async function viewRoles() {
  const roles = await db.findAllRoles();
  console.log("\n");
  console.table(roles);
  loadMainPrompts();
}
async function addRole() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));
  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);
  await db.createRole(role);
  console.log(`Added ${role.title} to the database`);
  loadMainPrompts();
}
async function removeRole() {
  const roles = await db.findAllRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));
  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to remove?",
      choices: roleChoices
    }
  ]);
  await db.removeRole(roleId);
  console.log("Removed role from the database");
  loadMainPrompts();
}
async function viewDepartments() {
  const departments = await db.findAllDepartments();
  console.log("\n");
  console.table(departments);
  loadMainPrompts();
}
async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);
  await db.createDepartment(department);
  console.log(`Added ${department.name} to the database`);
  loadMainPrompts();
}
async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();
  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));
  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });
  employee.role_id = roleId;
  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });
  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });
  employee.manager_id = managerId;
  await db.createEmployee(employee);
  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );
  loadMainPrompts();
}
function quit() {
  process.exit();
}





