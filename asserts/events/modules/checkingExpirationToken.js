
import { showCustomModal } from "./customModal.js";

export function checkTokenExpiration(token) {

    localStorage.removeItem('token');
    showCustomModal(
        'Your session has expired. Please log in again.',
        'Accept',
        () => {
            window.location.href = './index.html';
            },
        true,
        5000
    );
}
