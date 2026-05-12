// JavaScript Logic
const target = document.getElementById('target');
const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const message = document.getElementById('message');
const finalScoreText = document.getElementById('final-score');

let score = 0;
let timeLeft = 30;
let gameActive = false;
let timerInterval;

// Square ko random jagah par move karne ka function
function moveTarget() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const targetSize = 50;

    const maxX = containerWidth - targetSize;
    const maxY = containerHeight - targetSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
}

// Target click event
target.addEventListener('mousedown', function() {
    if (!gameActive) return;

    score++;
    scoreDisplay.innerText = score;
    moveTarget();
});

// Touch support for mobiles
target.addEventListener('touchstart', function(e) {
    e.preventDefault();
    if (!gameActive) return;

    score++;
    scoreDisplay.innerText = score;
    moveTarget();
});

// Game start function
function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;
    startBtn.style.display = 'none';
    message.style.display = 'none';
    target.style.display = 'block';
    moveTarget();

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Game end function
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    target.style.display = 'none';
    startBtn.style.display = 'block';
    startBtn.innerText = 'Restart';
    
    finalScoreText.innerText = score;
    message.style.display = 'block';
    message.style.background = '#ef4444'; // Red color for end
}

startBtn.addEventListener('click', startGame);

// Initial setup
target.style.display = 'none';