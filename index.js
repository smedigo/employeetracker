const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const { createPromptModule } = require("inquirer");

function askforAction() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "VIEW_DEPARTMENTS",
          "VIEW_ROLES",
          "VIEW_EMPLOYEES",
          "CREATE_ROLE",
           "exit"
        ]
      })

      .then((res) => {
        switch (res.action) {
        case "VIEW_DEPARTMENTS":
          
          return;
  
        case "VIEW_ROLES":
          
          return;
  
        case "VIEW_EMPLOYEES":
          
          return;

        case "CREATE_ROLE":
        createRole();
        return;
  
        default:
          connection.end();
         
        }
      });
    }

    function viewDepartments() {
        db.getDepartments()
        .then((results) =>{

            console.table(results);
        
            askforAction();
        
        });
    }

    function createRole() {
        db.getDepartments()
        .then((departments) =>{

        console.log(departments);

        const departmentChoices = departments.map( (department)=> ({
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














