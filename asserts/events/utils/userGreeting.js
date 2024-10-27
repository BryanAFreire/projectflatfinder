import { decodeJWT } from './getUserStorage.js';

export function userGreeting() {
    const fullName = document.querySelector('#user');
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decoded = decodeJWT(token);

            const firstName = decoded.username.firstName.toUpperCase();
            const lastName = decoded.username.lastName.toUpperCase();
            fullName.textContent = `${firstName} ${lastName}`;
        } catch (error) {
            console.error('Error decoding the token:', error);
        }
    } else {
        console.error('No token found in localStorage.');
    }
}
