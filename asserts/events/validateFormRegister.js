import { calculateAge } from './calculateAge.js';

export function validateForm() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const birthDateInput = document.getElementById("birth-date");
    const registerButton = document.getElementById("register-button");
    let isValid = true;

    const validate = () => {
        const emailValid = emailInput.validity.valid;
        const passwordValid = passwordInput.value.trim().length >= 6;
        const confirmPasswordValid = confirmPasswordInput.value.trim() === passwordInput.value.trim();
        const firstNameValid = firstNameInput.value.trim().length >= 2;
        const lastNameValid = lastNameInput.value.trim().length >= 2;
        const birthDateValid = birthDateInput.value.trim() !== "";
        const age = calculateAge(birthDateInput);
        const ageValid = age >= 18 && age <= 120;

        isValid = emailValid && passwordValid && confirmPasswordValid && firstNameValid && lastNameValid && birthDateValid && ageValid;

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

    firstNameInput.addEventListener("keyup", validate);
    lastNameInput.addEventListener("keyup", validate);
    emailInput.addEventListener("keyup", validate);
    passwordInput.addEventListener("keyup", validate);
    confirmPasswordInput.addEventListener("keyup", validate);
    birthDateInput.addEventListener("keyup", validate);

    firstNameInput.addEventListener("blur", validate);
    lastNameInput.addEventListener("blur", validate);
    emailInput.addEventListener("blur", validate);
    passwordInput.addEventListener("blur", validate);
    confirmPasswordInput.addEventListener("blur", validate);
    birthDateInput.addEventListener("blur", validate);

    firstNameInput.addEventListener("change", validate);
    lastNameInput.addEventListener("change", validate);
    emailInput.addEventListener("change", validate);
    passwordInput.addEventListener("change", validate);
    confirmPasswordInput.addEventListener("change", validate);
    birthDateInput.addEventListener("change", validate);

    validate();
    return isValid;
}