import { startSession } from "./modules/startSession.js";
import { validateFormLogin } from "./modules/validateFormLogin.js";

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (emailInput) {
        emailInput.addEventListener("input", validateFormLogin);
        emailInput.addEventListener("blur", validateFormLogin);
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", validateFormLogin);
        passwordInput.addEventListener("blur", validateFormLogin);
    }

    const loginButton = document.getElementById("login-button");
    if (loginButton) {
        loginButton.addEventListener('click', startSession);
    }

    const openRegister = () =>{
        window.location.href = "./register.html";
    }
    const registerButton = document.getElementById("register-button");
    if (registerButton) {
        registerButton.addEventListener('click', openRegister);
    }
});
