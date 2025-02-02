const sentences = [
    {
        text: "You can always find your Current Directory by typing ___. You can see ALL the contents of the current_directory (even the hidden files) by typing ___.",
        answers: ["pwd", "ls -a"]
    },
    {
        text: "What you may have previously called a 'folder' is also often referred to as ___ in programming. You can make a new one by using the ___ command.",
        answers: ["directory", "mkdir"]
    },
    {
        text: "I would type ___ into the terminal in order to make TWO new directories, one called berklee and one called boco.",
        answers: ["mkdir berklee boco"]
    },
    {
        text: "In 'mkdir berklee boco', 'mkdir' is the ___ and berklee and boco are both ___.",
        answers: ["command", "arguments"]
    }
];

let currentSentenceIndex = 0;

// Function to generate sentence with input fields for blanks
function generateSentence() {
    const sentenceContainer = document.getElementById('sentence-container');
    const currentSentence = sentences[currentSentenceIndex];

    // Create the sentence with multiple input fields for blanks
    let sentenceHTML = currentSentence.text;
    
    // Replace blanks with input fields
    sentenceHTML = sentenceHTML.replace(/___/g, `<input type="text" class="blank" placeholder="Your answer" />`);
    
    sentenceContainer.innerHTML = sentenceHTML;
}

// Function to check the user's answers
function checkAnswer() {
    const userAnswers = Array.from(document.querySelectorAll('.blank')).map(input => input.value.trim());
    const correctAnswers = sentences[currentSentenceIndex].answers.map(answer => answer.toLowerCase());

    const feedbackElement = document.getElementById('feedback');
    let isCorrect = true;

    userAnswers.forEach((userAnswer, index) => {
        if (userAnswer !== correctAnswers[index]) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        feedbackElement.textContent = "Correct! Well done!";
        feedbackElement.classList.remove('incorrect');
        feedbackElement.classList.add('correct');
        
        // Move to next sentence
        currentSentenceIndex++;
        
        if (currentSentenceIndex < sentences.length) {
            setTimeout(() => {
                feedbackElement.textContent = "";
                generateSentence();  // Load the next sentence
            }, 1500);
        } else {
            setTimeout(() => {
                feedbackElement.textContent = "The password is: command";
                feedbackElement.classList.remove('correct');
                feedbackElement.classList.add('incorrect');
                
                // Show the Next button after the last sentence
                document.getElementById('next-btn').style.display = 'inline-block';  // Make the next button visible
            }, 1500);
        }
    } else {
        feedbackElement.textContent = "Oops! That's not correct. Try again!";
        feedbackElement.classList.remove('correct');
        feedbackElement.classList.add('incorrect');
    }
}

// Function to go to the next page
function goToNextPage() {
    window.location.href = "../navigation/levels.html";  // Adjust this URL as needed
}

// Initialize the game with the first sentence
generateSentence();

// Event listener for the submit button
document.getElementById('submit-btn').addEventListener('click', checkAnswer);
