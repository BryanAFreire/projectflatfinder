const deleteErrorMessage = (inputElement) => {
    let contentMessage = inputElement.parentElement.querySelector('.container-error-message');
    if (contentMessage) {
        contentMessage.remove();
    }
}