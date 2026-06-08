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
