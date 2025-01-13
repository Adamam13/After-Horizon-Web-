let currentEventIndex = 0;
const events = [
    ["Event 1", 10, "1234", 10],
    ["Event 2", 10, "5678", 10]
];

function showEvent(eventData) {
    const [eventType, duration, correctCode, gap] = eventData;
    const overlay = document.createElement('div');
    overlay.id = "event-overlay";
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    overlay.innerHTML = `
        <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
            <p>${eventType}: Enter the code within ${duration} seconds</p>
            <input type="text" id="eventInput" placeholder="Enter code" style="margin-bottom: 10px;">
            <button id="submitEventCode">Submit</button>
            <p id="countdownTimer">Time left: ${duration} seconds</p>
        </div>
    `;
    document.body.appendChild(overlay);

    let timeLeft = duration;
    const countdownInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('countdownTimer').textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert('Game Over!');
            overlay.remove();
            startNextEvent(gap);
        }
    }, 1000);

    document.getElementById('submitEventCode').onclick = () => {
        const input = document.getElementById('eventInput').value;
        if (input === correctCode) {
            alert('Correct!');
            clearInterval(countdownInterval);
            overlay.remove();
            startNextEvent(gap);
        } else {
            alert('Incorrect code!');
        }
    };
}

function startNextEvent(delay) {
    currentEventIndex++;
    if (currentEventIndex < events.length) {
        setTimeout(() => showEvent(events[currentEventIndex]), delay * 1000);
    }
}

function startEventSystem() {
    setTimeout(() => {
        if (events.length > 0) {
            showEvent(events[currentEventIndex]);
        }
    }, 10000); // Start after 10 seconds
}

function startGame() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');

    // เริ่มระบบจับเวลา
    startGameTimer();

    // เริ่มระบบอีเวนต์
    startEventSystem();
}
