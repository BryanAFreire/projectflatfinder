import { displayNoneMenuPerfil } from "./utils/displayNoneMenuPerfil.js";
import { listProfile } from "./utils/profileMenu.js";
import { userGreeting } from "./utils/userGreeting.js";
import { changeMenuBurger } from "./utils/burgerMenu.js";
import { updateUser } from "./utils/updateUser.js";
import { checkTokenExpiration } from "./utils/checkingExpirationToken.js";
import { decodeJWT } from "./utils/getUserStorage.js";

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const email = document.querySelector('#email');
    const newPassword = document.querySelector('#new-password');
    const confirmPassword = document.querySelector('#confirm-password');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const birthDate = document.querySelector('#birth_date');
    
    // Redirect to 401 page if no token is found
    if (!token) {
        window.location.href = './401.html';
        console.info(!token);
        return;
    }
    
    userGreeting();
    
    document.addEventListener('click', displayNoneMenuPerfil);
    
    const profileIco = document.querySelector('.content-profile');
    if (profileIco) {
        profileIco.addEventListener('click', listProfile);
    }
    
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', changeMenuBurger);
    }
    
    // Check token expiration every second
    setInterval(() => checkTokenExpiration(token), 1000);
    
    const decoded = decodeJWT(token);
    console.log('Payload:', decoded);
    const passwordUpdate = decoded.username?.password;
    try {
        const emailUpdate = decoded.username?.email;
        const firstNameUpdate = decoded.username?.firstName;
        const lastNameUpdate = decoded.username?.lastName;
        const birthUpdate = decoded.username?.birthDate;
        email.value = emailUpdate || '';
        firstName.value = firstNameUpdate || '';
        lastName.value = lastNameUpdate || '';
        birthDate.value = birthUpdate || '';
    } catch (error) {
        console.error('Error decoding the token:', error);
        window.location.href = './401.html';
        return;
    }
    
    const btnSave = document.querySelector('#btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', (e) => updateUser(passwordUpdate, e));
    }
});
