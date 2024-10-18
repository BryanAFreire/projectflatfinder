import {userGreeting} from "./utils/userGreeting.js";
import {getAllFlats} from "./utils/getAllFlats.js";
import {displayNoneMenuPerfil} from "./utils/displayNoneMenuPerfil.js";
import {listProfile} from "./utils/profileMenu.js";
import {changeMenuBurger} from "./utils/burgerMenu.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()

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

    getAllFlats();
});