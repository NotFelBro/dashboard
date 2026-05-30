async function conversorMoedas(params) {
  const url = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL",
  );

  conversor = await url.json();
  conversorMoedas();
}
