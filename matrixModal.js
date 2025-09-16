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
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').innerHTML = message;
    const okBtn = document.getElementById('modal-ok-btn');
    okBtn.textContent = buttonText;
    okBtn.onclick = function() {
        modal.style.display = 'none';
        if (typeof onClose === 'function') onClose();
    };
    modal.style.display = 'flex';
}

// Usage example:
// showMatrixModal({ title: 'Level Password', message: 'The password is: <b>bytes</b>', buttonText: 'OK', onClose: () => { ... } });
