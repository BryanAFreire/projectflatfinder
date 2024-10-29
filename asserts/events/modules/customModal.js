export function showCustomModal(message, actionButtonText, actionCallback, autoClose = false, autoCloseTime = 5000) {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalActionButton = document.getElementById('modalActionButton');
    
    modalMessage.textContent = message;
    modalActionButton.textContent = actionButtonText;
    
    modal.style.display = 'flex';
    
    
    modalActionButton.onclick = function() {
        actionCallback();
        modal.style.display = 'none';
    };
    
    if (autoClose) {
        setTimeout(() => {
            modal.style.display = 'none';
            actionCallback();
        }, autoCloseTime);
    }
    
    window.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}
