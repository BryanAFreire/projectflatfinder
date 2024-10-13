const noFavoritesMessage = document.getElementById('no-favorites-message');
const container = document.querySelector(".container");

const NoFavoriteFlat = () => {
    noFavoritesMessage.style.display = 'flex';
    container.style.display = 'none';
}