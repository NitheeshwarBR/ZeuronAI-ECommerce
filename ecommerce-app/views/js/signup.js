document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await window.api.signup(username, password);
    if (result.error) {
        document.getElementById('message').textContent = `Error: ${result.error}`;
    } else {
        document.getElementById('message').textContent = 'Signup successful! You can now login.';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
});