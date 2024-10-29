import {createErrorMessage} from "./createMessageError.js";
import {deleteErrorMessage} from "./deleteMessageError.js";

export function addNumberValidation(item, allowDecimal = false) {
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
    });
}