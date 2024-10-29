export function validateSession(token) {
    if (!token) {
        window.location.href = './401.html';
    }
}
