// Define the passwords for each level
const levelPasswords = {

    // Level 1: What is Binary?
    "learn"   : "../Level1/WhatIsBinary.html",

    // Level 2: Transistors
    "bytes"    : "../Level2/Transistors.html",

    // Level 3: Open Source
    "Transistor" : "../Level3/WhatIsOpenSource.html",

    // Level 4: Terminal Review
    "Terminal" : "../terminal/index.html",

    // Level 5: Brew
    "-a" : "../brew/index.html",

    // Level 6: Git and GitHub
    "i-got-brew" : "../git/index.html",
    
    // After snake game user is routed to VSCode install
    "IGOTGIT" : "../snake-game/snake.html",
    

    // // Routed to did you make a gh account page?
    // // Then routed to Creation of auth token
    // "bytes" : "../git/github-account.html",

    // // After creating auth token, routed to terminal page
    // "auth" : "../terminal/index.html",

    // "-a" : "../vocab/index.html",


    // "command" : "../open-source/index.html",


    // "together" : "../brew/index.html",



    // VSCode password IDE routes to final level
    "IDE" : "../scratch-submission/index.html",


    // "adventure" : "end.html"
};

// Function to check the entered password and route the user accordingly
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const errorMessage = document.getElementById("error-message");
    // Hide the error message and any previous success message
    errorMessage.classList.add("hidden");
    var successMsg = document.getElementById("success-message");
    if (successMsg) successMsg.classList.add("hidden");

    // Check if the entered password exists in the levelPasswords object
    if (levelPasswords[passwordInput]) {
        // Show video game style success message and auto-redirect
        if (typeof showSuccessAndRedirect === 'function') {
            console.log("Redirecting to: " + levelPasswords[passwordInput]);
            showSuccessAndRedirect(levelPasswords[passwordInput]);
        } else {
            // fallback: just redirect
            window.location.href = levelPasswords[passwordInput];
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
