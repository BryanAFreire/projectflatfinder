const fullName = document.querySelector('#user');
 const userGreeting = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
        try {
            const decoded = decodeJWT(token);
            console.log('Decoded Token:', decoded);

            const firstName = decoded.payload.username.firstName.toUpperCase();
            const lastName = decoded.payload.username.lastName.toUpperCase();
            fullName.textContent = `${firstName} ${lastName}`;
        } catch (error) {
            console.error('Error decoding the token:', error);
        }
    } else {
        console.log('No token found in localStorage.');
    }

};