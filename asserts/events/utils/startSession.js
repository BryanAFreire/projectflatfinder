import {createErrorMessage} from "./createMessageError.js";
import {generateJWT} from "./generateJWT.js";

const startSession = (event) => {
    event.preventDefault();
    const userEmail = document.querySelector('#email').value.toLowerCase();
    const password = document.querySelector('#password').value;

    // Recover users from localstorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Finds if user exist
    const user = users.find(user => user.email === userEmail);

    if (user) {
        if (user.password === password) {
            const token = generateJWT(user);
            localStorage.setItem('token', token);
            window.location.href = './home.html';
        } else {
            createErrorMessage(document.querySelector('#password'), "Credentials are wrong. Please verify and try again.");
        }
    } else {
        createErrorMessage(document.querySelector('#email'), "User not registered. Please sign up.");
    }
};

export {startSession};