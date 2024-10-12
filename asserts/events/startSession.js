const startSession = () => {
    const userEmail = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Recover users from localstorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Finds if user exist
    const user = users.find(user => user.email === userEmail && user.password === password);

    if (user) {
        const token = generateJWT(user);
        localStorage.setItem('token', token);
        window.location.href = '/home.html';
    } else {
        if (document.querySelector('#btn_log_in')) {
            createErrorMessage(document.querySelector('#password'), "Credentials are wrong. Please verify and try again.");
        }
    }
};

if (document.querySelector('#btn_log_in')) {
    const btnLogIn = document.querySelector('#btn_log_in');
    btnLogIn.addEventListener('click', startSession);
}

