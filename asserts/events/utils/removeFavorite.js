import { decodeJWT } from "./getUserStorage.js";

export function removeFavorite(id, e) {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    
    // Decode the token to get the email
    const decodedToken = decodeJWT(token);
    const userEmail = decodedToken.username.email;
    console.info('dataUser:', userEmail);
    
    const flats_favorites = JSON.parse(localStorage.getItem('flats_favorites')) || [];
    const exist = flats_favorites.findIndex(item => item.idFlat === id);
    
    if (exist !== -1) {
        flats_favorites.splice(exist, 1);
        e.target.closest('tr').remove(); // Remove the row from the table
    }
    
    localStorage.setItem('flats_favorites', JSON.stringify(flats_favorites));
}
