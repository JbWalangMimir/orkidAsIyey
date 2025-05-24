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

const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
    const file = inputFile.files[0];
    if (!file) return;
    
    const imgLink = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = function() {
        // Add class to indicate we have an image
        imageView.classList.add('has-image');
        
        // Set the image as background
        imageView.style.backgroundImage = `url(${imgLink})`;
        
        // Hide the placeholder elements
        const placeholderElements = imageView.querySelectorAll('.camera-img, .image-text, span');
        placeholderElements.forEach(el => el.style.display = 'none');
        
        // Adjust container dimensions to match image
        const maxWidth = 600; // Maximum width you want
        const maxHeight = 500; // Maximum height you want
        
        // Calculate dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
        }
        
        if (height > maxHeight) {
            const ratio = maxHeight / height;
            height = maxHeight;
            width = width * ratio;
        }
        
        // Apply the calculated dimensions
        imageView.style.width = `${width}px`;
        imageView.style.height = `${height}px`;
        
        // The drop area and parent containers will now shrink to fit
    };
    
    img.src = imgLink;
    
}
