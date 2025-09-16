// Define the levels
const levels = [
    {
        title: "Open Source vs Proprietary Products",
        description: "Drag and drop the draggable examples to their correct category!",
        categories: [
            { id: "open-source", name: "Open Source", correctItems: ["linux", "firefox", "gimp"] },
            { id: "proprietary", name: "Proprietary", correctItems: ["windows", "macos", "adobe-photoshop"] },
        ],
        draggableItems: [
            { id: "linux", name: "Linux", category: "open-source" },
            { id: "windows", name: "Windows", category: "proprietary" },
            { id: "firefox", name: "Firefox", category: "open-source" },
            { id: "macos", name: "macOS", category: "proprietary" },
            { id: "gimp", name: "GIMP", category: "open-source" },
            { id: "adobe-photoshop", name: "Adobe Photoshop", category: "proprietary" },
        ],
    },
    {
        title: "Values",
        description: "Drag and drop the values to their correct category!",
        categories: [
            { id: "open-source", name: "Open Source", correctItems: ["transparency", "collaborative", "community supported"] },
            { id: "proprietary", name: "Proprietary", correctItems: ["customer support", "paid licensing"] },
        ],
        draggableItems: [
            { id: "transparency", name: "transparency - eveyone can view the code", category: "open-source" },
            { id: "customer support", name: "customer support", category: "proprietary" },
            { id: "collaborative", name: "collaborative", category: "open-source" },
            { id: "community supported", name: "community supported", category: "open-source" },
            { id: "paid licensing", name: "paid licensing", category: "proprietary" }
        ],
    },
];

let currentLevel = 0;

// Function to initialize the game with dynamic data
function initializeGame(data) {
    // Set game title and description
    document.getElementById("game-title").textContent = data.title;
    document.getElementById("game-description").textContent = data.description;

    // Create categories
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = ""; // Clear existing categories

    data.categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.id = category.id;
        categoryDiv.classList.add("category");
        categoryDiv.ondrop = drop;
        categoryDiv.ondragover = allowDrop;

        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);
        categoriesContainer.appendChild(categoryDiv);
    });

    // Create draggable items
    const draggableList = document.getElementById("draggable-list");
    draggableList.innerHTML = ""; // Clear existing draggable items

    data.draggableItems.forEach(item => {
        const draggableDiv = document.createElement("div");
        draggableDiv.id = item.id;
        draggableDiv.classList.add("draggable-item");
        draggableDiv.setAttribute("draggable", "true");
        draggableDiv.ondragstart = drag;

        const draggableText = document.createElement("p");
        draggableText.textContent = item.name;
        draggableDiv.appendChild(draggableText);
        draggableList.appendChild(draggableDiv);
    });
}

// Initialize the game with the first level
initializeGame(levels[currentLevel]);

// Allow dragging of draggable items
function allowDrop(event) {
    event.preventDefault();
}

// Start dragging an item
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Handle drop action when an item is dropped into a category
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    // Prevent overlapping by adding the dragged item to the appropriate category directly
    const dropTarget = event.target;

    // Check if the drop target is a category container (to avoid dropping onto the header)
    if (dropTarget.className === 'category') {
        dropTarget.appendChild(draggedElement);
    }
}

// Check if all answers are correct
function checkAnswers() {
    const level = levels[currentLevel];
    const openSourceCorrect = level.categories[0].correctItems;
    const proprietaryCorrect = level.categories[1].correctItems;
    const resultMessage = document.getElementById("result-message");

    const openSourceItems = document.getElementById("open-source").children;
    const proprietaryItems = document.getElementById("proprietary").children;

    let openSourceMatches = 0;
    let proprietaryMatches = 0;

    // Check Open Source category
    for (let i = 0; i < openSourceItems.length; i++) {
        if (openSourceCorrect.includes(openSourceItems[i].id)) {
            openSourceMatches++;
        }
    }

    // Check Proprietary category
    for (let i = 0; i < proprietaryItems.length; i++) {
        if (proprietaryCorrect.includes(proprietaryItems[i].id)) {
            proprietaryMatches++;
        }
    }

    // If all matches are correct, show success message and show "Next" button
    if (openSourceMatches === openSourceCorrect.length && proprietaryMatches === proprietaryCorrect.length) {
        resultMessage.textContent = "Congratulations! You have successfully matched all draggable items!";
        resultMessage.style.color = "green";
        document.getElementById("next-btn").classList.remove("hidden");  // Show the Next button
    } else {
        resultMessage.textContent = "Oops! Some of your matches are incorrect. Try again!";
        resultMessage.style.color = "red";
    }

    resultMessage.classList.remove("hidden");
}

// Proceed to the next level
function nextLevel() {
    currentLevel++; // Move to the next level
    if (currentLevel < levels.length) {
        // Initialize the new level
        initializeGame(levels[currentLevel]);
        document.getElementById("result-message").classList.add("hidden"); // Hide the result message
        document.getElementById("next-btn").classList.add("hidden"); // Hide the Next button
    } else {
        // End of the game
        alert("The password is: together");
        window.location.href = "PasswordPortal.html"; // Redirect to the password page
    }
}

// Attach the nextLevel function to the "Next" button
document.getElementById("next-btn").onclick = nextLevel;
