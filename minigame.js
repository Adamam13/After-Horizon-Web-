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
    const progressBar = document.querySelector("#time-bar");

    progressBar.style.animation = 'none';
    progressBar.offsetHeight;
    progressBar.style.animation = `reduceTime ${duration}s linear forwards`;

    gameTimer = setInterval(() => {
        remainingTime--;
        timeDisplay.textContent = `Time left: ${remainingTime}s`;

        if (remainingTime <= 10) {
            progressBar.style.animation = `flash 1s infinite, reduceTime ${duration}s linear forwards`;
        }

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
    const randomPair = imagePairs[Math.floor(Math.random() * imagePairs.length)];
    let total_diff = randomPair.differences.length;

    gameArea.innerHTML = '';
    
    gameArea.innerHTML = `
    <h1 class="header-text">Find the ${total_diff} differences between the images!</h1>
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
        <h1 class="header-text">Drag and drop the waste into the correct bins!</h1>
        <div id="game-container">
            <div id="score-container">
                <progress id="score-progress" value="0" max="30"></progress>
            </div>
            <div id="game-area">
                <div id="bins">
                    <div class="bin" data-type="organic">
                        <div class="bin-label">Organic</div>
                    </div>
                    <div class="bin" data-type="recycle">
                        <div class="bin-label">Recyclable</div>
                    </div>
                    <div class="bin" data-type="hazardous">
                        <div class="bin-label">Hazardous</div>
                    </div>
                    <div class="bin" data-type="general">
                        <div class="bin-label">General</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    initializeGameTimer(30); // เรียกใช้ตัวจับเวลาใหม่
    startGame();
}

function startGame() {
    let score = 0;
    let trashTypes = ['organic', 'recycle', 'hazardous', 'general'];
    let droppedTrashHistory = [];

    const gameArea = document.getElementById('game-area');
    const progressBar = document.getElementById('score-progress');


    const trashSizes = {
        // 'organic_1.png': { width: 50, height: 50 },
        // 'organic_2.png': { width: 60, height: 60 },
        // 'recycle_1.png': { width: 100, height: 100 }, // ขวดพลาสติกใหญ่
        // 'hazardous_1.png': { width: 40, height: 40 }, // ถ่านไฟฉายเล็ก
        // 'general_1.png': { width: 80, height: 80 },
        // 'organic_1.png': { width: 80, height: 80 },
        // 'organic_2.png': { width: 80, height: 80 },
        // 'organic_3.png': { width: 80, height: 80 },
        'organic_4.png': { width: 80, height: 80 },
        'organic_5.png': { width: 80, height: 80 },
        // 'organic_6.png': { width: 60, height: 60 },
        'organic_7.png': { width: 60, height: 60 },
        'organic_8.png': { width: 60, height: 60 },
        // 'organic_9.png': { width: 80, height: 80 },
        // 'organic_10.png': { width: 80, height: 80 },
        'recycle_1.png': { width: 110, height: 110 },
        // 'recycle_2.png': { width: 70, height: 90 },
        'recycle_3.png': { width: 100, height: 100 },
        // 'recycle_4.png': { width: 100, height: 100 },
        // 'recycle_5.png': { width: 100, height: 100 },
        'recycle_6.png': { width: 90, height: 90 },
        'recycle_7.png': { width: 90, height: 90 },
        'recycle_8.png': { width: 110, height: 110 },
        'recycle_9.png': { width: 90, height: 90 },
        'recycle_10.png': { width: 80, height: 80 },
        'hazardous_1.png': { width: 110, height: 110 },
        'hazardous_2.png': { width: 100, height: 100 },
        // 'hazardous_3.png': { width: 80, height: 80 },
        // 'hazardous_4.png': { width: 80, height: 80 },
        'hazardous_5.png': { width: 80, height: 80 },
        'hazardous_6.png': { width: 120, height: 120 },
        'hazardous_7.png': { width: 80, height: 80 },
        'hazardous_8.png': { width: 60, height: 60 },
        'hazardous_9.png': { width: 100, height: 100 },
        'hazardous_10.png': { width: 90, height: 90 },
        'general_1.png': { width: 80, height: 80 },
        'general_2.png': { width: 60, height: 60 },
        // 'general_3.png': { width: 80, height: 80 },
        // 'general_4.png': { width: 80, height: 80 },
        'general_5.png': { width: 80, height: 80 },
        'general_6.png': { width: 50, height: 50 },
        // 'general_7.png': { width: 80, height: 80 },
        'general_8.png': { width: 60, height: 60 },
        // 'general_9.png': { width: 80, height: 80 },
        'general_10.png': { width: 60, height: 60 },
        // เพิ่มชื่อขยะอื่น ๆ ตามไฟล์ภาพ
    };
    
    // เริ่มการสร้างขยะ
    generateTrash();

    function generateTrash() {
        if (progressBar.value < 30) { // สร้างขยะต่อถ้าคะแนนยังไม่เต็ม
            const trash = document.createElement('div');
            trash.classList.add('trash');
            const type = trashTypes[Math.floor(Math.random() * trashTypes.length)];
            trash.dataset.type = type;
            trash.style.top = Math.random() * 40 + '%';
            trash.style.left = Math.random() * 80 + '%';

            let imageNumber = Math.floor(Math.random() * 10) + 1;
            let trashImageFile = `${type}_${imageNumber}.png`;
            trash.style.backgroundImage = `url(Minigame/trash/${trashImageFile})`;
            
            trash.style.backgroundSize = 'contain';  // ปรับขนาดภาพให้พอดีกับพื้นที่
            trash.style.backgroundRepeat = 'no-repeat';  // ป้องกันการซ้ำของภาพ
            trash.style.backgroundPosition = 'center';  // จัดตำแหน่งภาพให้อยู่ตรงกลาง
            trash.style.backgroundColor = 'transparent'; // ให้พื้นหลังโปร่งใส

            let size = trashSizes[trashImageFile] || { width: 70, height: 70 }; // ค่าเริ่มต้น 70x70 ถ้าไม่มีขนาด
            trash.style.width = size.width + 'px';
            trash.style.height = size.height + 'px';
            trash.style.backgroundSize = 'cover';

            gameArea.appendChild(trash);

            trash.dataset.imageFile = trashImageFile;

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

    // เพิ่มตัวแปรเพื่อเก็บชื่อขยะตามประเภทและภาพ
    const trashNames = {
        'organic_1.png': 'Fruit Peels',
        'organic_2.png': 'Fish Bone',
        'organic_3.png': 'Leaves',
        'organic_4.png': 'Bread Crumbs',
        'organic_5.png': 'Food Leftovers',
        'organic_6.png': 'Leaves',
        'organic_7.png': 'Eggshells',
        'organic_8.png': 'Feces',
        'organic_9.png': 'Apple Core',
        'organic_10.png': 'Flower',
        'recycle_1.png': 'Glass Bdottles',
        'recycle_2.png': 'Steel Cans',
        'recycle_3.png': 'Metal Scraps',
        'recycle_4.png': 'CD Disc',
        'recycle_5.png': 'Milk Cartons',
        'recycle_6.png': 'Newspaper',
        'recycle_7.png': 'Cardboard',
        'recycle_8.png': 'Plastic Bottles',
        'recycle_9.png': 'Plastic Cup',
        'recycle_10.png': 'Plastic Bag',
        'hazardous_1.png': 'Batteries',
        'hazardous_2.png': 'Aerosol Cans',
        'hazardous_3.png': 'Lithium Batteries',
        'hazardous_4.png': 'Syringes',
        'hazardous_5.png': 'Mobile Phones',
        'hazardous_6.png': 'Notebook',
        'hazardous_7.png': 'Light Bulb',
        'hazardous_8.png': 'Nail Polish Bottles',
        'hazardous_9.png': 'Leftover Paint',
        'hazardous_10.png': 'Pesticide Bottles',
        'general_1.png': 'Snack wrappers',
        'general_2.png': 'Chopsticks',
        'general_3.png': 'Foam Box',
        'general_4.png': 'Rubber Gloves',
        'general_5.png': 'Face Masks',
        'general_6.png': 'Rubber Band',
        'general_7.png': 'Snack Bag',
        'general_8.png': 'Plastic straws',
        'general_9.png': 'Tissue paper',
        'general_10.png': 'Toothpicks',
        // เพิ่มชื่อขยะอื่น ๆ ตามไฟล์ภาพ
    };

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

                let isCorrect = trash.dataset.type === bin.dataset.type;

                // ตรวจสอบว่าขยะนี้ถูกบันทึกไปแล้วหรือไม่ ถ้าซ้ำจะไม่บันทึกใหม่
                let isDuplicate = droppedTrashHistory.some(item =>
                    item.imageFile === trash.dataset.imageFile && item.isCorrect === isCorrect
                );

                if (!isDuplicate) {
                    // บันทึกข้อมูลขยะทุกชิ้น
                    droppedTrashHistory.push({
                        trashType: trash.dataset.type,
                        imageFile: trash.dataset.imageFile, // เก็บข้อมูลรูปภาพขยะ
                        isCorrect: isCorrect, // เก็บสถานะว่าทิ้งถูกหรือผิดประเภท
                        trashName: trashNames[trash.dataset.imageFile] || 'ขยะไม่ทราบชื่อ', // ชื่อขยะ
                        droppedIn: bin.dataset.type // เก็บข้อมูลถังที่ถูกทิ้งลงไป
                    });
                }


                score += trash.dataset.type === bin.dataset.type ? 5 : -1;
                updateScore();
                trash.remove();
            }
        });
    }

    function updateScore() {
        progressBar.value = score % 30;
        // let keys = 0;
        // if (score >= 90) keys = 3;
        // else if (score >= 60) keys = 2;
        // else if (score >= 30) keys = 1;

        if (progressBar.value > progressBar.max) {
            progressBar.value = progressBar.max;
        }

        if (score >= 30) { // เมื่อคะแนนเต็ม
            displayMessage('ภาวะโลก ละละละเลิฟยู');
            clearInterval(gameTimer); // หยุดจับเวลา
        }
    }

    function displayMessage(message) {
        const gameArea = document.querySelector('.minigame');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('win-message');
        messageDiv.innerHTML = `
            <div class="popup-content">
                <h2>Summary</h2>
                <div id="trash-summary" class="trash-summary-horizontal"></div> <!-- ตารางแนวนอน -->
                <button id="nextGameButton" onclick="continue_Game()">Next Game</button>
            </div>
        `;
        gameArea.appendChild(messageDiv);
    
        // สร้าง div สำหรับแสดงขยะในถังแต่ละประเภท
        let trashSummary = document.getElementById('trash-summary');
        trashSummary.innerHTML = ''; // ล้างรายการก่อนแสดงผลใหม่
    
        // สลับขยะอันตรายกับขยะทั่วไป โดยขยะอันตราย (hazardous) อยู่ตารางที่ 3 และขยะทั่วไป (general) อยู่ตารางที่ 4
        let categories = ['organic', 'recycle', 'hazardous', 'general']; // สลับตำแหน่ง hazardous กับ general
    
        categories.forEach(category => {
            // สร้าง div สำหรับถังขยะแต่ละประเภท
            let categoryDiv = document.createElement('div');
            categoryDiv.classList.add('trash-category');
            categoryDiv.style.position = 'relative'; // ทำให้ trash-category เป็น relative เพื่อให้ลูกเป็น absolute
    
            let categoryTitle = document.createElement('h4');
            categoryTitle.textContent = getCategoryName(category); // ชื่อของประเภทขยะ
            categoryDiv.appendChild(categoryTitle);
    
            // กรองขยะที่ถูกทิ้งในถังนี้ (ไม่ว่าถูกหรือผิด)
            let filteredTrash = droppedTrashHistory.filter(item => item.droppedIn === category);
    
            filteredTrash.forEach(item => {
                let trashWrapper = document.createElement('div');
                trashWrapper.style.position = 'relative'; // ต้องการให้ตำแหน่งนี้เป็น relative สำหรับการวางกากบาท
    
                let trashImage = document.createElement('img');
                trashImage.src = `Minigame/trash/${item.imageFile}`; // ใช้ชื่อไฟล์ที่เก็บไว้แสดงภาพขยะ
                trashImage.style.width = '70px'; // ขนาดภาพขยะ
                trashImage.style.height = '70px'; // ขนาดภาพขยะ
                trashImage.title = item.trashName; // ใช้ title เพื่อแสดงชื่อขยะเมื่อ hover
    
                trashWrapper.appendChild(trashImage);
    
                // ถ้าขยะถูกทิ้งผิดประเภท แสดงเครื่องหมายกากบาท
                if (!item.isCorrect) {
                    let cross = document.createElement('div');
                    cross.classList.add('cross'); // ใช้คลาส cross ที่กำหนดไว้ด้านบน
                    trashWrapper.appendChild(cross);
                }
    
                categoryDiv.appendChild(trashWrapper); // เพิ่ม trashWrapper ใน categoryDiv
            });
    
            trashSummary.appendChild(categoryDiv); // เพิ่มประเภทขยะในตาราง
        });
    }
}


function getCategoryName(type) {
    switch (type) {
        case 'organic':
            return 'Organic Waste';
        case 'recycle':
            return 'Recyclable Waste';
        case 'general':
            return 'General Waste';
        case 'hazardous':
            return 'Hazardous Waste';
        default:
            return '';
    }
}


