const lista = document.getElementById("evento-pai");
const elements = document.querySelectorAll("section");

lista.addEventListener("click", (e) => {
  const id = e.target.id;
  if (!id) return;
  elements.forEach((section) => {
    section.classList.remove("ativa");
    if (section.classList.contains("secao-" + id)) {
      section.classList.add("ativa");
    }
  });
});

/* section moedas */

const taxas = {};

async function carregarTaxas() {
  const pares = ["USD-BRL", "EUR-BRL"];

  const res = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL",
  );
  const data = await res.json();
  Object.keys(data).forEach((k) => {
    taxas[k] = parseFloat(data[k].bid);
  });
}

// reservado para criar o tema escuro/claro
const btnDark = document.querySelector("#toggle-theme-dark");
const btnLight = document.querySelector("#toggle-theme-light");

const style = document.createElement("style");
// reservado para criar o tema escuro/claro
