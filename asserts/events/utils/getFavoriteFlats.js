import { decodeJWT } from "./getUserStorage.js";
import { NoFavoriteFlat } from "./noFavoriteFlat.js";
import { removeFavorite } from "./removeFavorite.js";
import {validateSession} from "./verifySession.js";

export function dataFavoriteFlat() {
    const favorites = JSON.parse(localStorage.getItem('flats_favorites')) || [];
    const storedFlats = JSON.parse(localStorage.getItem('flats')) || [];
    const table = document.getElementById('data-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    const tableHead = table.getElementsByTagName('thead')[0];
    const noFavoriteFlat = document.querySelector("#no-favorites-message");
    const container = document.querySelector(".container");
    
    // Clear existing rows and headers
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';
    
    // Get the token from local storage
    const token = localStorage.getItem('token');
    validateSession(token);
    
    // Decode the token to get the email
    const decodedToken = decodeJWT(token);
    const userEmail = decodedToken.username.email;
    
    // Filter flats by logged-in user and favorite status
    const favoriteFlats = storedFlats.filter(flat => {
        return favorites.some(fav => fav.idFlat === flat.id && fav.emailUser === userEmail);
    });
    
    if (favoriteFlats.length > 0) {
        noFavoriteFlat.style.display = 'none';
        container.style.display = 'flex';
        
        // Insert column headers
        const headerRow = tableHead.insertRow();
        const keys = Object.keys(favoriteFlats[0]).filter(key => key);
        keys.forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
        });
        
        // Add "Remove" column header
        const removeHeaderCell = document.createElement('th');
        removeHeaderCell.textContent = 'favorite';
        headerRow.appendChild(removeHeaderCell);
        
        // Insert rows
        favoriteFlats.forEach(flat => {
            const row = tableBody.insertRow();
            keys.forEach(key => {
                const cell = row.insertCell();
                cell.textContent = flat[key];
            });
            
            // Add "Remove" button
            const removeCell = row.insertCell();
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = (e) => removeFavorite(flat.id, e);
            removeCell.appendChild(removeButton);
        });
    } else {
        // No favorite flats found
        NoFavoriteFlat();
    }
    
    // CSS for horizontal scroll
    const style = document.createElement('style');
    style.innerHTML = `
        #data-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);
}
