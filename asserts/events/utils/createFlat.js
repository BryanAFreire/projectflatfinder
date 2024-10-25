import { validateFormFlat } from "./validateFormFlat.js";
import { displaySpinner } from "./displaySpinner.js";
import { decodeJWT } from "./getUserStorage.js";
import {addNumberValidation} from "./addNumberValidation.js";

const city = document.querySelector("#city");
const street_name = document.querySelector("#street_name");
const street_number = document.querySelector("#street_number");
const area_size = document.querySelector("#area_size");
const has_ac = document.querySelector("#has_ac");
const year_built = document.querySelector("#year_built");
const rent_price = document.querySelector("#rent_price");
const date_available = document.querySelector("#date_available");

const createFlat = (e) => {
    e.preventDefault();

    addNumberValidation(street_number);
    addNumberValidation(area_size, true);
    addNumberValidation(year_built);
    addNumberValidation(rent_price, true);

    if (!validateFormFlat()) {
        return;
    }

    // Get the token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in local storage.');
        return;
    }

    // Decode the token to get the email
    const decodedToken = decodeJWT(token);
    const userEmail = decodedToken.username.email;
    console.info('dataUser:', userEmail);

    // Set default value for has_ac if not selected
    const hasAcValue = has_ac.value.trim() === "Yes" ? "Yes" : "No";

    const flat = {
        city: city.value.toLowerCase(),
        street_name: street_name.value.toLowerCase(),
        street_number: street_number.value.toLowerCase(),
        area_size: area_size.value,
        has_ac: hasAcValue,
        yearBuilt: year_built.value,
        rent_price: rent_price.value,
        date_available: date_available.value,
        favorite: true,
        email: userEmail
    };

    const flats = JSON.parse(localStorage.getItem('flats')) || [];
    flats.push(flat);
    localStorage.setItem('flats', JSON.stringify(flats));

    city.value = "";
    street_name.value = "";
    street_number.value = "";
    area_size.value = "";
    has_ac.value = "";
    year_built.value = "";
    rent_price.value = "";
    date_available.value = "";

    displaySpinner();

    setTimeout(() => {
        const containerSpinner = document.querySelector('.spinner');
        const container = document.querySelector('.container');
        containerSpinner.style.display = 'none';
        container.style.display = 'flex';
        window.location.href = './home.html';
    }, 3000);
}; export { createFlat };
