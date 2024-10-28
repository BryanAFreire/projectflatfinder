export function updateUser(passwordUpdate, e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const email = document.querySelector('#email');
    const newPassword = document.querySelector('#new-password');
    const confirmPassword = document.querySelector('#confirm-password');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const birthDate = document.querySelector('#birth_date');
    
    if (token) {
        try {
            const updatedUser = {
                email: email.value,
                password: passwordUpdate, // Default to the existing password
                firstName: firstName.value.toUpperCase(),
                lastName: lastName.value.toUpperCase(),
                birthDate: birthDate.value
            };
            
            // Update password only if new password is provided and matches confirm password
            if (newPassword.value && newPassword.value === confirmPassword.value) {
                updatedUser.password = newPassword.value;
            } else if (newPassword.value !== confirmPassword.value) {
                console.log('Passwords do not match. Password not updated.');
            }
            
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
