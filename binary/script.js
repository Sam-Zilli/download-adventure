const correctAnswer = ['F', 'I', 'F', 'I', '1', '5']; 

// Function to check if the input matches the correct answer
function checkAnswer() {
    let userAnswer = [];
    for (let i = 1; i <= 6; i++) {
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
    alert("The password is: bytes")

    window.location.href = "../navigation/levels.html";
}
