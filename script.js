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

function mostrarResultado(el, html, erro = false) {
  el.innerHTML = html;
  el.classList.add("visivel");
  el.classList.toggle("erro", erro);
}

document.getElementById("btn-moeda").addEventListener("click", () => {
  const brl = parseFloat(document.getElementById("valor-brl").value);
  const usd = parseFloat(document.getElementById("valor-usd").value);
  const resultado = document.getElementById("resultado-moeda");

  // Valida: apenas um dos campos deve estar preenchido
  if ((!brl && !usd) || (brl && usd)) {
    resultado.value = "Preencha apenas um dos campos.";
    return;
  }

  resultado.value = "Buscando cotação...";

  fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then((response) => response.json())
    .then((data) => {
      const cotacao = parseFloat(data["USDBRL"].bid);

      if (brl) {
        const emDolar = brl / cotacao;
        resultado.value = `$ ${emDolar.toFixed(2)} USD`;
      } else {
        const emReal = usd * cotacao;
        resultado.value = `R$ ${emReal.toFixed(2)} BRL`;
      }
    })
    .catch(() => {
      resultado.value = "Erro ao buscar cotação. Tente novamente.";
    });
});
// reservado para criar o tema escuro/claro
const btnDark = document.querySelector("#toggle-theme-dark");
const btnLight = document.querySelector("#toggle-theme-light");

const style = document.createElement("style");
// reservado para criar o tema escuro/claro
