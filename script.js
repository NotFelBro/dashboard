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
  try {
    const res = await fetch(
      "https://economia.awesomeapi.com.br/json/last/" + pares.join(","),
    );
    const data = await res.json();
    Object.keys(data).forEach((k) => {
      taxas[k] = parseFloat(data[k].bid);
    });

    const badge = document.getElementById("taxa-badge");
    if (badge) {
      badge.textContent = "Taxa";
      badge.style.color = "green";
    }
  } catch (error) {
    console.error("Error ao carregar taxas:", e);
    const badge = document.getElementById("taxa-badge");
    if (badge) badge.textContent = "Offline";
  }
}

function converteMoedas() {
  const valor = parseFloat(document.getElementById("moeda-valor").value);
  const de = document.getElementById("moeda-de").value;
  const para = document.getElementById("moeda-para").value;
  const resultado = document.getElementById("moeda-resultado");

  if (isNaN(valor)) {
    resultado.textContent = "Digite um valor válido.";
    return;
  }

  if (de === para) {
    resultado.textContent = valor.toFixed(2) + " " + para;
    return;
  }

  let emBRL;
  if (de === "BRL") {
    emBRL = valor;
  } else {
    const key = de + "-BRL";
    if (!taxas[key]) {
      resultado.textContent = "Taxa não disponível para " + de;
      return;
    }
    emBRL = valor * taxas[key];
  }

  let resul;
  if (para === "BRL") {
    resul = emBRL;
  } else {
    const key = para + "-BRL";
    if (!taxas[key]) {
      resultado.textContent = "Taxa não disponível para " + para;
      return;
    }
    resultado = emBRL / taxas[key];
  }

  resultado.textContent =
    valor +
    " " +
    de +
    " = " +
    resul.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) +
    " " +
    para;
}
