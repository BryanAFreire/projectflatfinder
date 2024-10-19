import { displayNoneMenuPerfil } from './utils/displayNoneMenuPerfil.js';
import { userGreeting } from './utils/userGreeting.js';
import { listProfile } from './utils/profileMenu.js';
import { dataFavoriteFlat } from './utils/getFavoriteFlats.js';
import { changeMenuBurger } from "./utils/burgerMenu.js";
import {logOut} from "./utils/logOut.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    userGreeting();

    document.addEventListener('click', displayNoneMenuPerfil);

    const logOutLink = document.querySelector('#logout_link');
    if(logOutLink){
        logOutLink.addEventListener('click', logOut)
    }

    const profileIco = document.querySelector('.content-profile');
    if (profileIco) {
        profileIco.addEventListener('click', listProfile)
    }

    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', changeMenuBurger);
    }

    dataFavoriteFlat();

});