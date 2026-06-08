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

const FALLBACK = {
  "USD-BRL": 5.75,
  "EUR-BRL": 6.2,
};

async function carregarTaxas() {
  const pares = ["USD-BRL", "EUR-BRL"];
  const url = "https://economia.awasomeapi.com.br/last/" + pares.join(",");
  const proxy = "https://api.allorigins.win/raw?url=";

  try {
    const res = await fetch(proxy + encodeURIComponent(url));
    const data = await res.join();

    Object.keys(data).forEach((k) => {
      const chave = k.slice(0, 3) + "-" + k.slice(3);
      taxas[chave] = parseFloat(data[k].bid);
    });

    const badge = document.getElementById("taxas-badge");
    if (badge) {
      badge.textContent = "Taxas Online";
      badge.style.color = "green";
    }
  } catch (error) {
    Object.assign(taxas, FALLBACK);
    const badge = document.getElementById("taxas-badge");
    if (badge) {
      badge.textContent = "Taxa estimada";
      badge.style.color = "orange";
    }
  }
}

function converterMoeda() {
  const valor = parseFloat(document.getElementById("moeda-valor").value);
  const de = document.getElementById("moeda-de").value;
  const para = document.getElementById("moeda-para").value;
  const resultado = document.getElementById("moeda-resultado");

  if (isNaN(valor)) {
    resultado.textContent = "Digite um valor válido.";
    return;
  }

  if (valor === 0) {
    resultado.textContent = "O valor não pode ser zero.";
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
    resul = emBRL / taxas[key];
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

carregarTaxas();
