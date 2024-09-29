document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (!file) return alert("Please select a PDF file!");

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/.netlify/functions/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    if (response.ok) {
        alert("File uploaded successfully!");
        // Optionally, reload the list of available resources
        loadResources();
    } else {
        alert(result.error);
    }
});

// Function to load available PDF files from the server
async function loadResources() {
    const response = await fetch('/uploads');
    const files = await response.json();
    const resourceContainer = document.getElementById('resources');
    resourceContainer.innerHTML = files.map(file => `<a href="/uploads/${file}">${file}</a>`).join('<br>');
}

// Call loadResources when the page loads
window.onload = loadResources;
