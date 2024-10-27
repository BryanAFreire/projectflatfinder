export function validateSession(token) {
    if (!token) {
        console.error('No token found in localStorage.');
        window.location.href = './401.html';
    }
}
