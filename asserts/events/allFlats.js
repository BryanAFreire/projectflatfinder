import {userGreeting} from "./utils/userGreeting.js";
import {getAllFlats} from "./utils/getAllFlats.js";
import {displayNoneMenuPerfil} from "./utils/displayNoneMenuPerfil.js";
import {listProfile} from "./utils/profileMenu.js";
import {changeMenuBurger} from "./utils/burgerMenu.js";
import {filterFlats} from "./utils/filtersFlats.js";
import {orderTable} from "./utils/orderTable.js";
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
    
    getAllFlats();
    
    document.getElementById('filter').addEventListener('click', filterFlats);
    document.getElementById('order').addEventListener('change', (e) => {
        const column = e.target.value;
        const columnIndex = {
            'city': 1,  // Assuming 'city' is the first column
            'price': 7,
            'size': 4
        }[column];
        
        if (columnIndex !== undefined) {
            orderTable(columnIndex);
        } else {
            console.error('Invalid column selected for ordering.');
        }
    });
});
