// Function to check the entered password and route the user accordingly
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const errorMessage = document.getElementById("error-message");
    
    // Hide the error message and any previous success message
    errorMessage.classList.add("hidden");
    var successMsg = document.getElementById("success-message");
    if (successMsg) successMsg.classList.add("hidden");

    // Find the level with the matching password
    let match = null;
    if (typeof window.LEVELS !== 'undefined' && Array.isArray(window.LEVELS)) {
        match = window.LEVELS.find(lvl => lvl.password === passwordInput);
    }

    if (match) {
        // Build the URL using the path property
        const targetUrl = window.getLevelUrl ? window.getLevelUrl(match.path) : '../' + match.path + '/index.html';
        
        // Show video game style success message and auto-redirect
        if (typeof showSuccessAndRedirect === 'function') {
            showSuccessAndRedirect(targetUrl);
        } else {
            window.location.href = targetUrl;
        }
    } else {
        // Show custom ACCESS DENIED modal if available
        if (typeof showAccessDeniedModal === 'function') {
            showAccessDeniedModal();
        } else {
            errorMessage.classList.remove("hidden");
        }
    }
}
