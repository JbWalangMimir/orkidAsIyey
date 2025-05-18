function searchPages(event) {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultBox = document.getElementById("results");

  if (query === "") {
    resultBox.style.display = "none";
    resultBox.innerHTML = "";
    return;
  }

  const results = pages.filter(page =>
    page.title.toLowerCase().includes(query) ||
    page.tags.some(tag => tag.toLowerCase().includes(query))
  );

  if (results.length > 0) {
    resultBox.innerHTML = results.map(p => `<li><a href="${p.url}">${p.title}</a></li>`).join("");
    resultBox.style.display = "block";
  } else {
    resultBox.innerHTML = "<li>No results found.</li>";
    resultBox.style.display = "block";
  }

  if (event && event.key === "Enter" && results.length > 0) {
    window.location.href = results[0].url;
  }
}

document.addEventListener("click", function(event) {
  const searchInput = document.getElementById("searchInput");
  const resultBox = document.getElementById("results");

  if (!searchInput.contains(event.target) && !resultBox.contains(event.target)) {
    resultBox.style.display = "none";
  }
});
