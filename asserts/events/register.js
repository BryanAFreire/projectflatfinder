import { setUserStorage } from './modules/setUserStorage.js';
import {validateFormRegister} from "./modules/validateFormRegister.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const birthDateInput = document.getElementById("birth-date");
    const registerButton = document.getElementById("register-button");

    if (firstNameInput) {
        firstNameInput.addEventListener("input", validateFormRegister);
    }

    if (lastNameInput) {
        lastNameInput.addEventListener("input", validateFormRegister);
    }

    if (emailInput) {
        emailInput.addEventListener("input", validateFormRegister);
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", validateFormRegister);
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener("input", validateFormRegister);
    }

    if (birthDateInput) {
        birthDateInput.addEventListener("input", validateFormRegister);
    }

    if (registerButton) {
        registerButton.addEventListener("input", validateFormRegister);
    }

    const btnRegister = document.querySelector('#register-button');
    btnRegister.addEventListener('click', setUserStorage);
});
