const correctOrder = [1, 5, 9, 4, 3];
const blinkOrder = [2, 7, 6, 8, 10];

let web_electic;
let vr_electic;

let buffer_order = "";

let currentIndex = 0;
let timeLeft = 30;
let timer;
let timerStarted = false;


function set_electic(){
    web_electic = gameData[seed].web_electic;
    vr_electic = gameData[seed].vr_electic;
}


function startBlinking(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('blinking');
}

function stopBlinking(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.remove('blinking');
}

function startTimer() {
    document.getElementById('timer').textContent = `${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `${timeLeft}`;
        if (timeLeft <= 0) {
            resetGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    startTimer();
}

function handleClick(buttonNumber) {
    const clickedButton = document.getElementById(`btn${buttonNumber}`);

    buffer_order += buttonNumber;
    console.log(buffer_order);

    if (clickedButton.classList.contains('green')) {
        return;
    }

    if(!web_electic){
        return;
    }

    let index = web_electic.findIndex(item => item.startsWith(buffer_order));

    if (index == -1){
        buffer_order = "";
        resetGame();
        console.log(index)
    }
    else {
        console.log(index);
        clickedButton.classList.add('green');
        document.getElementById(`indicator${currentIndex + 1}`).classList.add('green');

        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.remove('blinking');
        });
        
        if (!timerStarted) {
            timerStarted = true;
            startTimer();
        }
        
        if (currentIndex < 5) {
            startBlinking(`btn${vr_electic[index][currentIndex]}`);
            resetTimer();
        }
        currentIndex++;
    }

    // if (buttonNumber === correctOrder[currentIndex]) {
    //     clickedButton.classList.add('green');
    //     document.getElementById(`indicator${currentIndex + 1}`).classList.add('green');
    //     stopBlinking(`btn${blinkOrder[currentIndex]}`);
    //     currentIndex++;

    //     if (currentIndex === 1 && !timerStarted) {
    //         timerStarted = true;
    //         startTimer();
    //     }

    //     if (currentIndex < correctOrder.length) {
    //         startBlinking(`btn${blinkOrder[currentIndex]}`);
    //         resetTimer();
    //     } else {
    //         document.getElementById("message").textContent = "Complete!";
    //         document.getElementById("message").classList.add('show');
    //         clearInterval(timer);
    //     }
    // } else {
    //     resetGame();
    // }
}

function resetGame() {
    currentIndex = 0;
    timeLeft = 30;
    timerStarted = false;
    buffer_order = "";
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

    // startBlinking(`btn${blinkOrder[currentIndex]}`);

    // const messageElement = document.getElementById("message");
    // messageElement.textContent = "Reset!";
    // messageElement.classList.add('show');
    // setTimeout(() => {
    //     messageElement.classList.add('fade-out');
    //     setTimeout(() => {
    //         messageElement.classList.remove('show', 'fade-out');
    //     }, 1000);
    // }, 3000);
}