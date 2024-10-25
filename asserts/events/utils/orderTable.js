export function orderTable(column) {
    const table = document.getElementById('data-table');
    const tableBody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tableBody.rows);
    
    rows.sort((a, b) => {
        const cellA = a.cells[column].textContent.trim();
        const cellB = b.cells[column].textContent.trim();
        
        if (!isNaN(cellA) && !isNaN(cellB)) {
            return parseFloat(cellA) - parseFloat(cellB);
        }
        
        return cellA.localeCompare(cellB);
    });
    
    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}
