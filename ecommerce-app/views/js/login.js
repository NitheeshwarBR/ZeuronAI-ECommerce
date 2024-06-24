document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const result = await window.api.login(username, password);
        if (result.error) {
            document.getElementById('message').textContent = `Error: ${result.error}`;
        } else {
            document.getElementById('message').textContent = 'Login successful!';
            localStorage.setItem('token', result.token);
            setTimeout(() => {
                window.location.href = 'product-list.html';
            }, 2000);
        }
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }
});
