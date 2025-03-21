document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch list of files from a JSON file (you'll generate this manually once)
    const response = await fetch("articles.json");
    const articles = await response.json();

    const grouped = {};

    articles.forEach((article) => {
      const year = article.date.split("-")[0]; // Extract the year
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(article);
    });

    const container = document.getElementById("articles");

    for (const year in grouped) {
      const section = document.createElement("div");
      section.innerHTML = `<h2>${year}</h2>`;
      const list = document.createElement("ul");

      grouped[year].forEach((article) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="articles/${article.file}">${article.title} (${article.date})</a>`;
        list.appendChild(li);
      });

      section.appendChild(list);
      container.appendChild(section);
    }
  } catch (error) {
    console.error("Error loading articles:", error);
  }
});
