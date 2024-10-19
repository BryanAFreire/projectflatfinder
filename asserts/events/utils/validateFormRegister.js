import { calculateAge } from './calculateAge.js';
import { createErrorMessage } from "./createMessageError.js";
import { deleteErrorMessage } from "./deleteMessageError.js";

export function validateFormRegister() {
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const birthDateInput = document.getElementById("birth-date");
    const registerButton = document.getElementById("register-button");
    let isValid = true;

    const validateRegister = () => {
        const firstNameValid = firstNameInput.value.trim().length >= 2;
        const lastNameValid = lastNameInput.value.trim().length >= 2;
        const emailValid = emailInput.validity.valid && emailInput.value.trim() !== "";
        const passwordValid = passwordInput.value.trim().length >= 6;
        const confirmPasswordValid = confirmPasswordInput.value.trim() === passwordInput.value.trim();
        const birthDateValid = birthDateInput.value.trim() !== "";
        const age = calculateAge(birthDateInput);
        const ageValid = age >= 18 && age <= 120;

        isValid = firstNameValid && lastNameValid && emailValid && passwordValid && confirmPasswordValid  && birthDateValid && ageValid;

        if (!firstNameValid) {
            createErrorMessage(firstNameInput, "First name must be at least 2 characters.");
        } else {
            deleteErrorMessage(firstNameInput);
        }

        if (!lastNameValid) {
            createErrorMessage(lastNameInput, "Last name must be at least 2 characters.");
        } else {
            deleteErrorMessage(lastNameInput);
        }

        if (!emailValid) {
            createErrorMessage(emailInput, "Please enter a valid email.");
        } else {
            deleteErrorMessage(emailInput);
        }

        if (!passwordValid) {
            createErrorMessage(passwordInput, "Password must be at least 6 characters.");
        } else {
            deleteErrorMessage(passwordInput);
        }

        if (!confirmPasswordValid) {
            createErrorMessage(confirmPasswordInput, "Passwords do not match.");
        } else {
            deleteErrorMessage(confirmPasswordInput);
        }

        if (!birthDateValid) {
            createErrorMessage(birthDateInput, "Please enter your birth date.");
        } else if (!ageValid) {
            createErrorMessage(birthDateInput, "Age must be between 18 and 120 years.");
        } else {
            deleteErrorMessage(birthDateInput);
        }

        registerButton.disabled = !isValid;
    };

    firstNameInput.addEventListener("keyup", validateRegister);
    lastNameInput.addEventListener("keyup", validateRegister);
    emailInput.addEventListener("keyup", validateRegister);
    passwordInput.addEventListener("keyup", validateRegister);
    confirmPasswordInput.addEventListener("keyup", validateRegister);
    birthDateInput.addEventListener("keyup", validateRegister);

    firstNameInput.addEventListener("blur", validateRegister);
    lastNameInput.addEventListener("blur", validateRegister);
    emailInput.addEventListener("blur", validateRegister);
    passwordInput.addEventListener("blur", validateRegister);
    confirmPasswordInput.addEventListener("blur", validateRegister);
    birthDateInput.addEventListener("blur", validateRegister);

    firstNameInput.addEventListener("change", validateRegister);
    lastNameInput.addEventListener("change", validateRegister);
    emailInput.addEventListener("change", validateRegister);
    passwordInput.addEventListener("change", validateRegister);
    confirmPasswordInput.addEventListener("change", validateRegister);
    birthDateInput.addEventListener("change", validateRegister);

    validateRegister();
    return isValid;
}