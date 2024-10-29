import { createErrorMessage } from "./createMessageError.js";
import { deleteErrorMessage } from "./deleteMessageError.js";

export function validateFormLogin(){
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-button");
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