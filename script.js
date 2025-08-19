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

    // 🎨 Tailwind color classes
    const colors = [
      "bg-red-700 hover:bg-red-800 text-white",
      "bg-blue-700 hover:bg-blue-800 text-white",
      "bg-green-700 hover:bg-green-800 text-white",
      "bg-yellow-700 hover:bg-yellow-800 text-white",
      "bg-purple-700 hover:bg-purple-800 text-white",
      "bg-pink-700 hover:bg-pink-800 text-white",
      "bg-indigo-700 hover:bg-indigo-800 text-white",
      "bg-teal-700 hover:bg-teal-800 text-white",
    ];

    // 🧩 Create filter buttons with different colors
    allTags.forEach((tag, index) => {
      const button = document.createElement("button");
      button.textContent = tag;

      // Pick color in sequence or wrap around if more tags than colors
      const colorClass = colors[index % colors.length];
      button.className = `px-3 py-1 rounded text-sm font-medium ${colorClass}`;

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
  <a href="articles/${
    article.file
  }" class="block hover:underline p-2 sm:p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
    <span class="block text-base sm:text-lg font-semibold">${
      article.title
    }</span>
    <span class="block text-xs sm:text-sm text-[#555]">${article.date}</span>
    <span class="block text-xs sm:text-sm text-gray-500 italic">${(
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

    // ❌ Removed initial render
    // renderArticles();
    // 👉 Now homepage shows only tags
  } catch (error) {
    console.error("Error loading articles:", error);
  }
});
