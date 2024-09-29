document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Thank you for subscribing!");
    } else {
        alert(result.error);
    }
});
