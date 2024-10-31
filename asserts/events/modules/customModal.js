export function showCustomModal(messages, actionButtonText, actionCallback, autoClose = false, autoCloseTime = 5000) {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalActionButton = document.getElementById('modalActionButton');
    const modalYesButton = document.getElementById('modalYesButton');
    const modalNoButton = document.getElementById('modalNoButton');
    
    // Clear previous messages
    modalMessage.innerHTML = '';
    
    // Create a div for each message
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        modalMessage.appendChild(messageDiv);
    });
    
    modalActionButton.style.display = 'inline-block';
    if (modalYesButton) {
        modalYesButton.style.display = 'none';
    }
    if (modalNoButton) {
        modalNoButton.style.display = 'none';
    }
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
