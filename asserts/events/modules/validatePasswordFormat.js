export function validatePassword(password) {
    const minLength = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
    return minLength && hasLetter && hasNumber && hasSpecialChar;
}