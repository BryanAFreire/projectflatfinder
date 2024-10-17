import { deleteErrorMessage } from "./deleteMessageError.js";
import { createErrorMessage } from "./createMessageError.js";
import { validateFormFlat } from "./validateFormFlat.js";
import { displaySpinner } from "./displaySpinner.js";
import { decodeJWT } from "./getUserStorage.js";

const city = document.querySelector("#city");
const street_name = document.querySelector("#street_name");
const street_number = document.querySelector("#street_number");
const area_size = document.querySelector("#area_size");
const has_ac = document.querySelector("#has_ac");
const year_built = document.querySelector("#year_built");
const rent_price = document.querySelector("#rent_price");
const date_available = document.querySelector("#date_available");

document.addEventListener('DOMContentLoaded', () => {
    function addNumberValidation(item, allowDecimal = false) {
        item.addEventListener('input', (event) => {
            let value = event.target.value;
            if (allowDecimal) {
                // Allow only digits and a single decimal point
                if (!/^\d*\.?\d*$/.test(value)) {
                    value = value.replace(/[^0-9.]/g, '');
                    const parts = value.split('.');
                    if (parts.length > 2) {
                        value = parts[0] + '.' + parts.slice(1).join('');
                    }
                    event.target.value = value;
                    createErrorMessage(item, "Only numbers and a single decimal point are allowed.");
                } else {
                    deleteErrorMessage(item);
                }
            } else {
                // Allow only digits
                if (!/^\d*$/.test(value)) {
                    event.target.value = value.replace(/\D/g, '');
                    createErrorMessage(item, "Only numbers are allowed.");
                } else {
                    deleteErrorMessage(item);
                }
            }
            validateFormFlat(); // Call validateFormFlat to sync validation
        });
    }

    addNumberValidation(street_number);
    addNumberValidation(area_size, true);
    addNumberValidation(year_built);
    addNumberValidation(rent_price, true);
});

const createFlat = (e) => {
    e.preventDefault();

    // Llama a la función de validación
    if (!validateFormFlat()) {
        console.error('Form validation failed.');
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
    const userEmail = decodedToken.payload.username.email;
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
};

export { createFlat };