const url = document.getElementById("url");
fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

const elements = {
  aside: document.querySelectorAll("aside"),
  section: document.querySelectorAll("section"),
};

elements.aside.forEach((aside) => {
  aside.addEventListener("click", (event) => {
    event.preventDefault();
    const id = event.target.id;
    if (id) {
      displayController(id);
    }
  });
});

function displayController(id) {
  const targetClass = "secao-" + id;

  elements.section.forEach((section) => {
    section.classList.add("hidden");

    if (section.classList.contains(targetClass)) {
      section.classList.remove("hidden");
    }
  });
}
