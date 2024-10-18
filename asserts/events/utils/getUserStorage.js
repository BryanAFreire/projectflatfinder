export function decodeJWT(token) {
    function base64UrlDecode(base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = atob(base64);
        return JSON.parse(decodedData);
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('JWT inválido');
    }

    const decodeJWT = (token) => {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT');
        }
        return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    };

    const header = base64UrlDecode(parts[0]);
    const payload = base64UrlDecode(parts[1]);

    return {
        header: header,
        payload: payload
    };
}
