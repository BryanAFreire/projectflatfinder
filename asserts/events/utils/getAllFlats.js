import { toggleFavorite } from './toggleFavoriteFlat.js';
import { checkFlatFavorite } from './checkFavoriteFlat.js';

export function getAllFlats() {
    let storedFlats = JSON.parse(localStorage.getItem('flats')) || [];
    let storedFavorites = JSON.parse(localStorage.getItem('flats_favorites')) || [];
    const noFavoriteFlat = document.querySelector("#no-favorites-message");
    const container = document.querySelector(".container");
    const table = document.getElementById('data-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    const tableHead = table.getElementsByTagName('thead')[0];
    
    // Clear existing rows and headers
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';
    
    if (storedFlats != null && Array.isArray(storedFlats)) {
        noFavoriteFlat.style.display = 'none';
        container.style.display = 'flex';
        
        // Insert column headers
        const headerRow = tableHead.insertRow();
        const keys = Object.keys(storedFlats[0]).filter(key => key);
        keys.forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
        });
        
        // Add "Favorite" column header
        const favoriteHeaderCell = document.createElement('th');
        favoriteHeaderCell.textContent = 'favorite';
        headerRow.appendChild(favoriteHeaderCell);
        
        // Insert rows
        storedFlats.forEach(flat => {
            const row = tableBody.insertRow();
            keys.forEach(key => {
                const cell = row.insertCell();
                cell.textContent = flat[key];
            });
            
            // Add "Favorite" button
            const favoriteCell = row.insertCell();
            const favoriteButton = document.createElement('button');
            favoriteButton.innerText = checkFlatFavorite(flat.id) ? '★' : '☆';
            favoriteButton.addEventListener('click', (e) => {
                e.preventDefault();
                toggleFavorite(flat.id, e);
            });
            favoriteCell.appendChild(favoriteButton);
        });
    } else {
        // No flats found
        noFavoriteFlat.style.display = 'block';
        container.style.display = 'none';
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
