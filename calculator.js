const display = document.querySelector(".display");
const btns = document.querySelector(".btns");

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const signs = ["+", "-", "x", "/", "%"];
let firstNum = "";
let secondNum = "";
let sign = "";
let result = false;

btns.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;
  if (e.target.classList.contains("ac")) {
    firstNum = "";
    secondNum = "";
    sign = "";
    result = false;
    display.textContent = "0";
  }
  console.log(firstNum, secondNum);
  const key = e.target.textContent;

  if (numbers.includes(key)) {
    if (secondNum === "" && sign === "") {
      if (key === "." && firstNum.includes(".")) {
        firstNum += "";
        display.textContent = `${firstNum} ${sign} ${secondNum}`;
      } else {
        firstNum += key;
        display.textContent = `${firstNum} ${sign} ${secondNum}`;
      }
    } else if (firstNum !== "" && secondNum !== "" && result) {
      secondNum = key;
      result = false;
      display.textContent = `${firstNum} ${sign} ${secondNum}`;
    } else {
      if (key === "." && secondNum.includes(".")) {
        secondNum += "";
        display.textContent = `${firstNum} ${sign} ${secondNum}`;
      } else {
        secondNum += key;
        display.textContent = `${firstNum} ${sign} ${secondNum}`;
      }
    }
  }

  if (signs.includes(key)) {
    sign += key;
    display.textContent = `${firstNum} ${sign} ${secondNum}`;
  }

  if (e.target.classList.contains("c")) {
    if (secondNum) {
      secondNum = secondNum.substring(0, secondNum.length - 1);
      display.textContent = `${firstNum ? firstNum : "0"} ${sign} ${secondNum}`;
    } else if (sign) {
      sign = sign.substring(0, sign.length - 1);
      display.textContent = `${firstNum ? firstNum : "0"} ${sign} ${secondNum}`;
    } else firstNum = firstNum.toString().substring(0, firstNum.length - 1);
    display.textContent = `${firstNum ? firstNum : "0"} ${sign} ${secondNum}`;
  }

  if (key === "=") {
    switch (sign) {
      case "+":
        firstNum = +firstNum + +secondNum;
        break;
      case "-":
        firstNum = firstNum - secondNum;
        break;
      case "x":
        firstNum = firstNum * secondNum;
        break;
      case "/":
        if (secondNum === "0") {
          firstNum = "";
          secondNum = "";
          sign = "";
          display.textContent = "Error";
          return;
        }
        firstNum = firstNum / secondNum;
        break;
      case "%":
        firstNum = (firstNum / 100) * secondNum;
        break;
    }
    secondNum = "";
    sign = "";
    result = true;
    display.textContent = `${firstNum} ${sign} ${secondNum}`;
  }
});
