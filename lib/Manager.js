const Employee = require("./Employee");

class Manager extends Employee {
  // TODO: YOUR CODE HERE
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

}

module.exports = Manager;