const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const num1 = document.querySelector(".left-operand");
const num2 = document.querySelector(".right-operand");
const operator = document.querySelector(".operator");
const answer = document.querySelector(".answer");
const equalButton = document.querySelector(".equal-button");
const clearButton = document.querySelector("#clear-button");
const decimalButton = document.querySelector(".decimal-button");
const backspaceButton = document.querySelector(".backspace-button");

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  return num2 === 0 ? (answer.innerText = "ERROR") : num1 / num2;
};

function operate(num1, num2, math) {
  return math(num1, num2);
}

function displayAnswer() {
  if (num1.innerText && operator.innerText && num2.innerText) {
    switch (operator.innerText) {
      case "+": {
        let result = operate(
          Number(num1.innerText),
          Number(num2.innerText),
          add
        );
        answer.innerText = roundDecimal(result);
        break;
      }
      case "-": {
        let result = operate(
          Number(num1.innerText),
          Number(num2.innerText),
          subtract
        );
        answer.innerText = roundDecimal(result);
        break;
      }
      case "*": {
        let result = operate(
          Number(num1.innerText),
          Number(num2.innerText),
          multiply
        );
        answer.innerText = roundDecimal(result);
        break;
      }
      case "/": {
        let result = operate(
          Number(num1.innerText),
          Number(num2.innerText),
          divide
        );
        answer.innerText = roundDecimal(result);
        break;
      }
    }
  } else {
    answer.innerText = "ERROR";
  }
}

function inputNumber() {
  if (answer.innerText) {
    clearScreen();
    num1.innerText += this.innerText;
  } else if (!operator.innerText) {
    num1.innerText += this.innerText;
  } else {
    num2.innerText += this.innerText;
  }
}

function inputNumberKey(e) {
  if (answer.innerText) {
    clearScreen();
    num1.innerText += Number(e.key);
  } else if (!operator.innerText) {
    num1.innerText += Number(e.key);
  } else {
    num2.innerText += Number(e.key);
  }
}

function inputOperator() {
  if (answer.innerText) {
    let newAnswer = answer.innerText;
    clearScreen();
    num1.innerText = newAnswer;
    operator.innerText = "";
    operator.innerText = this.innerText;
  } else if (!operator.innerText) {
    operator.innerText += this.innerText;
  } else if (operator.innerText && num2.innerText) {
    displayAnswer();
    num1.innerText = answer.innerText;
    num2.innerText = "";
    answer.innerText = "";
    operator.innerText = "";
    operator.innerText += this.innerText;
  }
}

function inputOperatorKey(e) {
  if (answer.innerText) {
    let newAnswer = answer.innerText;
    clearScreen();
    num1.innerText = newAnswer;
    operator.innerText = "";
    operator.innerText = e.key;
  } else if (!operator.innerText) {
    operator.innerText += e.key;
  } else if (operator.innerText && num2.innerText) {
    displayAnswer();
    num1.innerText = answer.innerText;
    num2.innerText = "";
    answer.innerText = "";
    operator.innerText = "";
    operator.innerText += e.key;
  }
}

function inputDecimal() {
  if (!operator.innerText) {
    if (num1.innerText.includes(".")) return;
    num1.innerText += this.innerText;
  } else {
    if (num2.innerText.includes(".")) return;
    num2.innerText += this.innerText;
  }
}

function inputDecimalKey(e) {
  if (!operator.innerText) {
    if (num1.innerText.includes(".")) return;
    num1.innerText += e.key;
  } else {
    if (num2.innerText.includes(".")) return;
    num2.innerText += e.key;
  }
}

function onKeydown(e) {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    inputNumberKey(e);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    inputOperatorKey(e);
  } else if (e.key === ".") {
    inputDecimalKey(e);
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "=") {
    displayAnswer();
  }
}

function clearScreen() {
  num1.innerText = "";
  operator.innerText = "";
  num2.innerText = "";
  answer.innerText = "";
}

function backspace() {
  if (!operator.innerText) {
    num1.innerText = num1.innerText.slice(0, -1);
  } else {
    num2.innerText = num2.innerText.slice(0, -1);
  }
}

function decimalCount(num) {
  // Counts the amount of decimals in a number
  const numStr = String(num);
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  return 0;
}

function roundDecimal(num) {
  // Will round decimals if more than 5 decimal places
  if (decimalCount(num) > 5) {
    return num.toFixed(5);
  }
  return num;
}

numberButtons.forEach((button) =>
  button.addEventListener("click", inputNumber)
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", inputOperator)
);
equalButton.addEventListener("click", displayAnswer);
clearButton.addEventListener("click", clearScreen);
decimalButton.addEventListener("click", inputDecimal);
backspaceButton.addEventListener("click", backspace);
window.addEventListener("keydown", onKeydown);
