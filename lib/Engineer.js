const Employee = require("./Employee");

class Engineer extends Employee {
  // TODO: YOUR CODE HERE
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
}

module.exports = Engineer;