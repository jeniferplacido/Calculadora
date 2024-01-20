document.addEventListener("DOMContentLoaded", function () {
  const previousOperacoesElement =
    document.getElementById("previous-operacoes");
  const currentOperacoesElement = document.getElementById("current-operacoes");

  let currentOperacoes = "";
  let previousOperacoes = "";
  let operacao = "";
  let calculo = "";

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      handleButtonClick(button.innerText);
      updateDisplay();
    });
  });

  function handleButtonClick(value) {
    if (value === "C") {
      clearAll();
    } else if (value === "CE") {
      clearEntry();
    } else if (value === "DEL") {
      deleteLast();
    } else if (isNaN(value) && value !== ".") {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }

    updateDisplay();
  }

  function clearAll() {
    currentOperacoes = "";
    previousOperacoes = "";
    operacao = "";
    calculo = "";
  }

  function clearEntry() {
    currentOperacoes = "";
  }

  function deleteLast() {
    if (operacao === "=") {
      clearAll();
    } else {
      currentOperacoes = currentOperacoes.slice(0, -1);
    }
  }

  function handleNumber(number) {
    if (operacao === "=") {
      clearAll();
    }
    currentOperacoes += number;
  }

  function handleSymbol(symbol) {
    if (symbol !== "=") {
      if (currentOperacoes !== "") {
        previousOperacoes = currentOperacoes + " " + symbol;
        operacao = symbol;
        currentOperacoes = "";
      }
    } else {
      if (currentOperacoes !== "" && previousOperacoes !== "") {
        previousOperacoes += " " + currentOperacoes;
        try {
          calculo = eval(previousOperacoes);
          currentOperacoes = calculo;
          operacao = "=";
        } catch (error) {
          currentOperacoes = "Erro";
        }
      }
    }
  }

  function updateDisplay() {
    previousOperacoesElement.textContent = previousOperacoes;
    currentOperacoesElement.textContent = currentOperacoes;
  }
});
