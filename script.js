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
    console.log(event.target.id);
    displayController(event.target.id);
  });
});

function displayController(id) {
  elements.section.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      section.classList.add("hidden");
    }

    if (section.classList.contains(id)) {
      section.classList.remove("hidden");
    }
  });
}
