let selectedImage = null;
const gridSize = 9; // Number of grid items (3x3 grid)
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

const imagePositions = [...imagePositionsReal]; // Clone the original positions for shuffling

// Shuffle the images at the start of the game
shuffleImages();

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
        }, 1000); // Delay the win message by 1 second
    }
}

function normalizeBackgroundPosition(pos) {
    const [x, y] = pos.split(' ');
    const xPos = x.includes('px') ? (parseFloat(x) / img.clientWidth) * 100 + '%' : x;
    const yPos = y.includes('px') ? (parseFloat(y) / img.clientHeight) * 100 + '%' : y;
    return `${xPos} ${yPos}`;
}

function displayWinMessage() {
    //Win message
    const winMessageContainer = document.createElement('div');
    winMessageContainer.style.position = 'fixed';
    winMessageContainer.style.top = '50%';
    winMessageContainer.style.left = '50%';
    winMessageContainer.style.transform = 'translate(-50%, -50%)';
    winMessageContainer.style.padding = '20px';
    winMessageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    winMessageContainer.style.color = '#fff';
    winMessageContainer.style.borderRadius = '8px';
    winMessageContainer.style.textAlign = 'center';
    winMessageContainer.style.zIndex = '1000';

    const winText = document.createElement('p');
    winText.innerText = 'Congratulations!';
    winText.style.margin = '0 0 10px 0';
    winMessageContainer.appendChild(winText);

    //Button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.style.padding = '10px 20px';
    nextButton.style.backgroundColor = '#4CAF50';
    nextButton.style.color = '#fff';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '4px';
    nextButton.style.cursor = 'pointer';
    nextButton.addEventListener('click', function() {

    });
    winMessageContainer.appendChild(nextButton);

    document.body.appendChild(winMessageContainer);
}

function disableImageSwapping() {
    document.querySelectorAll('.image').forEach(img => {
        img.removeEventListener('click', imageClickHandler);
        img.style.cursor = 'default';
    });
}
