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

const uploadInput = document.getElementById("orchid-upload");
const dropbox = document.getElementById("dropbox");
const preview = document.getElementById("preview");
const resultsBox = document.getElementById("prediction-results");

dropbox.addEventListener("mousedown", (e) => {
  e.preventDefault(); // prevent accidental focus stealing
  uploadInput.value = '';
  uploadInput.click();
});


// File selected — handle upload
uploadInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
  const file = uploadInput.files[0];
  if (!file || !file.type.startsWith("image/")) {
    alert("Please upload a valid image.");
    return;
  }

  // Preview
  const reader = new FileReader();
  reader.onload = () => {
    preview.innerHTML = `<img src="${reader.result}" style="max-width: 100%; border-radius: 10px;" />`;
  };
  reader.readAsDataURL(file);

  // Send to API
  const formData = new FormData();
  formData.append("file", file);

  fetch("https://efficientnet-api.onrender.com/predict", {
    method: "POST",
    body: formData
  })
    .then((res) => res.json())
    .then((data) => showPredictions(data.predictions))
    .catch(() => {
      resultsBox.innerHTML = "<p style='color:red;'>Failed to get prediction.</p>";
    });
}

function showPredictions(predictions) {
  if (!predictions || predictions.length === 0) {
    resultsBox.innerHTML = "<p>No predictions found.</p>";
    return;
  }

  resultsBox.innerHTML = "<h3>Top 5 Predictions:</h3>";
  predictions.forEach((pred, index) => {
    const line = document.createElement("p");
    line.textContent = `${index + 1}. ${pred.class} — ${(pred.probability * 100).toFixed(2)}%`;
    resultsBox.appendChild(line);
  });
}


