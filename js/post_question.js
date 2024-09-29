document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const question = document.getElementById('question').value;

    const response = await fetch('/.netlify/functions/postQuestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, question })
    });

    const result = await response.json();
    alert(result.message);
});
