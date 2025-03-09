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