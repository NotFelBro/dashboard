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
    resultadoEl.textContent = "Digite um valor exemplificado acima.";
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

const FAIXAS_IMC = {
  H: { abaixo: 18.5, normalMax: 24.9, sobreMax: 25.0 },
  M: { abaixo: 18.5, normalMax: 23.9, sobreMax: 28.9 },
};

const EXEMPLOS_IMC = {
  H: { peso: "Ex: 53", altura: "Ex: 1.70" },
  M: { peso: "Ex: 47", altura: "Ex: 1.60" },
};

function atualizarFaixas() {
  const genero = document.getElementById("imc-genero")?.value || "H";
  const f = FAIXAS_IMC[genero];
  const ex = EXEMPLOS_IMC[genero];

  document.getElementById("imc-peso").value = "";
  document.getElementById("imc-altura").value = "";
  document.getElementById("imc-resultado").textContent = "—";

  ["faixa-abaixo", "faixa-normal", "faixa-sobre", "faixa-obeso"].forEach((id) =>
    document.getElementById(id).classList.remove("ativa"),
  );

  document.getElementById("imc-peso").placeholder = ex.peso;
  document.getElementById("imc-altura").placeholder = ex.altura;

  document.getElementById("val-abaixo").textContent = "< " + f.abaixo;
  document.getElementById("val-normal").textContent =
    f.abaixo + " - " + f.normalMax;
  document.getElementById("val-sobre").textContent =
    f.normalMax + " - " + f.sobreMax;
  document.getElementById("val-obeso").textContent = "> " + f.sobreMax;
}

function calcularIMC() {
  const pesoInput = document.getElementById("imc-peso");
  const alturaInput = document.getElementById("imc-altura");
  const genero = document.getElementById("imc-genero")?.value || "H";
  const resultadoEl = document.getElementById("imc-resultado");

  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value);

  const pesoVazio = pesoInput.value.trim() === "";
  const alturaVazia = alturaInput.value.trim() === "";
  const pesoInvalido = !pesoVazio && (isNaN(peso) || peso <= 0);
  const alturaInvalida = !alturaVazia && (isNaN(altura) || altura <= 0);

  if ((pesoVazio || pesoInvalido) && (alturaVazia || alturaInvalida)) {
    resultadoEl.textContent = "Preencha o peso e a altura corretamente.";
    return;
  }
  if (pesoVazio || pesoInvalido) {
    resultadoEl.textContent = "Preencha o peso corretamente.";
    return;
  }
  if (alturaVazia || alturaInvalida) {
    resultadoEl.textContent = "Preencha a altura corretamente.";
    return;
  }

  const imc = peso / (altura * altura);
  const f = FAIXAS_IMC[genero];

  let classificacao;
  let faixaAtiva;
  if (imc < f.abaixo) {
    classificacao = "Abaixo do peso";
    faixaAtiva = "faixa-abaixo";
  } else if (imc < f.normalMax) {
    classificacao = "Peso normal";
    faixaAtiva = "faixa-normal";
  } else if (imc < f.sobreMax) {
    classificacao = "Sobrepeso";
    faixaAtiva = "faixa-sobre";
  } else {
    classificacao = "Obesidade";
    faixaAtiva = "faixa-obeso";
  }

  resultadoEl.textContent = imc.toFixed(2) + " — " + classificacao;

  ["faixa-abaixo", "faixa-normal", "faixa-sobre", "faixa-obeso"].forEach((id) =>
    document.getElementById(id).classList.remove("ativa"),
  );
  document.getElementById(faixaAtiva).classList.add("ativa");
}

document.addEventListener("DOMContentLoaded", atualizarFaixas);

// ferramenta três

function converterTemperatura() {
  const valor = parseFloat(document.getElementById("temp-valor").value);
  const de = document.getElementById("temp-de").value;
  const para = document.getElementById("temp-para").value;
  const resultadoEl = document.getElementById("temp-resultado");

  if (isNaN(valor)) {
    resultadoEl.textContent = "Digite um valor exemplificado acima.";
    return;
  }

  if (de === para) {
    resultadoEl.textContent = valor.toFixed(2) + " " + unidadeTemp(para);
    return;
  }

  let celsius;
  if (de === "C") celsius = valor;
  else if (de === "F") celsius = ((valor - 32) * 5) / 9;
  else celsius = valor - 273.15;

  let resultado;
  if (para === "C") resultado = celsius;
  else if (para === "F") resultado = (celsius * 9) / 5 + 32;
  else resultado = celsius + 273.15;

  resultadoEl.textContent =
    valor.toFixed(2) +
    " " +
    unidadeTemp(de) +
    " = " +
    resultado.toFixed(2) +
    " " +
    unidadeTemp(para);
}

function unidadeTemp(sigla) {
  if (sigla === "C") return "°C";
  if (sigla === "F") return "°F";
  return "K";
}

// ferramenta quatro

function converterVelocidade() {
  const input = document.getElementById("vel-valor");
  const de = document.getElementById("vel-de").value;
  const para = document.getElementById("vel-para").value;
  const resultadoEl = document.getElementById("vel-resultado");

  if (input.value.trim() === "") {
    resultadoEl.textContent =
      "Preencha o valor exemplificado acima para converter.";
    return;
  }

  const valor = parseFloat(input.value);

  if (isNaN(valor) || valor < 0) {
    resultadoEl.textContent = "Digite um valor de 0 acima.";
    return;
  }

  if (de === para) {
    resultadoEl.textContent = valor + " " + unidadeVel(de);
    return;
  }

  let resultado;
  if (de === "kmh" && para === "mph") resultado = valor * 0.621271;
  else resultado = valor / 0.621271;

  resultadoEl.textContent =
    valor +
    " " +
    unidadeVel(de) +
    " = " +
    resultado.toFixed(2) +
    " " +
    unidadeVel(para);
}

function unidadeVel(sigla) {
  return sigla === "kmh" ? "km/h" : "mhp";
}

// ferramenta cinco

function converterMassa() {
  const input = document.getElementById("massa-valor");
  const de = document.getElementById("massa-de").value;
  const para = document.getElementById("massa-para").value;
  const resultadoEl = document.getElementById("massa-resultado");

  if (input.value.trim() === "") {
    resultadoEl.textContent =
      "Preencha o valor exemplificado acima para converter.";
    return;
  }

  const valor = parseFloat(input.value);

  if (isNaN(valor) || valor < 0) {
    resultadoEl.textContent = "Digite um valor acima de 0.";
    return;
  }

  if (de === para) {
    resultadoEl.textContent = valor + " " + unidadeMassa(de);
    return;
  }

  let resultado;
  if (de === "kg" && para === "lb") resultado = valor * 2.20462;
  else resultado = valor / 2.20462;

  resultadoEl.textContent =
    valor +
    " " +
    unidadeMassa(de) +
    " = " +
    resultado.toFixed(2) +
    " " +
    unidadeMassa(para);
}

function unidadeMassa(sigla) {
  return sigla === "kg" ? "kg" : "lb";
}

// ferramenta seis
function calcularRegra3() {
  const inputA = document.getElementById("r3-a");
  const inputB = document.getElementById("r3-b");
  const inputC = document.getElementById("r3-c");
  const inputX = document.getElementById("r3-x");
  const resultadoEl = document.getElementById("r3-resultado");

  const vazio = (el) => el.value.trim() === "";
  const invalido = (el) =>
    isNaN(parseFloat(el.value)) || parseFloat(el.value) < 0;

  if (vazio(inputA) || vazio(inputB) || vazio(inputC)) {
    inputX.value = "";
    resultadoEl.textContent = "Preencha os campos A, B e C.";
    return;
  }

  if (invalido(inputA) || invalido(inputB) || invalido(inputC)) {
    inputX.value = "";
    resultadoEl.textContent = "Digite valores exemplificados acima.";
  }

  const a = parseFloat(inputA.value);
  const b = parseFloat(inputB.value);
  const c = parseFloat(inputC.value);

  if (a === 0) {
    inputX.value = "";
    resultadoEl.textContent = "A não pode ser 0, divisão por zero impossível.";
    return;
  }

  const x = (b * c) / a;
  inputX.value = x.toFixed(2);
  resultadoEl.textContent = `${a} : ${b} = ${c} : ${x.toFixed(2)}`;
}

// tema dark/light

function alternarTema() {
  const html = document.documentElement;
  const btn = document.getElementById("tema-btn");
  const isDark = html.classList.toggle("dark");
  btn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("tema", isDark ? "dark" : "light");
}

(function () {
  const salvo = localStorage.getItem("tema");
  const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (salvo === "dark" || (!salvo && prefereDark)) {
    document.documentElement.classList.add("dark");
    document.addEventListener("DOMContentLoaded", () => {
      const btn = document.getElementById("tema-btn");
      if (btn) btn.textContent = "☀️";
    });
  }
})();
