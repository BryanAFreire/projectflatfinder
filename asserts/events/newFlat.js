import {userGreeting} from "./utils/userGreeting.js";
import {createFlat} from "./utils/createFlat.js";
import {loadCities} from "./utils/getCities.js";
import {loadYears} from "./utils/getYearBuilt.js";
import {changeMenuBurger} from "./utils/burgerMenu.js";
import {listProfile} from "./utils/profileMenu.js";
import {displayNoneMenuPerfil} from "./utils/displayNoneMenuPerfil.js";
import {logOut} from "./utils/logOut.js";
import {validateSession} from "./utils/verifySession.js";
import {checkTokenExpiration} from "./utils/checkingExpirationToken.js";


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
