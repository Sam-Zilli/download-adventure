// Function to check the entered password and route the user accordingly using LEVELS from constants.js
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const errorMessage = document.getElementById("error-message");
    
    console.log('[DEBUG PasswordPortal] checkPassword called with input:', passwordInput);
    console.log('[DEBUG PasswordPortal] window.LEVELS exists:', typeof window.LEVELS !== 'undefined');
    console.log('[DEBUG PasswordPortal] window.LEVELS value:', window.LEVELS);
    
    // Hide the error message and any previous success message
    errorMessage.classList.add("hidden");
    var successMsg = document.getElementById("success-message");
    if (successMsg) successMsg.classList.add("hidden");

    // Find the level with the matching password
    let match = null;
    if (typeof window.LEVELS !== 'undefined' && Array.isArray(window.LEVELS)) {
        console.log('[DEBUG PasswordPortal] LEVELS array found, searching for password:', passwordInput);
        console.log('[DEBUG PasswordPortal] Available passwords:', window.LEVELS.map(lvl => lvl.password));
        
        match = window.LEVELS.find(lvl => lvl.password === passwordInput);
        console.log('[DEBUG PasswordPortal] Match found:', match);
    } else {
        console.error('[DEBUG PasswordPortal] LEVELS array not found or not an array');
        console.log('[DEBUG PasswordPortal] typeof window.LEVELS:', typeof window.LEVELS);
        console.log('[DEBUG PasswordPortal] Array.isArray(window.LEVELS):', Array.isArray(window.LEVELS));
    }

    if (match) {
        console.log('[DEBUG PasswordPortal] Password match found, redirecting to:', match.file);
        // Show video game style success message and auto-redirect
        if (typeof showSuccessAndRedirect === 'function') {
            console.log("Redirecting to: " + match.file);
            showSuccessAndRedirect(match.file);
        } else {
            console.log('[DEBUG PasswordPortal] showSuccessAndRedirect not found, using direct redirect');
            // fallback: just redirect
            window.location.href = match.file;
        }
    } else {
        console.log('[DEBUG PasswordPortal] No match found for password:', passwordInput);
        // Show custom ACCESS DENIED modal if available
        if (typeof showAccessDeniedModal === 'function') {
            console.log('[DEBUG PasswordPortal] Showing access denied modal');
            showAccessDeniedModal();
        } else {
            console.log('[DEBUG PasswordPortal] showAccessDeniedModal not found, showing error message');
            // fallback: Show error message
            errorMessage.classList.remove("hidden");
        }
    }
}
