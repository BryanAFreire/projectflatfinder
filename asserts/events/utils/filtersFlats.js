export function filterFlats(e) {
    if (e) e.preventDefault();
    const flats = JSON.parse(localStorage.getItem('flats')) || [];
    const city = document.querySelector('#city').value.trim().toLowerCase();
    let minPriceInput = document.querySelector('#min-price').value.trim();
    const maxPriceInput = document.querySelector('#max-price').value.trim();
    let minAreaInput = document.querySelector('#min-area').value.trim();
    const maxAreaInput = document.querySelector('#max-area').value.trim();
    
    const table = document.getElementById('data-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    const tableHead = table.getElementsByTagName('thead')[0];
    
    // Clear existing rows and headers
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';
    
    if (flats != null && Array.isArray(flats)) {
        const filteredFlats = flats.filter(flat => {
            if (city && flat.city.toLowerCase() !== city) {
                return false;
            }
            
            if (!minPriceInput) {
                minPriceInput = 0;
            }
            
            if (maxPriceInput) {
                if (parseFloat(minPriceInput) > parseFloat(flat.rent_price) || parseFloat(maxPriceInput) < parseFloat(flat.rent_price)) {
                    return false;
                }
            } else {
                if (parseFloat(minPriceInput) > parseFloat(flat.rent_price)) {
                    return false;
                }
            }
            
            if (!minAreaInput) {
                minAreaInput = 0;
            }
            
            if (maxAreaInput) {
                if (parseFloat(minAreaInput) > parseFloat(flat.area_size) || parseFloat(maxAreaInput) < parseFloat(flat.area_size)) {
                    return false;
                }
            } else {
                if (parseFloat(minAreaInput) > parseFloat(flat.area_size)) {
                    return false;
                }
            }
            
            return true;
        });
        
        if (filteredFlats.length > 0) {
            // Insert column headers
            const headerRow = tableHead.insertRow();
            const keys = Object.keys(filteredFlats[0]).filter(key => key !== 'email' && key !== 'favorite');
            keys.forEach(key => {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            });
            
            // Add "Favorite" column header
            const favoriteHeaderCell = document.createElement('th');
            favoriteHeaderCell.textContent = 'Favorite';
            headerRow.appendChild(favoriteHeaderCell);
            
            // Insert rows
            filteredFlats.forEach(flat => {
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
                    const rowIndex = flats.indexOf(flat);
                    if (rowIndex > -1) {
                        flats[rowIndex].favorite = !flats[rowIndex].favorite;
                        localStorage.setItem('flats', JSON.stringify(flats));
                        filterFlats(); // Refresh the table
                    }
                };
                favoriteCell.appendChild(favoriteButton);
            });
        } else {
            // No flats found for the specified filters
            const noDataRow = tableBody.insertRow();
            const noDataCell = noDataRow.insertCell();
            noDataCell.colSpan = Object.keys(flats[0] || {}).length + 1;
            noDataCell.textContent = 'No flats found for the specified filters.';
        }
    }
}
