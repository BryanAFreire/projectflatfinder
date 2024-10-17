export function NoFavoriteFlat() {
    const noFavoritesMessage = document.getElementById('no-favorites-message');
    const container = document.querySelector(".container");
    noFavoritesMessage.style.display = 'flex';
    container.style.display = 'none';
}