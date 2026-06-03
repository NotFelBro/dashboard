document.getElementById("url");
const url = fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

const lista = document.getElementById("evento-pai");
const section = document.querySelectorAll("section");
const botoes = document.querySelectorAll("#evento-pai button");

lista.addEventListener("click", (e) => {
  const id = e.target.id;
  if (!id) return;

  section.forEach((section) => {
    section.classList.remove("ativa");
    if (section.classList.contains("secao-" + id)) {
      section.classList.add("ativa");
    }
  });

  botoes.forEach((btn) => btn.classList.remove("ativo"));
  e.target.classList.add("ativo");
});

// reservado para criar o tema escuro/claro
const btnDark = document.querySelector("#toggle-theme-dark");
const btnLight = document.querySelector("#toggle-theme-light");

const style = document.createElement("style");
// reservado para criar o tema escuro/claro
