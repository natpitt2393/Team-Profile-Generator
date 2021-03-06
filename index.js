const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
console.log(OUTPUT_DIR);
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./src/page-template.js");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the team manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "managerID",
        message: "What is the team manager's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the team manager's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the team manager's office number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      }
    ]).then(answers => {
      console.log(answers);
      
      
      const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)

      
      teamMembers.push(manager);
      
      idArray.push(answers.managerID);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch (userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        message: "What is this engineer's name?",
        name: 'engineerName'
      },
      {
        type: "input",
        message: "What is this engineer's ID number?",
        name: "engineerID"
      },
      {
        type: 'input',
        message: "What is this engineer's email address?",
        name: 'engineerEmail'
      },
      {
        type: 'input',
        message: "What is this engineer's Github username?",
        name: 'engineerGithub'
      }

    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);

  
      teamMembers.push(engineer);

  
      idArray.push(answers.engineerID);
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: 'input',
        message: "What is this intern's name?",
        name: 'internName'
      },
      {
        type: "input",
        message: "What is this intern's ID number?",
        name: "internID"
      },
      {
        type: 'input',
        message: "What is this intern's email address?",
        name: 'internEmail'
      },
      {
        type: 'input',
        message: 'Where does this intern attend university?',
        name: 'internUniversity'
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internUniversity);
      teamMembers.push(intern);
      idArray.push(answers.internID);
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}

appMenu();