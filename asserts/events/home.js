import { displayNoneMenuPerfil } from './utils/displayNoneMenuPerfil.js';
import { userGreeting } from './utils/userGreeting.js';
import { listProfile } from './utils/profileMenu.js';
import { dataFavoriteFlat } from './utils/getFavoriteFlats.js';
import { changeMenuBurger } from "./utils/burgerMenu.js";
import {logOut} from "./utils/logOut.js";
import {checkTokenExpiration} from "./utils/checkingExpirationToken.js";
import {validateSession} from "./utils/verifySession.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token');
    
    validateSession(token);
    
    logOut();
    
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
    
    // Check token expiration every second
    setInterval(() => checkTokenExpiration(token), 1000);

    dataFavoriteFlat();

});
