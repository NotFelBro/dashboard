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

const taxas = {
  "USD-BRL": 5.85,
  "EUR-BRL": 6.35,
};

async function carregarTaxas() {
  const badge = document.getElementById("taxas-badge");

  try {
    const url = "https://economia.awesomeapi.com.br/last/USD-BRL, EUR-BRL";
    const proxy = "https:api.allorigins.win/raw?url=";
    const res = await fetch(proxy + encodeURIComponent(url));

    if (!res.ok) throw new Error("Resposta inválida");

    const raw = await res.json();
    const data =
      typeof raw.contents === "string" ? JSON.parse(raw.contents) : raw;

    taxas["USD-BRL"] = parseFloat(data["USDBRL"].bid);
    taxas["EUR-BRL"] = parseFloat(data["EURBRL"].bid);

    if (badge) {
      badge.textContent = "Online";
      badge.style.color = "green";
    }
  } catch (error) {
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

  if (isNaN(valor) || valor === 0) {
    resultado.textContent =
      valor === 0 ? "O valor não pode ser zero." : "Digite um valor válido";
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

document.getElementById("moeda-valor").addEventListener("keydown", (e) => {
  if (e.key === "Enter") converterMoeda();
});

carregarTaxas();
