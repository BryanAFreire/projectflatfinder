import { calculateAge } from './calculateAge.js';
import { createErrorMessage } from "./createMessageError.js";
import { deleteErrorMessage } from "./deleteMessageError.js";
import {validatePassword} from "./validatePasswordFormat.js";

export function validateFormRegister() {
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const birthDateInput = document.getElementById("birth-date");
    const registerButton = document.getElementById("register-button");
    let isValid = true;

        const firstNameValid = firstNameInput.value.trim().length > 1;
        const lastNameValid = lastNameInput.value.trim().length > 1;
        const emailValid = emailInput.validity.valid && emailInput.value.trim() !== "";
        const passwordValid = validatePassword(passwordInput.value.trim());
        const confirmPasswordValid = confirmPasswordInput.value.trim() === passwordInput.value.trim();
        const confirmPasswordEmpty = confirmPasswordInput.value.trim() === "";
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
            createErrorMessage(passwordInput, "Password must be at least 6 characters, contain letters, numbers, and a special character.");
        } else {
            deleteErrorMessage(passwordInput);
        }

        if (!confirmPasswordValid) {
            createErrorMessage(confirmPasswordInput, "Passwords do not match.");
        } else if (confirmPasswordEmpty) {
            createErrorMessage(confirmPasswordInput, "Confirm password cannot be empty.");
        }
        else {
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
}