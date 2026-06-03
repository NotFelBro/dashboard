document.getElementById("url");
const url = fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

// reservado para criar o tema escuro/claro
const btnDark = document.querySelector("#toggle-theme-dark");
const btnLight = document.querySelector("#toggle-theme-light");

const style = document.createElement("style");
// reservado para criar o tema escuro/claro
