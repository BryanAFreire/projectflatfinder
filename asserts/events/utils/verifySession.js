export function validateSession(token) {
    if (!token) {
        console.error('Invalid Token');
        window.location.href = './401.html';
    }
}
