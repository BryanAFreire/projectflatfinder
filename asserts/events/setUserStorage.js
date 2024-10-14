import { validateForm } from './validateFormRegister.js';

let users = JSON.parse(localStorage.getItem('users')) || [];

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const birthDate = document.querySelector('#birth-date');
const container = document.querySelector('.container');
const containerSpinner = document.querySelector('.spinner');

function User(email, password, firstName, lastName, birthDate) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
}

export function setUserStorage(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }

    const user = new User(
        email.value.toLowerCase(),
        password.value,
        firstName.value.toUpperCase(),
        lastName.value.toUpperCase(),
        birthDate.value
    );

    // Check if email already exists in localStorage
    const emailExists = users.some(u => u.email === user.email);
    if (emailExists) {
        createErrorMessage(email, "Email already exists.");
        return;
    }

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    displaySpinner();

    setTimeout(() => {
        containerSpinner.style.display = 'none';
        container.style.display = 'flex';
        startSession(event);
    }, 3000);

}