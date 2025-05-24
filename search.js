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

const dfMessenger = document.querySelector('df-messenger');
dfMessenger.addEventListener('df-messenger-loaded', function() {
    // Position the widget icon (bauble)
    const dfIcon = dfMessenger?.shadowRoot?.querySelector("#widgetIcon");
    if (dfIcon) {
        dfIcon.style.bottom = "50px";
        dfIcon.style.right = "0px"; 
    }

    
    setTimeout(() => {
        const dfMessengerChat = dfMessenger?.shadowRoot?.querySelector("df-messenger-chat");
        if (dfMessengerChat) {
            const chatWrapper = dfMessengerChat.shadowRoot.querySelector(".chat-wrapper");
            if (chatWrapper) {
                chatWrapper.style.bottom = "calc(5px + 60px)"; // 60px is roughly the height of the icon
                chatWrapper.style.right = "80px"; // Match the icon's right position
            }
            dfMessengerChat.openChat();
        }
    }, 500);
});
