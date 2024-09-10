const correctOrder = [1, 5, 9, 4, 3];
const blinkOrder = [2, 7, 6, 8, 10];
let currentIndex = 0;
let timeLeft = 10;
let timer;
let timerStarted = false;

function startBlinking(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('blinking');
}

function stopBlinking(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.remove('blinking');
}

function startTimer() {
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            resetGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    startTimer();
}

function handleClick(buttonNumber) {
    const clickedButton = document.getElementById(`btn${buttonNumber}`);

    if (clickedButton.classList.contains('green')) {
        return;
    }

    if (buttonNumber === correctOrder[currentIndex]) {
        clickedButton.classList.add('green');
        document.getElementById(`indicator${currentIndex + 1}`).classList.add('green');
        stopBlinking(`btn${blinkOrder[currentIndex]}`);
        currentIndex++;

        if (currentIndex === 1 && !timerStarted) {
            timerStarted = true;
            startTimer();
        }

        if (currentIndex < correctOrder.length) {
            startBlinking(`btn${blinkOrder[currentIndex]}`);
            resetTimer();
        } else {
            document.getElementById("message").textContent = "Complete!";
            document.getElementById("message").classList.add('show');
            clearInterval(timer);
        }
    } else {
        resetGame();
    }
}

function resetGame() {
    currentIndex = 0;
    timeLeft = 10;
    timerStarted = false;
    clearInterval(timer);

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('green');
        button.classList.remove('blinking');
    });

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.classList.remove('green');
    });

    startBlinking(`btn${blinkOrder[currentIndex]}`);

    const messageElement = document.getElementById("message");
    messageElement.textContent = "Reset!";
    messageElement.classList.add('show');
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.classList.remove('show', 'fade-out');
        }, 1000);
    }, 3000);
}

startBlinking(`btn${blinkOrder[currentIndex]}`);