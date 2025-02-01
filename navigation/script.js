// Define the passwords for each level
const levelPasswords = {
    "learn": "..binary/index.html",
    "FIONA15": "level2.html",
    "create": "level3.html",
    "innovate": "level4.html",
    "transform": "level5.html",
    "succeed": "level6.html",
    "achieve": "level7.html",
    "win": "level8.html"
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
