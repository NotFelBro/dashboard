document.getElementById("url");
const url = fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
