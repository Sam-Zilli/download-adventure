// Allow dragging of software items
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
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Prevent overlapping by adding the dragged item to the appropriate category directly
    var dropTarget = event.target;

    // Check if the drop target is a category container (to avoid dropping onto the header)
    if (dropTarget.className === 'category') {
        dropTarget.appendChild(draggedElement);
    }
}

// Check if all answers are correct
function checkAnswers() {
    var openSourceCorrect = ["collaborative", "free", "open-access"];
    var proprietaryCorrect = ["closed-source", "paid-license", "support"];
    var resultMessage = document.getElementById("result-message");

    var openSourceItems = document.getElementById("open-source").children;
    var proprietaryItems = document.getElementById("proprietary").children;

    var openSourceMatches = 0;
    var proprietaryMatches = 0;

    // Check Open Source category
    for (var i = 0; i < openSourceItems.length; i++) {
        if (openSourceCorrect.includes(openSourceItems[i].id)) {
            openSourceMatches++;
        }
    }

    // Check Proprietary category
    for (var i = 0; i < proprietaryItems.length; i++) {
        if (proprietaryCorrect.includes(proprietaryItems[i].id)) {
            proprietaryMatches++;
        }
    }

    // If all matches are correct, show success message and show "Next" button
    if (openSourceMatches === openSourceCorrect.length && proprietaryMatches === proprietaryCorrect.length) {
        resultMessage.textContent = "Nice! The passowrd for the next level is: collaborate";
        resultMessage.style.color = "green";
        document.getElementById("next-btn").classList.remove("hidden");  // Show the Next button
    } else {
        resultMessage.textContent = "Oops! Some of your matches are incorrect. Try again!";
        resultMessage.style.color = "red";
    }

    resultMessage.classList.remove("hidden");
}
