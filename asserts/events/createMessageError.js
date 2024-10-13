const createErrorMessage = (inputElement, message) => {
    let contentMessage = inputElement.parentElement.querySelector('.container-error-message');
    if (!contentMessage) {
        const containerError = document
            .createElement('div');
        containerError.classList = 'container-error-message';
        containerError.innerHTML = ` 
            <span id='ico_error'></span>
            <p id='error_message'>${message}</p>
        `;
        inputElement.insertAdjacentElement('afterend', containerError);
    }
}