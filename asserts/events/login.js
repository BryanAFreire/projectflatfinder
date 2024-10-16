import {deleteErrorMessage} from "./deleteMessageError.js";
import {createErrorMessage} from "./createMessageError.js";
import {startSession} from "./startSession.js";


document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");

    const validateForm = () => {
        const emailValid = emailInput.validity.valid;
        const passwordValid = passwordInput.value.trim() !== "";

        if (!emailValid) {
            createErrorMessage(emailInput, "Please enter a valid email.");
        } else {
            deleteErrorMessage(emailInput);
        }

        if (!passwordValid) {
            createErrorMessage(passwordInput, "Please enter a password.");
        } else {
            deleteErrorMessage(passwordInput);
        }

        loginButton.disabled = !(emailValid && passwordValid);
    }

    const openRegister = () =>{
        window.location.href = "./register.html";
    }

    emailInput.addEventListener("keyup", validateForm);
    passwordInput.addEventListener("keyup", validateForm);

    emailInput.addEventListener("blur", validateForm);
    passwordInput.addEventListener("blur", validateForm);

    if (loginButton) {
        loginButton.addEventListener('click', startSession);
    }

    if (registerButton) {
        registerButton.addEventListener('click', openRegister);
    }
});
