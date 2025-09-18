// Expose showNextPasswordModal globally for the Next Level button
window.showNextPasswordModal = function() {
    console.log('[DEBUG] showNextPasswordModal called');
    let password = 'none';
    if (typeof getLevelInfo === 'function') {
        const info = getLevelInfo('/Binary/BinaryIntroAndGame.html');
        console.log('[DEBUG] getLevelInfo result:', info);
        if (info && info.next) password = info.next.password;
    } else {
        console.warn('[DEBUG] getLevelInfo is not a function');
    }
    if (typeof showMatrixModal === 'function') {
        console.log('[DEBUG] showMatrixModal is a function, showing modal with password:', password);
        showMatrixModal({
            title: 'Level Password',
            message: 'The password is: <b style="color:#00ff41;">' + password + '</b>',
            buttonText: 'OK',
            onClose: function() {
                console.log('[DEBUG] Matrix modal closed, redirecting to PasswordPortal');
                window.location.href = "../PasswordPortal/PasswordPortal.html";
            }
        });
    } else {
        console.warn('[DEBUG] showMatrixModal is not a function, falling back to alert. Password:', password);
        alert('The password is: ' + password);
        window.location.href = "../PasswordPortal/PasswordPortal.html";
    }
};

// For 3 input fields, the correct answer is 'B', 'I', 'T' (from the binary message)
const correctAnswer = ['B', 'I', 'T'];

// Function to check if the input matches the correct answer

function checkAnswer() {
    let userAnswer = [];
    const allowed = ['B', 'I', 'T'];
    const feedbackMessage = document.getElementById("feedback-message");
    for (let i = 1; i <= 3; i++) {
        const inputElem = document.getElementById('input' + i);
        if (!inputElem) {
            alert('Input box #' + i + ' is missing from the page.');
            return;
        }
        const val = inputElem.value.trim();
        if (val.length === 0 || !allowed.includes(val)) {
            feedbackMessage.textContent = "Incorrect. Try Again.";
            feedbackMessage.style.color = "red";
            feedbackMessage.classList.remove("hidden");
            return;
        }
        userAnswer.push(val);
    }

    const nextLevelButton = document.getElementById("next-level-btn");

    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        feedbackMessage.textContent = "";
        feedbackMessage.classList.add("hidden");
        if (nextLevelButton) {
            nextLevelButton.style.display = "inline-block";
            nextLevelButton.classList.remove("hidden");
        }
    } else {
        feedbackMessage.textContent = "Incorrect. Try Again.";
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


