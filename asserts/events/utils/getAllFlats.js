import { decodeJWT } from "./getUserStorage.js";
import { NoFavoriteFlat } from "./noFavoriteFlat.js";

export function getAllFlats() {
    let storedFlats = JSON.parse(localStorage.getItem('flats')) || [];
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
    if (!token) {
        console.error('No token found in local storage.');
        return;
    }

    // Decode the token to get the email
    const decodedToken = decodeJWT(token);
    const userEmail = decodedToken.username.email;

    // Filter flats by logged-in user
    const userFlats = storedFlats.filter(flat => flat.email === userEmail);
    let keys = [];

    if (userFlats.length > 0) {
        noFavoriteFlat.style.display = 'none';
        container.style.display = 'flex';

        // Insert column headers
        const headerRow = tableHead.insertRow();
        keys = Object.keys(userFlats[0]).filter(key => (key !== 'email') && (key !== 'favorite'));
        keys.forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
        });

        // Add "Favorite" column header
        const favoriteHeaderCell = document.createElement('th');
        favoriteHeaderCell.textContent = 'Favorite';
        headerRow.appendChild(favoriteHeaderCell);

        // Pagination variables
        const rowsPerPage = 5;
        let currentPage = 1;

        // Function to display a specific page of data
        function displayPage(page) {
            tableBody.innerHTML = ''; // Clear existing rows

            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const pageData = userFlats.slice(start, end);

            pageData.forEach((flat) => {
                const row = tableBody.insertRow();
                keys.forEach(key => {
                    const cell = row.insertCell();
                    cell.textContent = flat[key];
                });

                // Add "Favorite" button
                const favoriteCell = row.insertCell();
                const favoriteButton = document.createElement('button');
                favoriteButton.textContent = flat.favorite ? '★' : '☆';
                favoriteButton.onclick = () => {
                    const rowIndex = storedFlats.indexOf(flat);
                    if (rowIndex > -1) {
                        storedFlats[rowIndex].favorite = !storedFlats[rowIndex].favorite;
                        localStorage.setItem('flats', JSON.stringify(storedFlats));
                        displayPage(currentPage); // Refresh the table
                    }
                };
                favoriteCell.appendChild(favoriteButton);
            });

            updatePaginationControls();
        }

        // Function to update pagination controls
        function updatePaginationControls() {
            const paginationControls = document.getElementById('pagination-controls');
            paginationControls.innerHTML = ''; // Clear existing controls

            const totalPages = Math.ceil(userFlats.length / rowsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.onclick = () => {
                    currentPage = i;
                    displayPage(currentPage);
                };
                if (i === currentPage) {
                    button.disabled = true;
                }
                paginationControls.appendChild(button);
            }
        }

        // Initial display
        displayPage(currentPage);
    } else {
        // No flats found
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