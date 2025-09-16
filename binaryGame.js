
// For 3 input fields, the correct answer is 'B', 'I', 'T' (from the binary message)
const correctAnswer = ['B', 'I', 'T'];

// Function to check if the input matches the correct answer

function checkAnswer() {
    let userAnswer = [];
    const allowed = ['B', 'I', 'T'];
    for (let i = 1; i <= 3; i++) {
        const inputElem = document.getElementById('input' + i);
        if (!inputElem) {
            alert('Input box #' + i + ' is missing from the page.');
            return;
        }
        const val = inputElem.value.trim();
        if (!allowed.includes(val)) {
            // Reject if not exactly B, I, or T (uppercase)
            showAccessDeniedModal && showAccessDeniedModal();
            return;
        }
        userAnswer.push(val);
    }

    const feedbackMessage = document.getElementById("feedback-message");
    const nextLevelButton = document.getElementById("next-level-btn");

    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        feedbackMessage.textContent = "";
        feedbackMessage.classList.add("hidden");
        if (nextLevelButton) {
            nextLevelButton.style.display = "inline-block";
            nextLevelButton.classList.remove("hidden");
        }
    } else {
        feedbackMessage.textContent = "Oops! That's incorrect. Try again!";
        feedbackMessage.style.color = "red";
        feedbackMessage.classList.remove("hidden");
        if (nextLevelButton) {
            nextLevelButton.style.display = "none";
            nextLevelButton.classList.add("hidden");
        }
    }
}

// Bind the check button to the checkAnswer function
document.getElementById('check-btn').addEventListener('click', checkAnswer);

// Function to handle the "Next Level" button click
function nextLevel() {
    // Show custom modal instead of alert
    var modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        // fallback
    window.location.href = "PasswordPortal.html";
    }
}

function closeModal() {
    var modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.display = 'none';
    window.location.href = "PasswordPortal.html";
    }
}
