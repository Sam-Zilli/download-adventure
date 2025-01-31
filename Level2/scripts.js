const commandInput = document.getElementById('command-input');
const outputArea = document.getElementById('output');
const currentTaskElement = document.getElementById('current-task');
const tasksElement = document.getElementById('tasks');
const quizSection = document.getElementById('quiz');
const nextPageButton = document.getElementById('nextPageButton'); // A button that will lead to the next page after quiz success

// List of simulated files in the current directory
const files = ["document.txt", "code.js", "image.png"];

// Task list with instructions
const tasks = [
    { 
        name: "Use the 'ls' command", 
        command: "ls", 
        description: "Complete the first task by using the 'ls' command to list the files in the directory.", 
        completed: false
    },
    { 
        name: "Use the 'ls -a' command", 
        command: "ls -a", 
        description: "Complete the second task by using the 'ls -a' command. The -a is a flag, right?", 
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
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        if (task.completed) {
            li.classList.add('completed');
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
        if (nextTask) {
            currentTaskElement.textContent = nextTask.description;
        } else {
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

    switch (mainCommand) {
        case "ls":
            if (args.length === 0) {
                printToOutput(files.join("\n"));
                handleTaskCompletion("ls");
            } else if (args[0] === "-a") {
                const hiddenFiles = ["hidden_file1", "hidden_file2"];
                printToOutput(files.concat(hiddenFiles).join("\n"));
                handleTaskCompletion("ls -a");
            } else {
                printToOutput(`ls: cannot access '${args[0]}': No such file or directory`);
            }
            break;
        case "clear":
            outputArea.innerHTML = ''; // Clear the terminal screen
            handleTaskCompletion("clear");
            break;
        case "pwd":
            printToOutput("/home/student");
            handleTaskCompletion("pwd");
            break;
        case "exit":
            printToOutput("Exiting terminal... (This is just a simulation)");
            break;
        default:
            printToOutput(`command not found: ${mainCommand}`);
            break;
    }
}

// Handle command input and simulate terminal behavior
commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
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
        currentTaskElement.textContent = tasks[0].description; // Reset to the first task
        tasks.forEach(task => task.completed = false); // Mark all tasks as incomplete
        updateTaskList();
    }, 2000); // Wait 2 seconds before restarting
}

// Function to navigate to the next page
function goToNextPage() {
    window.location.href = "../fill-in-blanks-game/flags-fill-in-blanks.html"; // Change this to the actual next page URL
}

// Initialize task list and display the first prompt
updateTaskList();

// Attach click event for next page button
nextPageButton.addEventListener('click', goToNextPage);
