const generateJWT = (username) => {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };

    const payload = {
        username: username,
        iat: Math.floor(Date.now() / 1000) - 30, // date emision
        exp: Math.floor(Date.now() / 1000) + (60*60) // expires in 60 minutes
    };

    const base64UrlEncode = (obj) => {
        return btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    };

    const stringifiedHeader = base64UrlEncode(header);
    const stringifiedPayload = base64UrlEncode(payload);

    const signature = btoa(stringifiedHeader + "." + stringifiedPayload); // signature simulate

    return `${stringifiedHeader}.${stringifiedPayload}.${signature}`;
}
export {generateJWT};
