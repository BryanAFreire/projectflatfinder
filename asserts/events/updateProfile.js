import { displayNoneMenuPerfil } from "./modules/displayNoneMenuPerfil.js";
import { listProfile } from "./modules/profileMenu.js";
import { userGreeting } from "./modules/userGreeting.js";
import { changeMenuBurger } from "./modules/burgerMenu.js";
import { updateUser } from "./modules/updateUser.js";
import { checkTokenExpiration } from "./modules/checkingExpirationToken.js";
import { decodeJWT } from "./modules/getUserStorage.js";
import {validateSession} from "./modules/verifySession.js";
import {logOut} from "./modules/logOut.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const email = document.querySelector('#email');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const birthDate = document.querySelector('#birth_date');
    
    validateSession(token);
    
    userGreeting();
    
    document.addEventListener('click', displayNoneMenuPerfil);
    
    const profileIco = document.querySelector('.content-profile');
    if (profileIco) {
        profileIco.addEventListener('click', listProfile);
    }
    
    const logOutLink = document.querySelector('#logout_link');
    if(logOutLink){
        logOutLink.addEventListener('click', logOut);
    }
    
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', changeMenuBurger);
    }
    
    // Check token expiration every second
    setInterval(() => checkTokenExpiration(token), 60*60*1000);
    
    const decoded = decodeJWT(token);
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
        window.location.href = './401.html';
        return;
    }
    
    const btnSave = document.querySelector('#btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', (e) => updateUser(passwordUpdate, e));
    }
});
