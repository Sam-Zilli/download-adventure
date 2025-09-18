const commandInput = document.getElementById('command-input');
const outputArea = document.getElementById('output');
const currentTaskElement = document.getElementById('current-task');
const tasksElement = document.getElementById('tasks');
const quizSection = document.getElementById('quiz');
const nextPageButton = document.getElementById('nextPageButton'); // A button that will lead to the next page after quiz success
const instructionsModal = document.getElementById('instructionsModal');
const startTerminalButton = document.getElementById('startTerminal');

// Modal functionality
let terminalStarted = false;
let lsQuizShown = false;

// Show modal on page load and disable terminal input
function initializePage() {
    instructionsModal.style.display = 'block';
    commandInput.disabled = true;
    commandInput.style.opacity = '0.5';
}

// Start terminal functionality
function startTerminal() {
    instructionsModal.style.display = 'none';
    commandInput.disabled = false;
    commandInput.style.opacity = '1';
    commandInput.focus();
    terminalStarted = true;
    
    // Initialize tasks
    updateTaskList();
}

// Add event listener for start button
startTerminalButton.addEventListener('click', startTerminal);

// Initialize page on load
window.addEventListener('DOMContentLoaded', initializePage);

// List of simulated files in the current directory
let files = ["document.txt", "code.js", "image.png"];  // No codingIsFun.txt initially
let hiddenFiles = [".hidden_file"];  // Hidden files (not shown by default)
let directories = []  // Simulated list of directories

// Track current directory
let currentDirectory = "/home/student";  // Start in the root directory

// Task list with new tasks
const tasks = [
    {
        name: "1. Create a file called codingIsFun.txt", 
        command: "touch codingIsFun.txt", 
        completed: false
    },
    {
        name: "2. Create a new directory called lies", 
        command: "mkdir lies", 
        completed: false
    },
    {
        name: "3. Move codingIsFun.txt into the lies directory", 
        command: "mv codingIsFun.txt lies", 
        completed: false
    },
    {
        name: "4. Rename the 'lies' directory to 'truths'", 
        command: "mv lies truths", 
        completed: false
    },
    {
        name: "5. Clear the screen using the 'clear' command", 
        command: "clear", 
        completed: false
    },
    { 
        name: "6. Use the 'ls' command to see what's in this directory.", 
        command: "ls", 
        completed: false
    },
    { 
        name: "7. Use the 'ls -a' command to see all files, including hidden ones!!!", 
        command: "ls -a", 
        completed: false
    },
    { 
        name: "8. Use the 'less' command to open a hidden file and get the password", 
        command: "less .hidden_file", 
        completed: false
    }
];

// Function to simulate terminal command output
function printToOutput(text) {
    const outputElement = document.createElement('div');
    outputElement.textContent = text;
    outputArea.appendChild(outputElement);
    outputArea.scrollTop = outputArea.scrollHeight; // Scroll to bottom
}

// Function to update task list in the UI
function updateTaskList() {
    tasksElement.innerHTML = '';
    const currentTask = tasks.find(t => !t.completed); // Find the first incomplete task
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        if (task.completed) {
            li.classList.add('completed');
        } else if (task === currentTask) {
            li.classList.add('current-task'); // Highlight the current task
        }
        tasksElement.appendChild(li);
    });
}

// Function to handle task completion
function handleTaskCompletion(taskName) {
    const task = tasks.find(t => t.command === taskName);
    if (task && !task.completed) {
        task.completed = true;
        updateTaskList(); // Update the task list UI
        const nextTask = tasks.find(t => !t.completed);
        if (!nextTask) {
            // All tasks completed - show completion message in the current task area
            currentTaskElement.textContent = "You've completed all tasks! SCROLL DOWN";
            showQuiz();  // Show the quiz once all tasks are completed
        }
    }
}

// Handling command execution
function handleCommand(command) {
    const commandParts = command.trim().split(" ");
    const mainCommand = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);

    // Allow the 'clear' command to work at any time
    if (mainCommand === "clear") {
        outputArea.innerHTML = ''; // Clear the terminal screen
        handleTaskCompletion("clear");
        return;
    }

    // Only allow the user to proceed if the current task is completed
    const currentTask = tasks.find(t => !t.completed);
    if (currentTask && !currentTask.command.includes(mainCommand)) {
        printToOutput("You must complete the current task first before proceeding.");
        return;
    }

    switch (mainCommand) {
        case "touch":
            // Simulate creating a file
            if (args[0] === "codingIsFun.txt") {
                files.push("codingIsFun.txt");
                // printToOutput("File 'codingIsFun.txt' created.");
                handleTaskCompletion("touch codingIsFun.txt");
            }
            break;
        case "ls":
            if (args.length === 0) {
                // Show both files and directories
                printToOutput([...files, ...directories].join("\n"));
                
                // Show quiz after first ls command
                if (!lsQuizShown) {
                    lsQuizShown = true;
                    setTimeout(() => {
                        showLsQuiz();
                    }, 500);
                } else {
                    handleTaskCompletion("ls");
                }
            } else if (args[0] === "-a") {
                // Show both files, hidden files, and directories
                printToOutput([...files, ...hiddenFiles, ...directories].join("\n"));
                handleTaskCompletion("ls -a");
            } else {
                printToOutput(`ls: cannot access '${args[0]}': No such file or directory`);
            }
            break;
        case "pwd":
            printToOutput(currentDirectory);  // Show current directory
            handleTaskCompletion("pwd");
            break;
        case "mkdir":
            if (args[0] === "lies") {
                if (!directories.includes("lies")) {  // Only create if "lies" doesn't exist
                    directories.push("lies");
                    // printToOutput("Directory 'lies' created.");
                    handleTaskCompletion("mkdir lies");
                } else {
                    printToOutput("mkdir: cannot create directory 'lies': File exists");
                }
            }
            break;
        case "mv":
            if (args[1] === "lies") {
                // Simulate moving codingIsFun.txt into lies directory
                const fileIndex = files.indexOf("codingIsFun.txt");
                if (fileIndex !== -1) {
                    files.splice(fileIndex, 1); // Remove the file from the current list
                    // printToOutput("codingIsFun.txt moved to lies");
                    handleTaskCompletion("mv codingIsFun.txt lies");
                } else {
                    printToOutput("mv: cannot move 'codingIsFun.txt': No such file");
                }
            } else if (args[1] === "truths") {
                // Simulate renaming the directory 'lies' to 'truths'
                const dirIndex = directories.indexOf("lies");
                if (dirIndex !== -1) {
                    directories[dirIndex] = "truths"; // Rename the directory
                    // printToOutput("Directory 'lies' renamed to 'truths'");
                    handleTaskCompletion("mv lies truths");
                } else {
                    printToOutput("mv: cannot move 'lies': No such directory");
                }
            }
            break;
        case "cd":
            if (args[0] === "lies") {
                if (directories.includes("lies")) {
                    currentDirectory = "/home/student/lies";  // Change to the "lies" directory
                    // printToOutput("Changed directory to /home/student/lies");
                    handleTaskCompletion("cd lies");
                } else {
                    printToOutput("bash: cd: lies: No such directory");
                }
            } else if (args[0] === "truths") {
                if (directories.includes("truths")) {
                    currentDirectory = "/home/student/truths";  // Change to the "truths" directory
                    // printToOutput("Changed directory to /home/student/truths");
                    handleTaskCompletion("cd truths");
                } else {
                    printToOutput("bash: cd: truths: No such directory");
                }
            } else {
                printToOutput(`bash: cd: ${args[0]}: No such file or directory`);
            }
            break;
        case "exit":
            printToOutput("Exiting terminal... (This is just a simulation)");
            break;
        case "less":
            if (args[0] === ".hidden_file") {
                const password = getNextLevelPassword ? getNextLevelPassword() : null;
                if (password) {
                    printToOutput("Password to the next level: " + password);
                } else {
                    printToOutput("Password to the next level: [not set]");
                }
                handleTaskCompletion("less .hidden_file");
                // Show the next page button after password is revealed
                if (nextPageButton) {
                    nextPageButton.style.display = 'inline-block';
                }
            } else {
                printToOutput(`less: '${args[0]}': No such file`);
            }
            break;
        default:
            printToOutput(`command not found: ${mainCommand}`);
            break;
    }
}
// Handle command input and simulate terminal behavior
commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Prevent commands before terminal is started
        if (!terminalStarted) {
            return;
        }
        
        const command = commandInput.value.trim();
        if (command) {
            printToOutput(`$ ${command}`); // Display the entered command
            handleCommand(command); // Process the command
        }
        commandInput.value = ''; // Clear the input field
    }
});

// Show quiz after completing the tasks
function showQuiz() {
    quizSection.style.display = 'block';
    nextPageButton.style.display = 'none'; // Initially hide the next page button
}

// Handle quiz answer submission
function checkQuizAnswer(answer) {
    if (answer === "lists all files") {
        printToOutput("Correct! The '-a' flag lists all files, including hidden files.");
        printToOutput("The password is: -a");
        nextPageButton.style.display = 'inline-block'; // Show next page button
    } else {
        printToOutput("Incorrect! The '-a' flag lists all files, including hidden ones.");
        restartTerminal(); // Restart the terminal if the answer is wrong
    }
}

// Function to restart the terminal if the quiz is answered incorrectly
function restartTerminal() {
    printToOutput("Restarting terminal... Please start over.");
    setTimeout(() => {
        outputArea.innerHTML = ''; // Clear the terminal output
        currentTaskElement.textContent = ""; // Clear the current task display
        tasks.forEach(task => task.completed = false); // Mark all tasks as incomplete
        
        // Reset quiz state
        lsQuizShown = false;
        currentQuizIndex = 0;
        quizCorrectAnswers = 0;
        
        // Reset file system state
        files = ["document.txt", "code.js", "image.png"];
        directories = [];
        
        updateTaskList();
        
        // Re-enable terminal input
        commandInput.disabled = false;
        commandInput.style.opacity = '1';
        commandInput.focus();
    }, 2000); // Wait 2 seconds before restarting
}

// LS Quiz functionality
let lsQuizData = [
    { name: "document.txt", type: "file" },
    { name: "code.js", type: "file" },
    { name: "image.png", type: "file" },
    { name: "truths", type: "directory" }
];
let currentQuizIndex = 0;
let quizCorrectAnswers = 0;

function showLsQuiz() {
    commandInput.disabled = true;
    commandInput.style.opacity = '0.5';
    currentQuizIndex = 0;
    quizCorrectAnswers = 0;
    showNextQuizQuestion();
}

function showNextQuizQuestion() {
    if (currentQuizIndex >= lsQuizData.length) {
        completeLsQuiz();
        return;
    }

    const item = lsQuizData[currentQuizIndex];
    const quizModal = document.getElementById('lsQuizModal');
    const questionElement = document.getElementById('lsQuizQuestion');
    
    questionElement.textContent = `Is "${item.name}" a file or directory?`;
    quizModal.style.display = 'block';
}

function answerLsQuiz(answer) {
    const item = lsQuizData[currentQuizIndex];
    const resultElement = document.getElementById('lsQuizResult');
    
    if (answer === item.type) {
        quizCorrectAnswers++;
        resultElement.textContent = "Correct!";
        resultElement.style.color = "#4CAF50";
        
        currentQuizIndex++;
        
        setTimeout(() => {
            resultElement.textContent = "";
            showNextQuizQuestion();
        }, 1500);
    } else {
        resultElement.textContent = `Incorrect. "${item.name}" is a ${item.type}. Restarting terminal...`;
        resultElement.style.color = "#ff4444";
        
        setTimeout(() => {
            const quizModal = document.getElementById('lsQuizModal');
            quizModal.style.display = 'none';
            restartTerminal();
        }, 2000);
    }
}

function completeLsQuiz() {
    const quizModal = document.getElementById('lsQuizModal');
    quizModal.style.display = 'none';
    
    commandInput.disabled = false;
    commandInput.style.opacity = '1';
    commandInput.focus();
    
    printToOutput(`Quiz completed! You got ${quizCorrectAnswers} out of ${lsQuizData.length} correct.`);
    
    // Complete the ls task
    handleTaskCompletion("ls");
}


// Dynamically get the next level's password from constants.js
function getNextLevelPassword() {
    if (typeof getLevelInfo === 'function') {
        // Use the full path as in constants.js
        const info = getLevelInfo('/Terminal/Terminal.html');
        if (info && info.next) {
            return info.next.password;
        }
    }
    return null;
}

// Function to navigate to the next page
function goToNextPage() {
    if (typeof getLevelInfo === 'function') {
        const info = getLevelInfo('/Terminal/Terminal.html');
        if (info && info.next) {
            window.location.href = info.next.file;
            return;
        }
    }
    window.location.href = "../PasswordPortal/PasswordPortal.html"; // fallback
}

// Attach click event for next page button
nextPageButton.addEventListener('click', goToNextPage);

// Show quiz after completing the tasks
function showQuiz() {
    quizSection.style.display = 'block';
    nextPageButton.style.display = 'none'; // Initially hide the next page button
    // Show the password dynamically if needed
    const password = getNextLevelPassword();
    if (password) {
        printToOutput("The password is: " + password);
    }
}
