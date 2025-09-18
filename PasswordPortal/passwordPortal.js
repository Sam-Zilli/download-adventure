// Function to check the entered password and route the user accordingly using LEVELS from constants.js
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const errorMessage = document.getElementById("error-message");
    // Hide the error message and any previous success message
    errorMessage.classList.add("hidden");
    var successMsg = document.getElementById("success-message");
    if (successMsg) successMsg.classList.add("hidden");

    // Find the level with the matching password
    let match = null;
    if (typeof LEVELS !== 'undefined' && Array.isArray(LEVELS)) {
        match = LEVELS.find(lvl => lvl.password === passwordInput);
    }

    if (match) {
        // Show video game style success message and auto-redirect
        if (typeof showSuccessAndRedirect === 'function') {
            console.log("Redirecting to: " + match.file);
            showSuccessAndRedirect(match.file);
        } else {
            // fallback: just redirect
            window.location.href = match.file;
        }
    } else {
        // Show custom ACCESS DENIED modal if available
        if (typeof showAccessDeniedModal === 'function') {
            showAccessDeniedModal();
        } else {
            // fallback: Show error message
            errorMessage.classList.remove("hidden");
        }
    }
}
