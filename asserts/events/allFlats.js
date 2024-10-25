import {userGreeting} from "./utils/userGreeting.js";
import {getAllFlats} from "./utils/getAllFlats.js";
import {displayNoneMenuPerfil} from "./utils/displayNoneMenuPerfil.js";
import {listProfile} from "./utils/profileMenu.js";
import {changeMenuBurger} from "./utils/burgerMenu.js";
import {filterFlats} from "./utils/filtersFlats.js";
import {orderTable} from "./utils/orderTable.js";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    
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
    
    getAllFlats();
    
    document.getElementById('filter').addEventListener('click', filterFlats);
    document.getElementById('order').addEventListener('change', (e) => {
        const column = e.target.value;
        const columnIndex = {
            'city': 0,  // Assuming 'city' is the first column
            'price': 6,
            'size': 3
        }[column];
        
        if (columnIndex !== undefined) {
            orderTable(columnIndex);
        } else {
            console.error('Invalid column selected for ordering.');
        }
    });
    
    filterFlats(new Event('init'));
});
