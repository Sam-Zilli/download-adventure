// matrixModal.js: Reusable Matrix-themed modal logic

function showMatrixModal({ title = "", message = "", buttonText = "OK", onClose = null }) {
    let modal = document.getElementById('custom-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2 id="modal-title"></h2>
                <p id="modal-message"></p>
                <button id="modal-ok-btn"></button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    // Force modal to be on top and visible
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.zIndex = '99999';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
        // Debugging: log when modal is opened/closed and key actions
        function logMatrixModal(msg) {
            console.log('[matrixModal]', msg);
        }
    
        // Example: If you have a function to open the modal
        if (typeof openMatrixModal === 'function') {
            const originalOpen = openMatrixModal;
            window.openMatrixModal = function(...args) {
                logMatrixModal('openMatrixModal called with args: ' + JSON.stringify(args));
                return originalOpen.apply(this, args);
            };
        }
    
        // Example: If you have a function to close the modal
        if (typeof closeMatrixModal === 'function') {
            const originalClose = closeMatrixModal;
            window.closeMatrixModal = function(...args) {
                logMatrixModal('closeMatrixModal called with args: ' + JSON.stringify(args));
                return originalClose.apply(this, args);
            };
        }
    
        // If modal is opened/closed by other means, add logs in those spots as well
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').innerHTML = message;
    const okBtn = document.getElementById('modal-ok-btn');
    okBtn.textContent = buttonText;
    okBtn.onclick = function() {
        modal.style.display = 'none';
        if (typeof onClose === 'function') onClose();
    };
    modal.style.display = 'flex';
    // Ensure modal-content has the correct matrix card background and style
    var modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.background = '#111';
        modalContent.style.border = '2px solid #00ff41';
        modalContent.style.borderRadius = '10px';
        modalContent.style.padding = '36px 32px';
        modalContent.style.boxShadow = '0 0 32px #00ff41';
        modalContent.style.textAlign = 'center';
        modalContent.style.maxWidth = '90vw';
    }
}

// Usage example:
// showMatrixModal({ title: 'Level Password', message: 'The password is: <b>bytes</b>', buttonText: 'OK', onClose: () => { ... } });
