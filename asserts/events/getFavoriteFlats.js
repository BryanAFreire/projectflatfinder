const dataFlat = () => {
    let storedFlats = JSON.parse(localStorage.getItem('flats')) || [];
    const table = document.getElementById('data-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    const tableHead = table.getElementsByTagName('thead')[0];
    const userElement = document.getElementById('user');
    const userText = userElement ? userElement.textContent : '';

    // Clear existing rows and headers
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';

    // Filter flats by logged-in user and favorite status
    const userFlats = storedFlats.filter(flat => flat.user === userText && flat.favorite === true);
    let keys = [];

    if (userFlats.length > 0) {
        // Insert column headers
        const headerRow = tableHead.insertRow();
        keys = Object.keys(userFlats[0]).filter(key => key !== 'user');
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
        const rowsPerPage = 2;
        let currentPage = 1;

        // Function to display a specific page of data
        function displayPage(page) {
            tableBody.innerHTML = ''; // Clear existing rows

            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const pageData = userFlats.slice(start, end);

            pageData.forEach((flat, index) => {
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
                        dataFlat(); // Refresh the table
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
    }
};

// Call the function to initialize the table
dataFlat();

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
