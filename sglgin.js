document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    if (localStorage.getItem(username)) {
        document.getElementById('message').textContent = 'User already exists';
    } else {
        localStorage.setItem(username, password);
        document.getElementById('message').textContent = 'Registration successful';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (localStorage.getItem(username) === password) {
        document.getElementById('message').textContent = 'Login successful';
        window.location.href = 'home.html';
    } else {
        document.getElementById('message').textContent = 'Invalid username or password';
    }
});
