const player = document.getElementById('player');
const fallingBox = document.getElementById('falling-box');
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameOver = false;

let playerPosition = 150; // Initial position of the player
const playerSpeed = 15; // Speed of the player movement
const fallingBoxSpeed = 3; // Speed of falling box

// Controls the player movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= playerSpeed;
    } else if (e.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += playerSpeed;
    }
    player.style.left = `${playerPosition}px`;
});

// Function to reset falling box
function resetFallingBox() {
    const randomX = Math.floor(Math.random() * 370);
    fallingBox.style.left = `${randomX}px`;
    fallingBox.style.top = '-30px'; // Start from top
}

// Main game loop
function gameLoop() {
    if (gameOver) return;

    // Move the falling box down
    let boxTop = parseInt(fallingBox.style.top.replace('px', ''));
    boxTop += fallingBoxSpeed;
    fallingBox.style.top = `${boxTop}px`;

    // Check if the falling box hits the player
    if (
        boxTop >= 550 &&
        boxTop <= 570 &&
        parseInt(fallingBox.style.left.replace('px', '')) >= playerPosition &&
        parseInt(fallingBox.style.left.replace('px', '')) <= playerPosition + 50
    ) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        resetFallingBox();
    }

    // If the box falls below the screen without being caught
    if (boxTop >= 600) {
        gameOver = true;
        alert('Game Over! Your score: ' + score);
    }

    requestAnimationFrame(gameLoop); // Keep the game running
}

// Initialize the game
resetFallingBox();
gameLoop();
