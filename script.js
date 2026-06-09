const lista = document.getElementById("evento-pai");
const sections = document.querySelectorAll("section");

lista.addEventListener("click", (e) => {
  const id = e.target.id;
  if (!id) return;

  sections.forEach((section) => {
    section.classList.remove("ativa");
    if (section.classList.contains("secao-" + id)) {
      section.classList.add("ativa");
    }
  });
});

// ferramenta um

const taxas = {};

async function carregarTaxas() {
  try {
    const res = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL",
    );
    const data = await res.json();
    Object.keys(data).forEach((k) => {
      taxas[k] = parseFloat(data[k].bid);
    });
    const badge = document.getElementById("taxas-badge");
    if (badge) {
      badge.textContent = "Online";
      badge.style.background = "#d4edda";
      badge.style.color = "#155724";
    }
  } catch (e) {
    const badge = document.getElementById("taxas-badge");
    if (badge) badge.textContent = "Offline";
  }
}

function converterMoeda() {
  const valor = parseFloat(document.getElementById("moeda-valor").value);
  const de = document.getElementById("moeda-de").value;
  const para = document.getElementById("moeda-para").value;
  const resultadoEl = document.getElementById("moeda-resultado");

  if (isNaN(valor)) {
    resultadoEl.textContent = "Digite um valor válido";
    return;
  }
  if (de === para) {
    resultadoEl.textContent = valor.toFixed(2) + " " + para;
    return;
  }
  let emBRL;
  if (de === "BRL") {
    emBRL = valor;
  } else {
    const key = de + "BRL";
    if (!taxas[key]) {
      resultadoEl.textContent = "Taxa indisponivel.";
      return;
    }
    emBRL = valor * taxas[key];
  }

  let resultado;
  if (para === "BRL") {
    resultado = emBRL;
  } else {
    const key = para + "BRL";
    if (!taxas[key]) {
      resultadoEl.textContent = "Taxa indisponivel.";
      return;
    }
    resultado = emBRL / taxas[key];
  }
  resultadoEl.textContent =
    valor +
    " " +
    de +
    " = " +
    resultado.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) +
    " " +
    para;
}

carregarTaxas();

// ferramenta dois

function calcularIMC() {
  const peso = parseFloat(document.getElementById("imc-peso").value);
  const altura = parseFloat(document.getElementById("imc-altura").value);
  const resultadoEl = document.getElementById("imc-resultado");

  if (!peso || !altura || altura <= 0) {
    resultadoEl.textContent = "Preencha peso e altura acima de zero.";
    return;
  }

  const imc = peso / (altura * altura);
  let classificacao;
  if (imc < 18.5) classificacao = "Abaixo do peso";
  else if (imc < 25) classificacao = "Peso normal";
  else if (imc < 30) classificacao = "Sobrepeso";
  else "Obesidade";

  resultadoEl.textContent = "IMC: " + imc.toFixed(1) + " — " + classificacao;
}

// ferramenta três
