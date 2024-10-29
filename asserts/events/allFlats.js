import {userGreeting} from "./modules/userGreeting.js";
import {getAllFlats} from "./modules/getAllFlats.js";
import {displayNoneMenuPerfil} from "./modules/displayNoneMenuPerfil.js";
import {listProfile} from "./modules/profileMenu.js";
import {changeMenuBurger} from "./modules/burgerMenu.js";
import {filterFlats} from "./modules/filtersFlats.js";
import {orderTable} from "./modules/orderTable.js";
import {logOut} from "./modules/logOut.js";
import {validateSession} from "./modules/verifySession.js";
import {checkTokenExpiration} from "./modules/checkingExpirationToken.js";

document.addEventListener('DOMContentLoaded', () => {
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
    setInterval(() => checkTokenExpiration(token), 60*60*1000);
    
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
