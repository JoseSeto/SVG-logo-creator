const inquirer = require("inquirer")
const fs = require("fs")
const {Trianlge, Square, Circle, Triangle } = require("./lib/shapes")


function writeToFile(filename, answers){
  let string = "";
  string = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  string += "<g>"
  string += `${answers.shape}`

  let userShape;
  if (answers.shape === "triangle"){
    userShape = new Triangle()
    string += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`
  }
  else if (answers.shape === "sqaure"){
    userShape = new Square()
    string += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`
  }
  else {
    userShape = new Circle()
    string += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`
  }

  string += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  string += "<g>";
  string += "</svg>";

  fs.writeFile(filename, string, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg")
  })
}


function shapeQuestions () {
    inquirer
    .prompt([
      // Text prompt
      {
        type: "input",
        message:
          "What text would you like you logo to display? (Enter up to three characters)",
        name: "text",
      },
      // Text color prompt
      {
        type: "input",
        message:
          "Choose text color (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
      },
      // Shape choice prompt
      {
        type: "list",
        message: "What shape would you like the logo to render?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      // Shape color prompt
      {
        type: "input",
        message:
          "Choose shapes color (Enter color keyword OR a hexadecimal number)",
        name: "shapeBackgroundColor",
      },
    ])
    
    .then((answers) => {
      // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
      } else {
        // Calling write file function to generate SVG file
        writeToFile("logo.svg", answers);
      }
    });
}
shapeQuestions();