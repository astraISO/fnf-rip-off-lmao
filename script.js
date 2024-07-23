let score = 0;
let activeArrow;
let gameInterval;
let chart = [
    { time: 1000, arrow: 'arrow-up' },
    { time: 2000, arrow: 'arrow-down' },
    { time: 3000, arrow: 'arrow-left' },
    { time: 4000, arrow: 'arrow-right' },
    { time: 5000, arrow: 'arrow-up' },
    { time: 6000, arrow: 'arrow-down' }
];
let chartIndex = 0;
let music = document.getElementById('background-music');
let countdownElem = document.getElementById('countdown');
let countdownTime = 3;

document.getElementById('start-game-btn').addEventListener('click', startCountdown);

function startCountdown() {
    document.getElementById('start-game-btn').style.display = 'none';
    countdownElem.style.display = 'block';
    countdownElem.textContent = countdownTime;
    let countdownInterval = setInterval(() => {
        countdownTime--;
        if (countdownTime > 0) {
            countdownElem.textContent = countdownTime;
        } else {
            clearInterval(countdownInterval);
            countdownElem.style.display = 'none';
            startGame();
        }
    }, 1000);
}

function startGame() {
    document.getElementById('score').textContent = 'Score: 0';
    score = 0;
    chartIndex = 0;
    music.play();
    gameInterval = setInterval(updateGame, 100);
    window.addEventListener('keydown', checkKeyPress);
}

function updateGame() {
    let currentTime = music.currentTime * 1000; // Convert to milliseconds
    if (chartIndex < chart.length && currentTime >= chart[chartIndex].time) {
        activateArrow(chart[chartIndex].arrow);
        chartIndex++;
    }
}

function activateArrow(arrow) {
    if (activeArrow) {
        document.getElementById(activeArrow).classList.remove('active');
    }
    activeArrow = arrow;
    document.getElementById(activeArrow).classList.add('active');
}

function checkKeyPress(event) {
    let keyPressed;
    switch (event.key) {
        case 'ArrowUp':
            keyPressed = 'arrow-up';
            break;
        case 'ArrowDown':
            keyPressed = 'arrow-down';
            break;
        case 'ArrowLeft':
            keyPressed = 'arrow-left';
            break;
        case 'ArrowRight':
            keyPressed = 'arrow-right';
            break;
    }
    if (keyPressed === activeArrow) {
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById(activeArrow).classList.remove('active');
        activeArrow = null;
    }
}