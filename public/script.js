
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

function CnO_Window(id_close, id_open){
    document.getElementById(id_close).style.display = 'none';
    document.getElementById(id_open).style.display = 'flex';
}

const pipeList = [
    'pipe/pipe1.png',
    'pipe/pipe2.png',
    'pipe/pipe3.png',
    'pipe/pipe4.png'
];

const pipe_line_up = [2, 3, 2,
                      3, 2, 4,
                      1, 3, 2];

const pipe_code = ['5823', '1642', '1989',
                   '1150', '2117', '0507',
                   '1321', '9768', '1617'];

let pipe_save = [0, 0, 0,
                0, 0, 0,
                0, 0, 0];

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

    newNode.addEventListener('click', () => CnO_Window('select_pipe', 'water_supply'));
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
    else {
        inputBox.value = 0;
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
    else {
        inputBox.value = 9;
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

    if (pipe_save[num_pipe - 1] == 1){

        document.getElementById('digit1').value = correctCode[0];
        document.getElementById('digit2').value = correctCode[1];
        document.getElementById('digit3').value = correctCode[2];
        document.getElementById('digit4').value = correctCode[3];
    
        for (let i = 0; i < 4; i++) {
            let inputBox = document.getElementById('digit' + (i + 1));
            inputBox.className = 'input-box correct';
        }
    }
    else {
        document.getElementById('digit1').value = 0;
        document.getElementById('digit2').value = 0;
        document.getElementById('digit3').value = 0;
        document.getElementById('digit4').value = 0;
    
        for (let i = 0; i < 4; i++) {
            let inputBox = document.getElementById('digit' + (i + 1));
            inputBox.className = 'input-box noting';
        }
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
    // console.log(pipe_code.indexOf(correctCode));

    if (correctPositions === 4) {
        console.log('Congratulations!');
        pipe_save[pipe_code.indexOf(correctCode)] = 1;

        document.getElementById(`pipe${pipe_code.indexOf(correctCode) + 1}`).classList.add("pipe_fin");

        // console.log(pipe_save[pipe_code.indexOf(correctCode)]);
    } else {
        console.log(`Correct positions: ${correctPositions}, Correct digits (wrong positions): ${correctDigits}`);
    }
}

//key unlock



// ลากหัวคมๆ

let zIndexCounter = 1;

document.querySelectorAll('.window').forEach(windowElement => {
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
        windowElement.style.position = 'absolute';

        zIndexCounter += 1;
        windowElement.style.zIndex = zIndexCounter; 
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

function closeAllWindows() {
    const allWindows = document.querySelectorAll('.window');

    allWindows.forEach(window => {
        window.style.display = 'none';
    });
}



let keys = 3;
let lockedFiles = {
    //folder1
    'file-info-carrot': true,
    'file-info-tomato': true,
    'file-hint-PT': true,
    'file-part1': true,
    'file-hint-Phum': true,
    'file-part3': true,
    'file-info-rice': true,

    //folder2
    'file-info-pumpkin': true,
    'file-hint-OT': true,
    'file-part2': true,
    'file-info-radish': true,
    'file-hint-Water': true,
    'file-part4' : true,

    //readme
    'file-info-elec': false,
    'file-info-phum': false,
    'file-info-oxygen': false,
    'file-info-farm': false,
    'file-info-guied': false
};


//comfirm to use key
function confirmUnlock(fileId, folderId) {
    keys = document.querySelector('.key_ea').textContent;
    document.getElementById('unlock_confirmation').style.display = 'flex';
    document.getElementById('unlock_confirmation').dataset.fileId = fileId;
    document.getElementById('unlock_confirmation').dataset.folderId = folderId;

}

function useKey() {
    let fileId = document.getElementById('unlock_confirmation').dataset.fileId;
    let folderId = document.getElementById('unlock_confirmation').dataset.folderId;

    if(keys > 0){
        keys--;
        document.querySelector('.key_ea').textContent = keys;
    
        lockedFiles[fileId] = false;
    
        closeWindow(folderId);
    
        CnO_Window('unlock_confirmation', fileId);
    }


}

function openFile(fileId, folderId) {
    if (!lockedFiles[fileId]) {
        CnO_Window(folderId, fileId);
    } else {
        confirmUnlock(fileId, folderId);
    }
}



function showMenu() {
    document.getElementById('menu-page').classList.remove('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
}

function startGame() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
}

function showSummary() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('summary-page').classList.remove('hidden');
}

function showThank() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('thankyou-page').classList.remove('hidden');
}

function check_nextDay_code(){
    if (document.getElementById('code1').value == 5 && document.getElementById('code2').value == 0){
        showThank();
    }
}


document.getElementById('start-game-button').addEventListener('click', startGame);

document.getElementById('close').addEventListener('click', showSummary);

document.getElementById('continue-button').addEventListener('click', check_nextDay_code);
document.getElementById('back-button').addEventListener('click', startGame);

//random file **not now**

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// function shuffleFolders() {
//     const folder1 = document.querySelector('.folder1-body');
//     const folder2 = document.querySelector('.folder2-body');

//     const folder1Icons = Array.from(folder1.querySelectorAll('.icon_wrapper'));
//     const folder2Icons = Array.from(folder2.querySelectorAll('.icon_wrapper'));

//     const allIcons = folder1Icons.concat(folder2Icons);
//     const shuffledIcons = shuffleArray(allIcons);

//     folder1.innerHTML = '';
//     folder2.innerHTML = '';

//     const halfLength = Math.floor(shuffledIcons.length / 2);
//     shuffledIcons.slice(0, halfLength).forEach(icon => folder1.appendChild(icon));
//     shuffledIcons.slice(halfLength).forEach(icon => folder2.appendChild(icon));
// }

// window.onload = function() {
//     shuffleFolders();
// };


function up_num(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value < 9) {
        inputBox.value = value + 1;
    }
    else {
        inputBox.value = 0;
    }
}

function down_num(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value > 0) {
        inputBox.value = value - 1;
    }
    else {
        inputBox.value = 9;
    }
}

function up_num_entry(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value < 9) {
        inputBox.value = value + 1;
        check_entry()
    }
    else {
        inputBox.value = 0;
        check_entry()
    }
}

function down_num_entry(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value > 0) {
        inputBox.value = value - 1;
        check_entry()
    }
    else {
        inputBox.value = 9;
        check_entry()
    }
}

function check_entry(){
    if (document.getElementById('code1_entry').value == 2 && document.getElementById('code2_entry').value == 5){
        document.getElementById('start-game-button').classList.remove('hidden');
        document.getElementById('code3_entry').value = '6';
        document.getElementById('code4_entry').value = '7';
    }
    else {
        document.getElementById('start-game-button').classList.add('hidden');
        document.getElementById('code3_entry').value = '?';
        document.getElementById('code4_entry').value = '?';
    }
}