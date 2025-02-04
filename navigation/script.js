// Define the passwords for each level
const levelPasswords = {

    // First password is learn, then they are routed to the binary level
    "learn"   : "../binary/index.html",

    // Second password is byes, then they are routed to the terminal level
    "bytes" : "../terminal/index.html",

    // Third password is -a, then they are routed to the vocab level
    "-a" : "../vocab/index.html",

    // Fourth password is command, then they are routed to the open-source level
    "command" : "../open-source/index.html",

    // Fifth password is together, then they are routed to the brew
    "together" : "../brew/index.html",

    // Sixth password is i-got-brew, then they are routed to the git level
    "i-got-brew" : "../git/index.html",

    // Seventh password is IGOTIT, then they are routed to the snake game
    "IGOTGIT" : "../snake-game/snake.html",

    // Eighth password is IDE, then they are routed to the scratch submission page
    "IDE" : "../scratch-submission/get-auth-token.html",

    // Ninth password is adventure, then they are routed to the end page
    "adventure" : "../navigation/end.html"
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
