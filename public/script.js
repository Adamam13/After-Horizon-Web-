
fetch('./seed.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
    gameData = data;
})
.catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
});

let seed;
let event_count = 0;
let zIndexCounter = 1;

let keys = 3;  
let lockedFiles = {};
let health = 100;

function openWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.display = 'flex';
        win.style.zIndex = ++zIndexCounter;
        win.style.left = '50%';
        win.style.top = '50%';
        win.style.transform = 'translate(-50%, -50%)';
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = 'none';
}

function CnO_Window(id_close, id_open) {
    closeWindow(id_close);
    openWindow(id_open);
}

function generateFoldersAndFiles() {
    const folders = {
        folder1: document.querySelector('.folder1-body'),
        folder2: document.querySelector('.folder2-body'),
        folder3: document.querySelector('.folder3-body'),
        folder4: document.querySelector('.folder4-body'),
        folder_readme: document.querySelector('.folder_readme-body')
    };
    
    Object.keys(folders).forEach(folder => folders[folder].innerHTML = '');
    
    console.log(gameData[seed].file_hint);
    gameData[seed].file_hint.forEach((file, index) => {
        // const folderKey = index % 2 === 0 ? 'folder1' : 'folder2';
        // console.log(file.folder, folderKey);
        createFileIcon(folders[file.folder], file.info_grap, file.name, `file_number${index + 1}`, file.folder, file.icon, file.is_lock);
    });
    
}

function createFileIcon(folder, file, label, idname, foldername, icon, islock) {
    const wrapper = document.createElement('div');
    wrapper.className = 'icon_wrapper';
    
    const img = document.createElement('img');
    img.className = 'icon';
    img.src = icon;

    const lock = document.createElement('img');
    if(islock == 1){
        lock.className = 'lock_icon';
        lock.src = "Icon/lock2.png";
        lockedFiles[idname] = true;
    }
    else{
        lockedFiles[idname] = false;
    }
    
    const text = document.createElement('div');
    text.className = 'desktop_text';
    text.textContent = label;

    const filewrapper = document.createElement('div');
    filewrapper.className = 'window';
    filewrapper.id = idname;
    filewrapper.innerHTML = `
    <div class="window-header">
        <button class="button" onclick="CnO_Window('${idname}', '${foldername}')">
            < Back</button>
                <span>${label}</span>

                <button class="button close" onclick="closeWindow('${idname}')">X</button>
    </div>
    <div class="info">
        <img class="info-img" src="${file}">
    </div>
    `;

    document.getElementById("game-page").appendChild(filewrapper);
    
    img.onclick = () => openFile(foldername, idname, lock);
    wrapper.append(img, text, lock);
    folder.appendChild(wrapper);
}

function openFile(folderId, fileId, lock) {
    if (!lockedFiles[fileId]) {
            CnO_Window(folderId, fileId);
    } else {
        confirmUnlock(fileId, folderId, lock);
    }
    console.log('Opening file:', fileId);
}

let lock_icon_temp;
//comfirm to use key
function confirmUnlock(fileId, folderId, lock) {
    keys = document.querySelector('.key_ea').textContent;
    document.getElementById('unlock_confirmation').style.display = 'flex';
    document.getElementById('unlock_confirmation').dataset.fileId = fileId;
    document.getElementById('unlock_confirmation').dataset.folderId = folderId;
    lock_icon_temp = lock;
}

function useKey() {
    let fileId = document.getElementById('unlock_confirmation').dataset.fileId;
    let folderId = document.getElementById('unlock_confirmation').dataset.folderId;
    
    console.log(keys);
    if(keys > 0){
        keys--;
        document.querySelector('.key_ea').textContent = keys;
    
        lockedFiles[fileId] = false;
        lock_icon_temp.src= '';
    
        closeWindow(folderId);
    
        CnO_Window('unlock_confirmation', fileId);
    }
}

// function showGame() {
//     document.getElementById('game-page').classList.remove('hidden');
// }

// function startGame() {
//     showGame();
//     console.log('Game started with seed:', seed);
// }

const pipeList = [
    'pipe/pipe1.png',
    'pipe/pipe2.png',
    'pipe/pipe3.png',
    'pipe/pipe4.png'
];

let pipe_line_up;
let pipe_code;
let pipe_rotate;

let pipe_save = [0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0];


const btn_pipe_container = document.querySelector('.btn_pipe_container');

function start_setpipe(){

    pipe_line_up = gameData[seed].pipe_lineup;

    pipe_code = gameData[seed].pipe_code;

    pipe_rotate = gameData[seed].pipe_rotate;

    for (let i = 1; i <= 18; i++) {
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
        newNode.addEventListener('click', checkGuess);
    }

    const pipe_board = document.querySelector('.pipe_board');

    for (let i = 1; i <= 18; i++) {
        const newNode = document.createElement('div');
        newNode.className = 'pipe_show';
        const img = document.createElement('img');
        img.src = pipeList[pipe_line_up[i - 1] - 1];
        img.style.transform = `rotate(${pipe_rotate[i - 1]}deg)`;
        newNode.appendChild(img);
        pipe_board.appendChild(newNode);
        
    }
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
    checkGuess();
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
    checkGuess();
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

function dragheader(){
    document.querySelectorAll('.window').forEach(windowElement => {
        const header = windowElement.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, offsetX, offsetY;
    
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
    
            startX = e.clientX;
            startY = e.clientY;
    
            offsetX = e.clientX - windowElement.offsetLeft;
            offsetY = e.clientY - windowElement.offsetTop;
            windowElement.style.position = 'absolute';
    
            zIndexCounter += 1;
            if (windowElement.style.zIndex){
                windowElement.style.zIndex = zIndexCounter;
            }
        });
    
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                if (e.clientX !== startX || e.clientY !== startY) {
                    windowElement.style.left = `${e.clientX - offsetX}px`;
                    windowElement.style.top = `${e.clientY - offsetY}px`;
                }
            }
        });
    
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}


function closeAllWindows() {
    const allWindows = document.querySelectorAll('.window');

    allWindows.forEach(window => {
        window.style.display = 'none';
    });
}

// function openFile(fileId, folderId) {
//     if (!lockedFiles[fileId]) {
//         CnO_Window(folderId, fileId);
//     } else {
//         confirmUnlock(fileId, folderId);
//     }
// }



function showMenu() {
    location.reload();
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
    saveGameData();
    clearInterval(interval_id);
}

function showEnter_codePage() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('enter_code-page').classList.remove('hidden');
    showTutorial();
   
}

function showGame() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('enter_code-page').classList.add('hidden')
    document.getElementById('game-page').classList.remove('hidden');
}

function check_nextDay_code(){
    if (document.getElementById('code1').value == 5 && document.getElementById('code2').value == 0){
        showThank();
    }
}

function startGame() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('enter_code-page').classList.add('hidden')
    document.getElementById('game-page').classList.remove('hidden');

    // เริ่มจับเวลา
    startGameTimer();
    reset_virus();
    update_virus();
    start_setpipe();
    generateFoldersAndFiles();
    dragheader();
    // console.log(gameData);
    reboot_code = gameData[seed].virus;
}

function showTutorial(){
    document.getElementById('tutorial-page').classList.remove('hidden');
    tuto_currentIndex = 0;
    tuto_updateSlider();
}

function closeTutorial(){
    document.getElementById('tutorial-page').classList.add('hidden');
}


document.getElementById('start-game-button').addEventListener('click', startGame);

document.getElementById('close').addEventListener('click', showThank);

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
    }
    else {
        inputBox.value = 0;
    }
    check_entry(document.getElementById('code1_entry').value, document.getElementById('code2_entry').value)
}

function down_num_entry(id) {
    let inputBox = document.getElementById(id);
    let value = parseInt(inputBox.value);
    if (value > 0) {
        inputBox.value = value - 1;
    }
    else {
        inputBox.value = 9;
    }
    check_entry(document.getElementById('code1_entry').value, document.getElementById('code2_entry').value)
}

function check_entry(num1, num2){
    seed = ""+num1+num2;
    if (gameData[seed]){
        document.getElementById('start-game-button').classList.remove('hidden');
        document.getElementById('code3_entry').value = gameData[seed].code[2];
        document.getElementById('code4_entry').value = gameData[seed].code[3];

    }
    else {
        document.getElementById('start-game-button').classList.add('hidden');
        document.getElementById('code3_entry').value = '?';
        document.getElementById('code4_entry').value = '?';
    }
}

let elapsedTime;
const timerElement = document.getElementById('timecount');
let interval_id;
function startGameTimer() {
    elapsedTime = 0;

    interval_id = setInterval(updateTimer, 1000);
}

function updateTimer() {
    elapsedTime++;
    // const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '00');
    // const seconds = String(elapsedTime % 60).padStart(2, '00');
    // timerElement.textContent = `${minutes}:${seconds}`;
    check_event(elapsedTime);
    if (elapsedTime%2 == 0){
        check_virus_event();
    }
    if (electic){
        health -= 0.2;
    }
    if(water){
        health -= 0.3;
    }
    if(oxygen){
        health -= 0.4;
    }
    if(health <= 0){
        showThank();
    }
    if (!electic && !water && !oxygen){
        if (health < 100){
            health += 1;
        }
    }
    timerElement.textContent = `${Math.floor(health)}%`;
}


// สร้าง Audio Object สำหรับเพลงประกอบ
// const backgroundMusic = new Audio('video/Hacktime.mp4'); // ใส่พาธเพลงที่ต้องการ
// backgroundMusic.loop = true; // ตั้งให้เพลงเล่นซ้ำ
// backgroundMusic.volume = 0.3; // ปรับระดับเสียง (0.0 - 1.0)

// พยายามเล่นเพลงทันทีที่โหลดหน้าเว็บ
// window.addEventListener('load', () => {
//     backgroundMusic.play().catch(error => {
//         console.error('Autoplay failed:', error);
//     });
// });