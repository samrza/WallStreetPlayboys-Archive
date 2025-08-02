document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("articles_tagged.json");
    const articles = await response.json();

    const container = document.getElementById("articles");
    const filterBox = document.getElementById("tag-filters");

    // 🏷️ Get all unique tags
    const allTags = Array.from(
      new Set(articles.flatMap((article) => article.tags || []))
    ).sort();

    // 🧩 Create filter buttons
    allTags.forEach((tag) => {
      const button = document.createElement("button");
      button.textContent = tag;
      button.className =
        "px-3 py-1 border border-gray-500 rounded hover:bg-black hover:text-white";
      button.addEventListener("click", () => {
        renderArticles(tag);
      });
      filterBox.appendChild(button);
    });

    // 📄 Render articles with optional tag filter
    function renderArticles(filterTag = null) {
      container.innerHTML = "";

      const grouped = {};

      articles
        .filter(
          (article) =>
            !filterTag || (article.tags && article.tags.includes(filterTag))
        )
        .forEach((article) => {
          const year = article.date.split("-")[0];
          if (!grouped[year]) grouped[year] = [];
          grouped[year].push(article);
        });

      for (const year in grouped) {
        const section = document.createElement("section");
        section.className = "py-6";

        const heading = document.createElement("h2");
        heading.className = "text-2xl font-bold mb-4 border-b border-[#999]";
        heading.textContent = year;

        const list = document.createElement("ul");
        list.className = "space-y-2";

        grouped[year].forEach((article) => {
          const li = document.createElement("li");
          li.innerHTML = `
              <a href="articles/${article.file}" class="block hover:underline">
                <span class="text-lg font-semibold">${article.title}</span>
                <span class="block text-sm text-[#555]">${article.date}</span>
                <span class="text-xs text-gray-500 italic">${(
                  article.tags || []
                ).join(", ")}</span>
              </a>`;
          list.appendChild(li);
        });

        section.appendChild(heading);
        section.appendChild(list);
        container.appendChild(section);
      }
    }

    // 👇 Initial render (no filter)
    renderArticles();
  } catch (error) {
    console.error("Error loading articles:", error);
  }
});
