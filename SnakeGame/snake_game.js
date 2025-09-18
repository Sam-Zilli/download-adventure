// Set up the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game parameters
const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let score = 0;

// Snake game variables
let snake = [{ x: 100, y: 100 }];
let direction = 'right';
let food = {};

// Initialize game
function init() {
    score = 0;
    snake = [{ x: 100, y: 100 }];
    direction = 'right';
    spawnFood();
    gameLoop();
}

// Draw the game elements (snake, food, score)
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'blue'; // Head is green, body is blue
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Display the score
    document.getElementById('score').textContent = `Score: ${score}`;
    
    // If the score is 5 or more, show the next page button
    if (score >= 5) {
        document.getElementById('nextPageButton').style.display = 'block';
    }
}

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'right':
            head.x += gridSize;
            break;
    }

    // Check if the snake hits the wall or itself
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight || isCollidingWithSnake(head)) {
        return false; // Game over
    }

    snake.unshift(head); // Add new head
    if (head.x === food.x && head.y === food.y) {
        // Snake ate food (gain points)
        score += 1;
        spawnFood(); // Spawn new food
    } else {
        snake.pop(); // Remove tail
    }

    return true;
}

// Check if the snake's head collides with its body
function isCollidingWithSnake(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Spawn a new food item at a random position
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize
    };
}

// Listen to arrow key inputs for controlling the snake
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Main game loop
function gameLoop() {
    if (!moveSnake()) {
        alert('Game Over! Final Score: ' + score);
        init(); // Restart the game
        return;
    }
    draw();
    setTimeout(gameLoop, 100); // Repeat every 100ms
}

// Function to handle "Next Page" button click
function goToNextPage() {
    window.location.href = "../vs-code/index.html"; // Redirect to the next page
}

// Start the game
init();
