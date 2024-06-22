document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await window.api.login(username, password);
    if (result.error) {
        document.getElementById('message').textContent = `Error: ${result.error}`;
    } else {
        document.getElementById('message').textContent = 'Login successful!';
        // Store the token and redirect to another page if needed
        localStorage.setItem('token', result.token);
        setTimeout(() => {
            window.location.href = 'home.html'; // Change to the page you want to navigate after login
        }, 2000);
    }
});