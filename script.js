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
const modulus = function(a, b) {
   return a % b;
 };

 const exponentiate = function(a, b) {
   return Math.pow(a, b); // a raised to the power of b
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
   } else if (operator === "%") {
     return modulus(num1, num2);
   } else if (operator === "**") {
     return exponentiate(num1, num2); 
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
    // If an operator was just pressed, reset display for new input
    if (displayValue === "" && num1 !== "") {
      displayValue = button.value; // Start a new input after the operator
      display(displayValue); // Show the new number
    } else {
      displayValue += button.value; // Append digits to display value
      display(displayValue);
    }
  });
});

// Event listener for operator buttons
operatorSign.forEach((button) => {
  button.addEventListener("click", function () {
    if (button.value === "sqrt") {
      // Special case for sqrt, use only num1
      if (num1 !== "") {
        num1 = displayValue; // Store the value in num1
        display(Math.sqrt(parseFloat(num1))); // Apply square root directly
        displayValue = ""; // Clear the displayValue for next inputs
      }
    } else {
      if (num1 === "") {
        num1 = displayValue;
        operator = button.value;
        displayValue = "";
      } else if (num2 === "") {
        num2 = displayValue;
        num1 = operate(parseFloat(num1), operator, parseFloat(num2));
        operator = button.value;
        display(num1);
        displayValue = "";
      }
    }
  });
});

// Function to round resultsfunction roundResult(result) {
function roundResult(result) {
  return Math.round(result * 1000000000) / 1000000000; // Round to 9 decimal places
}

// Event listener for equal button
equal.addEventListener("click", function () {
  // Ensure that num1, num2, and operator are available
  if (num1 !== "" && operator !== "" && displayValue !== "") {
    num2 = displayValue; // Set num2 to the current display value
    const result = operate(parseFloat(num1), operator, parseFloat(num2)); // Perform the operation
    display(roundResult(result)); // Round and display the result

    // Prepare for the next operation with the result as num1
    num1 = result;
    operator = ""; // Clear operator after calculating
    displayValue = ""; // Reset display value to empty
  } else {
    // If incomplete operation, show error message
    display("Error: incomplete operation");
  }
});

clear.addEventListener("click", function () {
  num1 = ""; // Clear num1
  num2 = ""; // Clear num2
  operator = ""; // Clear the operator
  displayValue = ""; // Reset the display
  display(""); // Clear display on screen
});

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", function () {
  if (!displayValue.includes(".")) {
    displayValue += ".";
    display(displayValue);
  }
});

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", function () {
  displayValue = displayValue.slice(0, -1);
  display(displayValue);
});

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key)) {
    displayValue += key;
    display(displayValue);
  }
  // Map other keys (operators, equal, etc.)
});
