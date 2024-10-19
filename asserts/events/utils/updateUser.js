export function updateUser(e) {
        e.preventDefault();
    const token = localStorage.getItem('token');

    // Redirect to 404 page if no token is found
    if (!token) {
        window.location.href = './404.html';
        return;
    }

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const birthDate = document.querySelector('#birth_date');

        if (token) {
            try {
                const updatedUser = {
                    email: email.value,
                    password: password.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    birthDate: birthDate.value
                };

                // Update the users array in localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(user => user.email === email.value);
                if (userIndex !== -1) {
                    users[userIndex] = updatedUser;
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log('User updated successfully in localStorage.');

                    // Clear the token and redirect to index.html
                    localStorage.removeItem('token');
                    window.location.href = './index.html';
                } else {
                    console.log('User not found in localStorage.');
                }
            } catch (error) {
                console.error('Error updating the user data:', error);
            }
        } else {
            console.log('No token found in localStorage.');
        }
}