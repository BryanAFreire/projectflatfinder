const deleteErrorMessage = (inputElement) => {
    const contentMessage = inputElement.parentElement.querySelector('.container-error-message');
    if (contentMessage) {
        contentMessage.remove();
    }
}; export { deleteErrorMessage };