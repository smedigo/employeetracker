const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// const { createPromptModule } = require("inquirer");

function askforAction() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "VIEW_DEPARTMENT",
          "VIEW_ROLE",
          "VIEW_EMPLOYEE",
          "CREATE_ROLE",
          "ADD_EMPLOYEE",
          "ADD_ROLE",
          "ADD_DEPARTMENT",
          "UPDATE_ROLE",
           "exit"
        ]
      })

      .then((res) => {
        switch (res.action) {
        case "VIEW_DEPARTMENT":
          querybyDepartment();
          return;
  
        case "VIEW_ROLE":
          queryRole();
          return;
  
        case "VIEW_EMPLOYEE":
          queryAll();
          return;

        case "CREATE_ROLE":
        createRole();
        return;

        case "ADD_EMPLOYEE":
        addEmployee();
        return;

        case "ADD_DEPARTMENT":
        addDpartment();
        return;

        case "UPDATE_ROLE":
        changeRole();
        return;

  
        default:
          connection.end();
         
        }
      });
    }

    function viewDepartment() {
        db.getDepartment()
        .then((results) =>{

            console.table(results);
        
            askforAction();
        
        });
    }

    function createRole() {
        db.getDepartment()
        .then((department) =>{

        console.log(department);

        const departmentChoices = department.map( (department)=> ({
                value: department.id,
                label: department.name,
            }) )

        // console.log (
        //      departments.map( (department)=> ({
        //         value: department.id,
        //         label: department.name,
        //     }) )
        // );


         inquirer
         .prompt([
             {
               message: " what department is this role for?", 
               type: "list",
               name: "department-id",
               choices: departmentChoices
               }
            
            
         ]).then(res =>{

            console.log(res);
         });
            
        
        });

    }
    
    askforAction();














