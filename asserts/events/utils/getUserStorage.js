export function decodeJWT(token) {
    function base64UrlDecode(base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = atob(base64);
        return JSON.parse(decodedData);
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT');
    }

    return base64UrlDecode(parts[1]);
}