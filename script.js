const add = function (a, b) {
  return a + b;
};
const subtract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  if (b === 0) {
    return "Error: you cannot divide by zero";
  }
  return a / b;
};

// Function to handle the operation based on the operator
function operate(num1, operator, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else {
    return "Error: invalid operator";
  }
}

// Function to update the display
const display = function (value) {
  const display = document.querySelector(".display");
  display.value = value; // Use value to update the input field
};

// Get the operator and equal buttons
const operatorSign = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

// Variables to store the input numbers and operator
let num1 = "";
let operator = "";
let num2 = "";
let displayValue = "";

// Event listener for number buttons
const numberButtons = document.querySelectorAll(
  "button:not(.operator):not(.equal):not(.clear)"
);
numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    displayValue += button.value;
    display(displayValue);
  });
});

// Event listener for operator buttons
operatorSign.forEach((button) => {
  button.addEventListener("click", function () {
    if (num1 === "") {
      num1 = displayValue;
      operator = button.value;
      displayValue = "";
    } else if (num2 === "") {
      num2 = displayValue;
      num1 = operate(parseFloat(num1), operator, parseFloat(num2));
      operator = button.value;
      displayValue = "";
      display(num1);
    }
  });
});

// Event listener for equal button
equal.addEventListener("click", function () {
  if (num1 !== "" && displayValue !== "") {
    num2 = displayValue;
    const result = operate(parseFloat(num1), operator, parseFloat(num2));
    display(result);
    num1 = result;
    operator = "";
    displayValue = "";
  }
});

// Event listener for clear button
clear.addEventListener("click", function () {
  num1 = "";
  num2 = "";
  operator = "";
  displayValue = "";
  display(""); // Clear the display
});
