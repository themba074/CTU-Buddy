document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const question = document.getElementById('question').value;

    const response = await fetch('/.netlify/functions/postQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, question })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Question posted successfully!");
        loadQuestions();  // Reload questions
    } else {
        alert(result.error);
    }
});

// Function to load all questions and responses
async function loadQuestions() {
    const response = await fetch('/.netlify/functions/getQuestions');
    const questions = await response.json();
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = questions.map(q => `<strong>${q.name}:</strong> ${q.question}`).join('<br>');
}

// Call loadQuestions when the page loads
window.onload = loadQuestions;
