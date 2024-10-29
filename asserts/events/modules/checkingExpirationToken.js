import {decodeJWT} from "./getUserStorage.js";

export function checkTokenExpiration(token) {
    const decoded = decodeJWT(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime >= decoded.exp) {
        localStorage.removeItem('token');
        setTimeout(() => {
            alert('Your session has expired. Please log in again.');
            window.location.href = './index.html';
        }, 0);
    }
}
