let users = JSON.parse(localStorage.getItem('users')) || [];
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const birthDate = document.querySelector('#birth-date');


function User(email, password, firstName, lastName, birthDate) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
}

function setUserStorage(event) {
    event.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert("Passwords don't match. Verify and try again.");
        return;
    }

    const user = new User(
        email.value.toLowerCase(),
        password.value,
        firstName.value.toUpperCase(),
        lastName.value.toUpperCase(),
        birthDate.value
    );

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    displaySpinner();

    setTimeout(() => {
        containerSpinner.style.display = 'none';
        startSession();
    }, 3000);

}