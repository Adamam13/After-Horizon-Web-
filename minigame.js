const minigames = [
    imageSwapGame,
    spotTheDifferenceGame
];

function getRandomMinigame() {
    const randomIndex = Math.floor(Math.random() * minigames.length);
    return minigames[randomIndex];
}

const possibleImages = [
    '/Minigame/earth_hot.png',
    '/Minigame/Some_organize.png'
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
    // Clear the game area
    const gameArea = document.querySelector('.minigame');
    gameArea.innerHTML = '';

    gameArea.innerHTML = `<div class="image-grid">
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

    const selectedImage = getRandomImage(); // Get a random image
    document.querySelectorAll('.image').forEach((img, index) => {
        img.style.backgroundImage = `url(${selectedImage})`;
        img.style.backgroundPosition = imagePositionsReal[index];
        img.addEventListener('click', imageClickHandler);
        img.style.cursor = 'pointer';
    });
    shuffleImages();
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
            checkWinCondition(); // Check if the images are in the correct order after each swap
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
            disableImageSwapping(); // Disable swapping after the game is won
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


function displayWinMessage() {
    const winMessageContainer = document.getElementById('winMessage');
    winMessageContainer.classList.remove('hidden');
    
    const nextButton = document.getElementById('nextGameButton');
    nextButton.addEventListener('click', function() {
        winMessageContainer.classList.add('hidden');
        const nextGame = getRandomMinigame();
        nextGame();
    });
}

function spotTheDifferenceGame() {
    // Clear the game area
    const gameArea = document.querySelector('.minigame');
    gameArea.innerHTML = '';
    displayWinMessage();

}

// Initialize the first game
window.onload = function() {
    const firstGame = getRandomMinigame();
    firstGame();
};
