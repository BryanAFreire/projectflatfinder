import { deleteErrorMessage } from "./deleteMessageError.js";
import { createErrorMessage } from "./createMessageError.js";

export function validateFormFlat() {
    const city = document.querySelector("#city");
    const street_name = document.querySelector("#street_name");
    const street_number = document.querySelector("#street_number");
    const area_size = document.querySelector("#area_size");
    const year_built = document.querySelector("#year_built");
    const rent_price = document.querySelector("#rent_price");
    const date_available = document.querySelector("#date_available");
    const saveFlat = document.querySelector("#save-flat");
    let isValid = true;

    // Set the min attribute for date_available to the current date
    const today = new Date().toISOString().split('T')[0];
    date_available.setAttribute('min', today);
    
    const scrollToFirstError = () => {
        const firstErrorElement = document.querySelector('.error-message');
        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    
    const validateFlat = () => {
        const cityValid = city.value.trim() !== "";
        const streetNameValid = street_name.value.trim().length > 0;
        const streetNumberValid = /^[0-9]+$/.test(street_number.value.trim());
        const areaSizeValid = /^[0-9]+(\.[0-9]{1})?$/.test(area_size.value.trim());
        const yearBuiltValid = /^[0-9]{4}$/.test(year_built.value.trim());
        const rentPriceValid = /^[0-9]+(\.[0-9]{1})?$/.test(rent_price.value.trim());
        const dateAvailableValid = date_available.value.trim() !== "" && new Date(date_available.value) >= new Date(today);

        isValid = cityValid && streetNameValid && streetNumberValid && areaSizeValid && yearBuiltValid && rentPriceValid && dateAvailableValid;

        if (!cityValid) {
            createErrorMessage(city, "City can't be empty.");
        } else {
            deleteErrorMessage(city);
        }

        if (!streetNameValid) {
            createErrorMessage(street_name, "Street name can't be empty.");
        } else {
            deleteErrorMessage(street_name);
        }

        if (!streetNumberValid) {
            createErrorMessage(street_number, "Street number must be a valid number.");
        } else {
            deleteErrorMessage(street_number);
        }

        if (!areaSizeValid) {
            createErrorMessage(area_size, "Area size must be a valid number.");
        } else {
            deleteErrorMessage(area_size);
        }

        if (!yearBuiltValid) {
            createErrorMessage(year_built, "Year built must be a valid 4-digit year.");
        } else {
            deleteErrorMessage(year_built);
        }

        if (!rentPriceValid) {
            createErrorMessage(rent_price, "Rent price must be a valid price.");
        } else {
            deleteErrorMessage(rent_price);
        }

        if (!dateAvailableValid) {
            createErrorMessage(date_available, "Date available can't be in the past.");
        } else {
            deleteErrorMessage(date_available);
        }

        saveFlat.disabled = !isValid;
    };

    city.addEventListener("input", validateFlat);
    street_name.addEventListener("input", validateFlat);
    street_number.addEventListener("input", validateFlat);
    area_size.addEventListener("input", validateFlat);
    year_built.addEventListener("input", validateFlat);
    rent_price.addEventListener("input", validateFlat);
    date_available.addEventListener("input", validateFlat);


    validateFlat();
    return isValid;
}
