import { decodeJWT } from "./getUserStorage.js";
export function toggleFavorite(id, e) {
    console.dir(id)
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('You must be logged in to add a favorite.');
        window.location.href = '/401.html';
        return;
    }
    
    const decodedToken = decodeJWT(token);
    const userEmail = decodedToken.username.email;
    console.info('dataUser:', userEmail);
    
    const favorite = {
        idFlat: id,
        emailUser: userEmail
    };
    
    let flats_favorites = JSON.parse(localStorage.getItem('flats_favorites'));
    console.dir(flats_favorites);
    if (flats_favorites == null) {
        flats_favorites = [favorite];
        localStorage.setItem('flats_favorites', JSON.stringify(flats_favorites));
    } else {
        const exist = flats_favorites.findIndex((item) => item.idFlat === id);
        if (exist === -1) {
            flats_favorites.push(favorite);
            e.target.textContent = '★';
        } else {
            flats_favorites.splice(exist, 1);
            e.target.textContent = '☆';
        }
        
        localStorage.setItem('flats_favorites', JSON.stringify(flats_favorites));
    }
}
