const minigames = [
    // ไม่อยากเล่นเกมอะไรคอมเมนต์ออกเอานะ
    imageSwapGame,
    spotTheDifferenceGame,
    separateTrash
];

function getRandomMinigame() {
    const randomIndex = Math.floor(Math.random() * minigames.length);
    return minigames[randomIndex];
}

let gameTimer;
let remainingTime = 30;

function initializeGameTimer(duration) {
    remainingTime = duration;
    const timeDisplay = document.getElementById('gameTimerDisplay');

    gameTimer = setInterval(() => {
        remainingTime--;
        timeDisplay.textContent = `Time left: ${remainingTime}s`;

        if (remainingTime <= 0) {
            clearInterval(gameTimer);
            handleTimeExpired();
        }
    }, 1000);
}

function handleTimeExpired() {
    console.log('Time is up!');
    play_minigame();
}


const possibleImages = [
    '/Minigame/earth_hot.png',
    '/Minigame/Some_organize.png',
    '/Minigame/1.png',
    '/Minigame/2.png',
    '/Minigame/3.png',
    '/Minigame/4.png',
    '/Minigame/5.png',
    '/Minigame/6.png',
    '/Minigame/7.png',
    '/Minigame/8.png',
    '/Minigame/9.png',
    '/Minigame/10.png',
    '/Minigame/18.png'
];

let selectedImage = null;
const gridSize = 9; // 3x3
const imagePositionsReal = [
    '0% 0%',
    '50% 0%',
    '100% 0%',
    '0% 50%',
    '50% 50%',
    '100% 50%',
    '0% 100%',
    '50% 100%',
    '100% 100%'
];



const imagePositions = [...imagePositionsReal]; // Clone

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * possibleImages.length);
    return possibleImages[randomIndex];
}

function imageSwapGame() {
    clearInterval(gameTimer);
    // Clear the game area
    const gameArea = document.querySelector('.minigame');
    gameArea.innerHTML = '';

    gameArea.innerHTML = `
            <h1 class="header-text">Complete the swapped images!</h1>
                <div class="image-grid">
					<div class="image" data-index="0" style="background-position: 0 0;"></div>
					<div class="image" data-index="1" style="background-position: 50% 0;"></div>
					<div class="image" data-index="2" style="background-position: 100% 0;"></div>
					<div class="image" data-index="3" style="background-position: 0 50%;"></div>
					<div class="image" data-index="4" style="background-position: 50% 50%;"></div>
					<div class="image" data-index="5" style="background-position: 100% 50%;"></div>
					<div class="image" data-index="6" style="background-position: 0 100%;"></div>
					<div class="image" data-index="7" style="background-position: 50% 100%;"></div>
					<div class="image" data-index="8" style="background-position: 100% 100%;"></div>
				</div>`

    const selectedImage = getRandomImage();
    document.querySelectorAll('.image').forEach((img, index) => {
        img.style.backgroundImage = `url(${selectedImage})`;
        img.style.backgroundPosition = imagePositionsReal[index];
        img.addEventListener('click', imageClickHandler);
        img.style.cursor = 'pointer';
    });
    shuffleImages();
    initializeGameTimer(30);
}

document.querySelectorAll('.image').forEach(img => {
    img.addEventListener('click', imageClickHandler);
});

function imageClickHandler() {
    if (!selectedImage) {
        selectedImage = this;
        this.classList.add('selected');
    } else {
        if (selectedImage !== this) {
            swapImages(selectedImage, this);
            checkWinCondition();
        }
        selectedImage.classList.remove('selected');
        selectedImage = null;
    }
}

function swapImages(img1, img2) {
    const tempPos = img1.style.backgroundPosition;
    img1.style.backgroundPosition = img2.style.backgroundPosition;
    img2.style.backgroundPosition = tempPos;
}

function shuffleImages() {
    const shuffledPositions = imagePositions.sort(() => Math.random() - 0.5);
    document.querySelectorAll('.image').forEach((img, index) => {
        img.style.backgroundPosition = shuffledPositions[index];
    });
}

function checkWinCondition() {
    let isCorrect = true;
    document.querySelectorAll('.image').forEach((img, index) => {
        const currentPos = normalizeBackgroundPosition(img.style.backgroundPosition);
        if (currentPos !== imagePositionsReal[index]) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        setTimeout(() => {
            displayWinMessage();
            disableImageSwapping();
        }, 1000);
    }
}

function normalizeBackgroundPosition(pos) {
    const [x, y] = pos.split(' ');
    const xPos = x.includes('px') ? (parseFloat(x) / img.clientWidth) * 100 + '%' : x;
    const yPos = y.includes('px') ? (parseFloat(y) / img.clientHeight) * 100 + '%' : y;
    return `${xPos} ${yPos}`;
}

function disableImageSwapping() {
    document.querySelectorAll('.image').forEach(img => {
        img.removeEventListener('click', imageClickHandler);
        img.style.cursor = 'default';
    });
}

function addKey() {
    const key = document.querySelector('.key_ea');
    let currentKeyCount = parseInt(key.textContent, 10);
    currentKeyCount++;
    key.textContent = currentKeyCount;    
}


function displayWinMessage() {
    const winMessageContainer = document.getElementById('winMessage');
    winMessageContainer.classList.remove('hidden');
}

function continue_Game(){
    const winMessageContainer = document.getElementById('winMessage');
    winMessageContainer.classList.add('hidden');
    const nextGame = getRandomMinigame();
    
    remainingTime = 30;
    const timeDisplay = document.getElementById('gameTimerDisplay');
    timeDisplay.textContent = `Time left: ${remainingTime}s`;
    nextGame();
    addKey();
}


// Initialize the first game
function play_minigame() {
    remainingTime = 30;
    const timeDisplay = document.getElementById('gameTimerDisplay');
    timeDisplay.textContent = `Time left: ${remainingTime}s`;
    const firstGame = getRandomMinigame();
    firstGame();
};

const btn_enter_minigame = document.querySelector("#enter_minigame");
btn_enter_minigame.addEventListener('click', play_minigame);

function spotTheDifferenceGame() {
    clearInterval(gameTimer);
    // Clear the game area
    const gameArea = document.querySelector('.minigame');
    foundDifferences = [];
    foundDifferencesCount = 0;
    gameArea.innerHTML = '';
    
    gameArea.innerHTML = `
    <h1 class="header-text">Find the differences between the images!</h1>
    <div class="spot-the-difference-container">
        <div class="image-container">
            <img src="" alt="Image 1" class="image_dif" id="image_dif1">
        </div>
        <div class="image-container">
            <img src="" alt="Image 2" class="image_dif" id="image_dif2">
        </div>
    </div>`;

    document.getElementById('image_dif1').addEventListener('click', function (event) {
        detectClick(event, 'image_dif1');
    });
    
    document.getElementById('image_dif2').addEventListener('click', function (event) {
        detectClick(event, 'image_dif2');
    });
    
    const randomPair = imagePairs[Math.floor(Math.random() * imagePairs.length)];
    document.getElementById('image_dif1').src = randomPair.img1;
    document.getElementById('image_dif2').src = randomPair.img2;
    currentDifferences = randomPair.differences;
    initializeGameTimer(30);
}

const imagePairs = [
    { 
        img1: '/Minigame/earth_hot_b.png', 
        img2: '/Minigame/earth_hot.png',
        differences: [
            { x: 50, y: 70, width: 20, height: 20 },
            { x: 10, y: 30, width: 10, height: 6 }
        ]
    },
    { 
        img1: '/Minigame/Some_organize.png', 
        img2: '/Minigame/Some_organize_b.png',
        differences: [
            { x: 55, y: 20, width: 10, height: 15 },
            { x: 25, y: 85, width: 5, height: 5 }
        ]
    }
];
let currentDifferences = [];
let foundDifferences = [];
let foundDifferencesCount = 0;

function detectClick(event, imageId) {
    let img = document.getElementById(imageId);
    let rect = img.getBoundingClientRect();
    let x = ((event.clientX - rect.left) / rect.width) * 100;
    let y = ((event.clientY - rect.top) / rect.height) * 100;
    console.log('live again', x, y);

    for (let i = 0; i < currentDifferences.length; i++) {
        let diff = currentDifferences[i];

        if (foundDifferences.includes(diff)) {
            continue;
        }

        if (x > diff.x && x < diff.x + diff.width && y > diff.y && y < diff.y + diff.height) {
            markDifference(diff);
            foundDifferences.push(diff)
            foundDifferencesCount++;
            checkWinCondition_dif();
        }
    }
}

function markDifference(diff) {
    let img1 = document.getElementById('image_dif1');
    let img2 = document.getElementById('image_dif2');
    let diffMark = document.createElement('div');
    diffMark.className = 'difference';
    diffMark.style.left = diff.x + '%';
    diffMark.style.top = diff.y + '%';
    diffMark.style.width = diff.width + '%';
    diffMark.style.height = diff.height + '%';
    diffMark2 = diffMark.cloneNode();
    img1.parentElement.appendChild(diffMark);
    img2.parentElement.appendChild(diffMark2);
}

function checkWinCondition_dif() {
    if (foundDifferencesCount === currentDifferences.length) {
        setTimeout(() => {
            document.getElementById('winMessage').classList.remove('hidden');
            const differenceMarkers = document.querySelectorAll('.difference');
            differenceMarkers.forEach(marker => marker.remove());
        }, 1000);
        
    }
}



//separateTrash

function separateTrash() {
    clearInterval(gameTimer); // หยุดตัวจับเวลาของมินิเกมก่อนหน้า
    const gameArea = document.querySelector('.minigame');
    gameArea.innerHTML = `
        <h1 class="header-text">เกมแยกขยะ</h1>
        <div id="game-container">
            <div id="score-container">
                <progress id="score-progress" value="0" max="30"></progress>
            </div>
            <div id="game-area">
                <div id="bins">
                    <div class="bin" data-type="organic">ขยะอินทรีย์</div>
                    <div class="bin" data-type="recycle">ขยะรีไซเคิล</div>
                    <div class="bin" data-type="hazardous">ขยะอันตราย</div>
                    <div class="bin" data-type="general">ขยะทั่วไป</div>
                </div>
            </div>
        </div>
    `;

    initializeGameTimer(30); // เรียกใช้ตัวจับเวลาใหม่
    startGame();
}

function startGame() {
    let score = 0;
    const gameArea = document.getElementById('game-area');
    const progressBar = document.getElementById('score-progress');
    
    // เริ่มการสร้างขยะ
    generateTrash();

    function generateTrash() {
        if (progressBar.value < 30) { // สร้างขยะต่อถ้าคะแนนยังไม่เต็ม
            const trash = document.createElement('div');
            trash.classList.add('trash');
            const trashTypes = ['organic', 'recycle', 'hazardous', 'general'];
            const type = trashTypes[Math.floor(Math.random() * trashTypes.length)];
            trash.dataset.type = type;
            trash.style.top = Math.random() * 40 + '%';
            trash.style.left = Math.random() * 80 + '%';
            trash.style.backgroundImage = `url(Minigame/trash/${type}_${Math.floor(Math.random() * 10) + 1}.png)`;
            trash.style.backgroundSize = 'contain';  // ปรับขนาดภาพให้พอดีกับพื้นที่
            trash.style.backgroundRepeat = 'no-repeat';  // ป้องกันการซ้ำของภาพ
            trash.style.backgroundPosition = 'center';  // จัดตำแหน่งภาพให้อยู่ตรงกลาง
            trash.style.backgroundColor = 'transparent'; // ให้พื้นหลังโปร่งใส
            gameArea.appendChild(trash);
            makeDraggable(trash);
            setTimeout(generateTrash, 1000);
        }
    }

    function makeDraggable(element) {
        let shiftX, shiftY;

        function moveAt(pageX, pageY) {
            const gameAreaRect = gameArea.getBoundingClientRect();
            const newLeft = pageX - shiftX - gameAreaRect.left;
            const newTop = pageY - shiftY - gameAreaRect.top;

            if (newLeft >= 0 && newLeft + element.offsetWidth <= gameAreaRect.width) {
                element.style.left = newLeft + 'px';
            }
            if (newTop >= 0 && newTop + element.offsetHeight <= gameAreaRect.height) {
                element.style.top = newTop + 'px';
            }
        }

        element.onmousedown = function(event) {
            shiftX = event.clientX - element.getBoundingClientRect().left;
            shiftY = event.clientY - element.getBoundingClientRect().top;

            element.style.position = 'absolute';
            element.style.zIndex = 1000;

            document.onmousemove = function(event) {
                moveAt(event.pageX, event.pageY);
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
                checkDrop(element);
            };
        };

        element.ondragstart = function() {
            return false;
        };
    }

    function checkDrop(trash) {
        const bins = document.querySelectorAll('.bin');
        const trashRect = trash.getBoundingClientRect();

        bins.forEach(bin => {
            const binRect = bin.getBoundingClientRect();
            if (
                trashRect.right > binRect.left &&
                trashRect.left < binRect.right &&
                trashRect.bottom > binRect.top &&
                trashRect.top < binRect.bottom
            ) {
                score += trash.dataset.type === bin.dataset.type ? 5 : -1;
                updateScore();
                trash.remove();
            }
        });
    }

    function updateScore() {
        progressBar.value = score % 30;
        let keys = 0;
        if (score >= 90) keys = 3;
        else if (score >= 60) keys = 2;
        else if (score >= 30) keys = 1;

        if (score >= 30) { // เมื่อคะแนนเต็ม
            displayMessage('ภาวะโลก ละละละเลิฟยู');
            clearInterval(gameTimer); // หยุดจับเวลา
        }
    }
}

function displayMessage(message) {
    const gameArea = document.querySelector('.minigame');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('win-message');
    messageDiv.innerHTML = `
        <h2>${message}</h2>
        <button onclick="play_minigame()">Next game</button>
    `;
    gameArea.appendChild(messageDiv);
}


