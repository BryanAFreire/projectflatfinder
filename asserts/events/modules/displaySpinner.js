export function displaySpinner() {
    const containerSpinner = document.querySelector(".spinner");
    const container = document.querySelector(".container");
    containerSpinner.style.display = 'flex';
    container.style.display = 'none';
}

