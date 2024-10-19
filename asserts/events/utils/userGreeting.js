import { decodeJWT } from './getUserStorage.js';

export function userGreeting() {
    const fullName = document.querySelector('#user');
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
        try {
            const decoded = decodeJWT(token);
            console.log('Decoded Token:', decoded);

            const firstName = decoded.username.firstName.toUpperCase();
            const lastName = decoded.username.lastName.toUpperCase();
            fullName.textContent = `${firstName} ${lastName}`;
        } catch (error) {
            console.error('Error decoding the token:', error);
        }
    } else {
        console.log('No token found in localStorage.');
    }
}