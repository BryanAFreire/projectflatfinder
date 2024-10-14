import { setUserStorage } from './setUserStorage.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.querySelector('#register-button');
    btnRegister.addEventListener('click', setUserStorage);
});