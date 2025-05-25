document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); 
        const href = this.href;

        document.body.classList.add("fade-out"); 

        setTimeout(() => {
            window.location.href = href; 
        }, 500); 
    });
});

const uploadInput = document.getElementById("orchid-upload");
const dropbox = document.getElementById("dropbox");
const preview = document.getElementById("preview");
const resultsBox = document.getElementById("prediction-results");

dropbox.addEventListener("click", () => uploadInput.click());

uploadInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
  const file = uploadInput.files[0];
  if (!file || !file.type.startsWith("image/")) {
    alert("Please upload a valid image.");
    return;
  }

  
  const reader = new FileReader();
  reader.onload = () => {
    preview.innerHTML = <img src="${reader.result}" style="max-width: 100%; border-radius: 10px;" />;
  };
  reader.readAsDataURL(file);

  
  const formData = new FormData();
  formData.append("file", file);

  fetch("https://efficientnet-api.onrender.com/predict", {
    method: "POST",
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }
      return response.json();
    })
    .then((data) => {
      showPredictions(data.predictions);
    })
    .catch((err) => {
      console.error("Prediction error:", err);
      resultsBox.innerHTML = "<p style='color:red;'>Failed to get prediction. Try again.</p>";
    });
}

function showPredictions(predictions) {
  if (!predictions || predictions.length === 0) {
    resultsBox.innerHTML = "<p>No predictions found.</p>";
  } else {
    resultsBox.innerHTML = "<h3>Top 5 Predictions:</h3>";
    predictions.forEach((pred, index) => {
      const line = document.createElement("p");
      line.textContent = ${index + 1}. ${pred.class} — ${(pred.probability * 100).toFixed(2)}%;
      resultsBox.appendChild(line);
    });
  }

  resultsBox.style.display = "block"; 
  resultsBox.scrollIntoView({ behavior: "smooth", block: "start" });
}


document.addEventListener("paste", (event) => {
  const items = (event.clipboardData || window.clipboardData).items;
  for (let item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (file) {
        uploadInput.files = createFileList(file);
        handleFileUpload();
      }
      event.preventDefault();
      break;
    }
  }
});


function createFileList(file) {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
} and here
<div class="search-container">
            <div class="search">
                <div class="search-box"><input type="text" id="searchInput" autocomplete="off" placeholder="Search a species or taxonomy data..." oninput="searchPages()" onkeydown="searchPages(event)"/></div>
            
        
                <ul id="results"></ul>    
            </div>
        </div>


