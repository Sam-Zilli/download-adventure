// matrixModal.js must be loaded before this!
function showAccessDeniedModal(onClose) {
    showMatrixModal({
        title: 'ACCESS DENIED',
        message: '<span style="font-size:1.2em;">Incorrect password or code.<br>Try again.</span>',
        buttonText: 'OK',
        onClose: onClose || null
    });
}
