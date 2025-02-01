const correctAnswer = ['F', 'I', 'O', 'N', 'A', '1', '5']; 

// Function to check if the input matches the correct answer
function checkAnswer() {
    let userAnswer = [];
    for (let i = 1; i <= 7; i++) {
        userAnswer.push(document.getElementById('input' + i).value.trim());
    }

    const feedbackMessage = document.getElementById("feedback-message");
    const nextLevelButton = document.getElementById("next-level-btn");

    // Check if all inputs match the correct answer
    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        feedbackMessage.textContent = "Correct!";
        feedbackMessage.style.color = "green";
        feedbackMessage.classList.remove("hidden");

        // Show the "Next Level" button
        nextLevelButton.classList.remove("hidden");
    } else {
        feedbackMessage.textContent = "Oops! That's incorrect. Try again!";
        feedbackMessage.style.color = "red";
        feedbackMessage.classList.remove("hidden");

        // Hide the "Next Level" button if the answer is incorrect
        nextLevelButton.classList.add("hidden");
    }
}

// Bind the check button to the checkAnswer function
document.getElementById('check-btn').addEventListener('click', checkAnswer);

// Function to handle the "Next Level" button click
function nextLevel() {
    alert("Enter FIONA15 on the next page to proceed.")

    // Optionally, hide the "Next Level" button again
    window.location.href = "../navigation/levels.html";
}
