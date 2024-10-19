import {displayNoneMenuPerfil} from "./utils/displayNoneMenuPerfil.js";
import {listProfile} from "./utils/profileMenu.js";
import {userGreeting} from "./utils/userGreeting.js";
import {changeMenuBurger} from "./utils/burgerMenu.js";
import {updateUser} from "./utils/updateUser.js";
import {checkTokenExpiration} from "./utils/checkingExpirationToken.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    userGreeting();

    document.addEventListener('click', displayNoneMenuPerfil);

    const profileIco = document.querySelector('.content-profile');
    if (profileIco) {
        profileIco.addEventListener('click', listProfile)
    }

    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', changeMenuBurger);
    }

    const token = localStorage.getItem('token');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const birthDate = document.querySelector('#birth_date');

    // Redirect to 404 page if no token is found
    if (!token) {
        window.location.href = './404.html';
        return;
    }

    const decodeJWT = (token) => {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT');
        }
        return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    };

    // Check token expiration every second
    setInterval(() => checkTokenExpiration(token), 1000);

    try {
        const decoded = decodeJWT(token);
        console.log('Payload:', decoded);
        const emailUpdate = decoded.username?.email;
        const passwordUpdate = decoded.username?.password;
        const firstNameUpdate = decoded.username?.firstName;
        const lastNameUpdate = decoded.username?.lastName;
        const birthUpdate = decoded.username?.birthDate;
        email.value = emailUpdate || '';
        password.value = passwordUpdate || '';
        firstName.value = firstNameUpdate || '';
        lastName.value = lastNameUpdate || '';
        birthDate.value = birthUpdate || '';
    } catch (error) {
        console.error('Error decoding the token:', error);
        window.location.href = './404.html';
        return;
    }

    const btnSave = document.querySelector('#btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', updateUser);
    }
});