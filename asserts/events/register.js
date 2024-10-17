import { setUserStorage } from './utils/setUserStorage.js';

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const btnRegister = document.querySelector('#register-button');
    btnRegister.addEventListener('click', setUserStorage);
});