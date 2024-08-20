
// var file1 = document.querySelector("#file_1");

// file1.addEventListener("click", popup);

// function popup(){
//     console.log('hello1');
//     var file_popup = document.querySelector("#file1_popup");
//     console.log('hello2');
//     file_popup.dataset.view = '1';
//     console.log('hello3');
// }

function openWindow(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

const pipeList = [
    '/pipe/pipe1.png',
    '/pipe/pipe2.png',
    '/pipe/pipe3.png',
    '/pipe/pipe4.png'
];

const pipe_line_up = [2, 3, 2,
                      3, 2, 4,
                      1, 3, 2];

const pipe_code = ['5823', '1642', '1989',
                   '1150', '2117', '0507',
                   '1321', '9768', '1617'];

const pipe_rotate = [180, 90, 0,
                   0, 0, 0,
                   0, 0, 0];

const btn_pipe_container = document.querySelector('.btn_pipe_container');

for (let i = 1; i <= 9; i++) {
    const newNode = document.createElement('div');

    newNode.className = 'pipe';
    newNode.id = `pipe${i}`;

    const img = document.createElement('img');
    img.src = pipeList[pipe_line_up[i - 1] - 1];

    img.style.transform = `rotate(${pipe_rotate[i - 1]}deg)`;

    newNode.setAttribute('data-code', pipe_code[i - 1]);

    newNode.appendChild(img);

    btn_pipe_container.appendChild(newNode);

    newNode.addEventListener('click', () => openWindow('water_supply'));
    newNode.addEventListener('click', () => set_code(i));
}


let correctCode = '1234'; //test_code
let attempts = 0;

function increment(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value < 9) {
        inputBox.value = value + 1;
        inputBox.className = 'input-box noting';
    }
}

function decrement(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value > 0) {
        inputBox.value = value - 1;
        inputBox.className = 'input-box noting';
    }
}

const pipe_board = document.querySelector('.pipe_board');

for (let i = 1; i <= 9; i++) {
    const newNode = document.createElement('div');
    newNode.className = 'pipe_show';
    const img = document.createElement('img');
    img.src = pipeList[pipe_line_up[i - 1] - 1];
    img.style.transform = `rotate(${pipe_rotate[i - 1]}deg)`;
    newNode.appendChild(img);
    pipe_board.appendChild(newNode);
    
}

function set_code(num_pipe){
    const pipes = document.querySelectorAll('.pipe_show');
    let count = 0;

    pipes.forEach(pipe => {
        count++;
        const img = pipe.querySelector('img');
        if (count === num_pipe) {
            img.classList.remove('hidden');
            correctCode = pipe_code[count - 1]
        } else {
            img.classList.add('hidden');
            pipe.classList.add('black-background');
        }
    });

    document.getElementById('digit1').value = 0;
    document.getElementById('digit2').value = 0;
    document.getElementById('digit3').value = 0;
    document.getElementById('digit4').value = 0;

    for (let i = 0; i < 4; i++) {
        let inputBox = document.getElementById('digit' + (i + 1));
        inputBox.className = 'input-box noting';
    }
}

function checkGuess() {
    attempts++;

    let guess = [
        document.getElementById('digit1').value,
        document.getElementById('digit2').value,
        document.getElementById('digit3').value,
        document.getElementById('digit4').value
    ];

    let correctPositions = 0;
    let correctDigits = 0;

    for (let i = 0; i < 4; i++) {
        let inputBox = document.getElementById('digit' + (i + 1));
        if (guess[i] === correctCode[i]) {
            inputBox.className = 'input-box correct';
            correctPositions++;
        } else if (correctCode.includes(guess[i])) {
            inputBox.className = 'input-box misplaced';
            correctDigits++;
        } else {
            inputBox.className = 'input-box wrong';
        }
    }

    if (correctPositions === 4) {
        console.log('Congratulations!');
    } else {
        console.log(`Correct positions: ${correctPositions}, Correct digits (wrong positions): ${correctDigits}`);
    }
}