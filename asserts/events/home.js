import { displayNoneMenuPerfil } from './modules/displayNoneMenuPerfil.js';
import { userGreeting } from './modules/userGreeting.js';
import { listProfile } from './modules/profileMenu.js';
import { dataFavoriteFlat } from './modules/getFavoriteFlats.js';
import { changeMenuBurger } from "./modules/burgerMenu.js";
import {checkTokenExpiration} from "./modules/checkingExpirationToken.js";
import {validateSession} from "./modules/verifySession.js";
import {logOut} from "./modules/logOut.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
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
    setInterval(() => checkTokenExpiration(token), 1000);

    dataFavoriteFlat();

});
