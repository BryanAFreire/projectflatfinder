import {userGreeting} from "./modules/userGreeting.js";
import {createFlat} from "./modules/createFlat.js";
import {loadCities} from "./modules/getCities.js";
import {loadYears} from "./modules/getYearBuilt.js";
import {changeMenuBurger} from "./modules/burgerMenu.js";
import {listProfile} from "./modules/profileMenu.js";
import {displayNoneMenuPerfil} from "./modules/displayNoneMenuPerfil.js";
import {logOut} from "./modules/logOut.js";
import {validateSession} from "./modules/verifySession.js";
import {checkTokenExpiration} from "./modules/checkingExpirationToken.js";


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

    const city = document.querySelector('#city');
    if (city) {
        city.addEventListener('keyup', loadCities);
    }

    const yearBuilt = document.querySelector('#year_built');
    if (yearBuilt) {
        yearBuilt.addEventListener('keyup', loadYears);
    }


    const saveFlat = document.querySelector('#save-flat');
    if (saveFlat) {
        saveFlat.addEventListener('click', createFlat);
    }

});
