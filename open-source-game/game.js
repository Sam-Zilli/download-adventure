const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const nextPageButton = document.getElementById('nextPageButton');
const startModal = document.getElementById('startModal');
const startButton = document.getElementById('startButton');

let score = 0;
let isGameRunning = false;
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    speed: 10,
    dx: 0
};

const items = [];
const openSourceTerms = [
    'Linux',
    'Firefox',
    'Community Support',
    'Free to Use',
    'Modifiable',
    'Transparent',
    'VLC Media Player',
    'Python',
    'Git'
];

const proprietaryTerms = [
    'Microsoft Windows',
    'Adobe Photoshop',
    'Paid License',
    'Closed Source',
    'Vendor Lock-in',
    'macOS',
    'Microsoft Office',
    'No Modifications'
];

const itemSpeed = 2;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawItems() {
    items.forEach(item => {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(item.text, item.x, item.y);
    });
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    detectWalls();
}

function detectWalls() {
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function update() {
    if (!isGameRunning) return;

    clear();
    drawPlayer();
    drawItems();
    newPos();
    updateItems();
    requestAnimationFrame(update);
}

function updateItems() {
    if (Math.random() < 0.02) {
        const isGood = Math.random() > 0.5;
        const type = isGood ? 'Open Source' : 'Proprietary';
        const text = isGood ? openSourceTerms[Math.floor(Math.random() * openSourceTerms.length)] : proprietaryTerms[Math.floor(Math.random() * proprietaryTerms.length)];
        items.push({
            x: Math.random() * canvas.width,
            y: 0,
            type: type,
            text: text
        });
    }

    items.forEach((item, index) => {
        item.y += itemSpeed;
        if (item.y > canvas.height) {
            items.splice(index, 1);
        }

        if (
            player.x < item.x + ctx.measureText(item.text).width &&
            player.x + player.width > item.x &&
            player.y < item.y + 20 &&
            player.y + player.height > item.y
        ) {
            if (item.type === 'Open Source') {
                score++;
            } else {
                score--;
            }
            scoreElement.textContent = 'Score: ' + score;
            items.splice(index, 1);
            if (score >= 10) {
                nextPageButton.style.display = 'block';
            }
        }
    });
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        player.dx = 0;
    }
}

function goToNextPage() {
    window.location.href = '../WhatIsProprietarySoftware.html';
}

function startGame() {
    isGameRunning = true;
    startModal.style.display = 'none';
    update();
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
startButton.addEventListener('click', startGame);

// Draw initial player state
drawPlayer();
