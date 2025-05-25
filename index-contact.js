document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent instant navigation
        const href = this.href;

        document.body.classList.add("fade-out"); // Start fade effect

        setTimeout(() => {
            window.location.href = href; // Navigate after effect
        }, 500); // Match transition time
    });
});

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent instant navigation
        const href = this.href;

        document.body.classList.add("fade-out"); // Start fade effect

        setTimeout(() => {
            window.location.href = href; // Navigate after effect
        }, 500); // Match transition time
    });
});

document.getElementById("mySubmit").addEventListener("click", () => {
  const email = document.getElementById("myEmail").value;
  const message = document.getElementById("myComment").value;

  // Save to Local Storage
  const submission = { email, message, timestamp: new Date().toISOString() };
  const savedData = JSON.parse(localStorage.getItem("formSubmissions") || []);
  savedData.push(submission);
  localStorage.setItem("formSubmissions", JSON.stringify(savedData));

  // Display submissions on the page
  displaySubmissions();
  alert("Saved locally!");
});

function displaySubmissions() {
  const savedData = JSON.parse(localStorage.getItem("formSubmissions") || []);
  const submissionsDiv = document.getElementById("submissions");
  submissionsDiv.innerHTML = savedData.map(item => `
    <div class="submission">
      <p><strong>Email:</strong> ${item.email}</p>
      <p><strong>Message:</strong> ${item.message}</p>
      <small>${new Date(item.timestamp).toLocaleString()}</small>
      <hr>
    </div>
  `).join("");
}

// Load saved data on page load
displaySubmissions();
