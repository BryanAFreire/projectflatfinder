import { decodeJWT } from "./getUserStorage.js";
import { NoFavoriteFlat } from "./noFavoriteFlat.js";

export function dataFavoriteFlat() {
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

    // Filter flats by logged-in user and favorite status
    const userFlats = storedFlats.filter(flat => flat.email === userEmail);
    const favoriteFlats = userFlats.filter(flat => flat.favorite === true);
    let keys = [];

    if (favoriteFlats.length > 0) {
        noFavoriteFlat.style.display = 'none';
        container.style.display = 'flex';

        // Insert column headers
        const headerRow = tableHead.insertRow();
        keys = Object.keys(favoriteFlats[0]).filter(key => (key !== 'email') && (key !== 'favorite'));
        keys.forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
        });

        // Add "Remove" column header
        const removeHeaderCell = document.createElement('th');
        removeHeaderCell.textContent = 'Remove';
        headerRow.appendChild(removeHeaderCell);

        // Pagination variables
        const rowsPerPage = 5;
        let currentPage = 1;

        // Function to display a specific page of data
        function displayPage(page) {
            tableBody.innerHTML = ''; // Clear existing rows

            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const pageData = favoriteFlats.slice(start, end);

            pageData.forEach((flat) => {
                const row = tableBody.insertRow();
                keys.forEach(key => {
                    const cell = row.insertCell();
                    cell.textContent = flat[key];
                });

                // Add "Remove" button
                const removeCell = row.insertCell();
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = () => {
                    const rowIndex = storedFlats.indexOf(flat);
                    if (rowIndex > -1) {
                        storedFlats[rowIndex].favorite = false;
                        localStorage.setItem('flats', JSON.stringify(storedFlats));
                        dataFavoriteFlat(); // Refresh the table
                    }
                };
                removeCell.appendChild(removeButton);
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