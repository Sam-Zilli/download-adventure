// Define the passwords for each level
const levelPasswords = {


    "learn"   : "../binary/index.html",

    // Routed to did you make a gh account page?
    // Then routed to Creation of auth token
    "bytes" : "../git/github-account.html",

    // After creating auth token, routed to terminal page
    "auth" : "../terminal/index.html",

    "-a" : "../vocab/index.html",


    "command" : "../open-source/index.html",


    "together" : "../brew/index.html",


    "i-got-brew" : "../git/index.html",


                // After snake game user is routed to VSCode install
    "IGOTGIT" : "../snake-game/snake.html",


    // VSCode password IDE routes to final level
    "IDE" : "../scratch-submission/index.html",


    "adventure" : "end.html"
};

// Function to check the entered password and route the user accordingly
function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const errorMessage = document.getElementById("error-message");
    const nextLevelContainer = document.getElementById("next-level-container");
    const nextLevelLink = document.getElementById("next-level-link");

    // Hide the error message and next level link initially
    errorMessage.classList.add("hidden");
    nextLevelContainer.classList.add("hidden");

    // Check if the entered password exists in the levelPasswords object
    if (levelPasswords[passwordInput]) {
        // Set the "Next Level" link to the appropriate page
        nextLevelLink.href = levelPasswords[passwordInput];
        // Show the "Next Level" button and reveal the link
        nextLevelContainer.classList.remove("hidden");
    } else {
        // Show error message for incorrect password
        errorMessage.classList.remove("hidden");
    }
}
