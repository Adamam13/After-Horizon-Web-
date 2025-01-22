
// var file1 = document.querySelector("#file_1");

// file1.addEventListener("click", popup);

// function popup(){
//     console.log('hello1');
//     var file_popup = document.querySelector("#file1_popup");
//     console.log('hello2');
//     file_popup.dataset.view = '1';
//     console.log('hello3');
// }


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


// fucntion code
function openWindow(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function CnO_Window(id_close, id_open){s
    document.getElementById(id_close).style.display = 'none';
    document.getElementById(id_open).style.display = 'flex';
}

const pipeList = [
    'pipe/pipe1.png',
    'pipe/pipe2.png',
    'pipe/pipe3.png',
    'pipe/pipe4.png'
];

const pipe_line_up = [1, 2, 4, 2, 1, 4,
                      4, 3, 2, 1, 2, 3,
                      3, 1, 2, 4, 1, 2];

const pipe_code = ['1111', '2222', '3333', '4444', '5555', '6666',
                   '7777', '8888', '9999', '0000', '1112', '1213',
                   '1314', '1415', '1516','1617', '1718', '1819'];

let pipe_save = [0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0];

const pipe_rotate = [180, 90, 0, 0, 0, 0,
                   0, 0, 0, 180, 90, 0,
                   0, 0, 0, 0, 0, 0];

const btn_pipe_container = document.querySelector('.btn_pipe_container');

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

for (let i = 1; i <= 18; i++) {
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

//ลาก ตัวEmergency Alert

// const emergency = document.querySelector("#enter_code");
// let isDragging = false;
// let offsetX, offsetY;

// emergency.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     offsetX = e.clientX - emergency.getBoundingClientRect().left;
//     offsetY = e.clientY - emergency.getBoundingClientRect().top;
//     emergency.style.position = 'absolute';

//     zIndexCounter += 1;
//     emergency.style.zIndex = zIndexCounter; 
// });

// document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//         emergency.style.left = `${e.clientX - offsetX}px`;
//         emergency.style.top = `${e.clientY - offsetY}px`;
//     }
// });

document.addEventListener('mouseup', () => {
    isDragging = false;
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

function startGameTimer() {
    const timerElement = document.getElementById('timecount');
    let elapsedTime = 0;

    function updateTimer() {
        elapsedTime++;
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '00');
        const seconds = String(elapsedTime % 60).padStart(2, '00');
        timerElement.textContent = `${minutes}:${seconds}`;
        check_event(elapsedTime);
        if (!electic && !water && !oxygen){
            noting++;
            console.log(noting);
        }
    }

    setInterval(updateTimer, 1000);
}

// เรียกใช้งาน startGameTimer เมื่อผู้ใช้เริ่มเกมหลังจากใส่รหัสสำเร็จ
function startGame() {
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('summary-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');

    // เริ่มจับเวลา
    startGameTimer();
    console.log(gameData);
}

// let noting = 0;
let electic = false;
let water = false;
let oxygen = false;
let numcode = 0;
let elect_interval;
let water_interval;
let oxygen_interval;

function check_event(time){
    if(Math.floor(time) >= gameData[seed].event_time[event_count]){
        switch (gameData[seed].event_order[event_count]) {
            case 1:
                electic_broken()
                event_count++;
                break
            case 2:
                oxygen_broken()
                event_count++;
                break
            case 3:
                water_broken()
                event_count++;
                break

        }
    }
}

function electic_broken() {
    if(!electic){
        console.log("ไฟฟ้าพังจ้าาาา");
        electic = true;
        set_electic();
        event_alert();
        openWindow('enter_Electical_code');
        const timer_electic = document.getElementById('emer_electic');
        let elect_time = 360000;
    
        function updateTimer() {
            elect_time -= 10;
            const minutes = String(Math.floor(elect_time / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((elect_time % 60000) / 1000)).padStart(2, '0');
            const milliseconds = String(Math.floor((elect_time % 1000) / 10)).padStart(2, '0');
            timer_electic.textContent = `${minutes}:${seconds}:${milliseconds}`;
        }
        
        elect_interval = setInterval(() => {
            if (elect_time <= 0) {
                clearInterval(elect_interval);
                showThank()
                timer_electic.textContent = "00:00:00";
            } else {
                updateTimer();
            }
        }, 10);
    }
}

function water_broken(){
    if(!water){
        console.log("ระบบประปาพังจ้าาาา");
        event_alert();
        openWindow('enter_Water_code');
        water = true;
        const timer_Water = document.getElementById('emer_water');
        let water_time = 300000;
    
        function updateTimer() {
            water_time -= 10;
            const minutes = String(Math.floor(water_time / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((water_time % 60000) / 1000)).padStart(2, '0');
            const milliseconds = String(Math.floor((water_time % 1000) / 10)).padStart(2, '0');
            timer_Water.textContent = `${minutes}:${seconds}:${milliseconds}`;
        }
        
        water_interval = setInterval(() => {
            if (water_time <= 0) {
                clearInterval(water_interval);
                showThank()
                timer_Water.textContent = "00:00:00";
            } else {
                updateTimer();
            }
        }, 10);
    }
}

function oxygen_broken(){
    if(!oxygen){
        console.log("เครื่องผลิตออกซิเจนพังจ้าาาา");
        event_alert();
        openWindow('enter_Oxygen_code');
        oxygen = true;
        const timer_oxygen = document.getElementById('emer_oxy');
        let oxygen_time = 240000;
    
        function updateTimer() {
            oxygen_time -= 10;
            const minutes = String(Math.floor(oxygen_time / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((oxygen_time % 60000) / 1000)).padStart(2, '0');
            const milliseconds = String(Math.floor((oxygen_time % 1000) / 10)).padStart(2, '0');
            timer_oxygen.textContent = `${minutes}:${seconds}:${milliseconds}`;
        }
        
        oxygen_interval = setInterval(() => {
            if (oxygen_time <= 0) {
                clearInterval(oxygen_interval);
                showThank()
                timer_oxygen.textContent = "00:00:00";
            } else {
                updateTimer();
            }
        }, 10);
    }
}

function check_pass_code(nameid){
    let emer = document.getElementById(nameid);
    let codelist = emer.querySelectorAll("input");
    let fincode = ""
    codelist.forEach(element =>{
        fincode += element.value;
    })

    console.log(fincode, gameData[seed].passcode[numcode]);

    if (fincode === gameData[seed].passcode[numcode]) {
        flashScreen('green'); // กระพริบสีเขียว
        const soundEffect = new Audio('video/Correct.mp4'); // ใส่พาธไฟล์เสียงที่ต้องการ
        soundEffect.play(); // เล่นเสียงเมื่อกระพริบหน้าจอ
        closeWindow(nameid);
        numcode++;
        // fincode = "";
        codelist.forEach(element =>{
            element.value = 0;
        })

        if(nameid == 'enter_Electical_code'){
            electic = false;
            clearInterval(elect_interval);
        }
        else if(nameid == 'enter_Water_code'){
            water = false;
            clearInterval(water_interval);
        }
        else if(nameid == 'enter_Oxygen_code'){
            oxygen = false;
            clearInterval(oxygen_interval);
        }
        
    } else {
        const soundEffect = new Audio('video/Alertone.mp4'); // ใส่พาธไฟล์เสียงที่ต้องการ
        soundEffect.play(); // เล่นเสียงเมื่อกระพริบหน้าจอ
        flashScreen('red'); // กระพริบสีแดง
    }
}

// function event_alert() {
//     // red element
//     let overlay = document.createElement('div');
//     overlay.className = 'flashing-overlay';
//     document.body.appendChild(overlay);

//     // krapib
//     let flashCount = 0;
//     const flashInterval = setInterval(() => {
//         if (flashCount >= 10) { // กระพริบ 5 ครั้ง (เปิด-ปิด = 10 รอบ)
//             clearInterval(flashInterval);
//             document.body.removeChild(overlay); // ลบ overlay ออกจาก DOM
//         } else {
//             overlay.style.opacity = flashCount % 2 === 0 ? '0.5' : '0'; // สลับระหว่างแสดงและซ่อน
//             flashCount++;
//         }
//     }, 300); // กระพริบทุก 300ms
// }

function event_alert() {
    // red element
    let overlay = document.createElement('div');
    overlay.className = 'flashing-overlay';
    document.body.appendChild(overlay);

    // Load and set up the sound
    const alertSound = new Audio('video/AlertWarning.mp4'); // ใส่พาธเสียงที่คุณต้องการ
    alertSound.loop = true; // ให้เล่นเสียงซ้ำ
    alertSound.play(); // เริ่มเล่นเสียง

    // krapib
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        if (flashCount >= 10) { // กระพริบ 5 ครั้ง (เปิด-ปิด = 10 รอบ)
            clearInterval(flashInterval);
            document.body.removeChild(overlay); // ลบ overlay ออกจาก DOM
            alertSound.pause(); // หยุดเสียงเมื่ออีเวนต์จบ
            alertSound.currentTime = 0; // รีเซ็ตเวลาเสียงให้เริ่มจากจุดเริ่มต้น
        } else {
            overlay.style.opacity = flashCount % 2 === 0 ? '0.5' : '0'; // สลับระหว่างแสดงและซ่อน
            flashCount++;
        }
    }, 300); // กระพริบทุก 300ms
}

function flashScreen(color) {
    // สร้าง div สำหรับกระพริบ
    const flashElement = document.createElement('div');
    flashElement.style.position = 'fixed'; // ตำแหน่งแบบเต็มหน้าจอ
    flashElement.style.top = '0';
    flashElement.style.left = '0';
    flashElement.style.width = '100vw';
    flashElement.style.height = '100vh';
    flashElement.style.backgroundColor = color; // ใช้สีที่ส่งเข้ามา
    flashElement.style.opacity = '0.7'; // ความโปร่งใส
    flashElement.style.zIndex = '9999'; // อยู่ด้านบนสุด
    flashElement.style.transition = 'opacity 0.3s ease'; // เพิ่มเอฟเฟกต์ fade-out

    // เพิ่ม Element เข้าไปใน body
    document.body.appendChild(flashElement);

    // ลบ Element หลังจาก 300 มิลลิวินาที
    setTimeout(() => {
        flashElement.style.opacity = '0'; // ทำให้จางหายไป
        setTimeout(() => flashElement.remove(), 300); // ลบออกจาก DOM
    }, 300);
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



// const tuto_images = [
//     'info/hint-OT_new.png',
//     'info/info-guied.png',
//     'info/info-carrot_new.png',
//     'info/info-farm_new.png'
// ]; // Replace with your images

// const tuto_slider = document.getElementById('tuto_slider');
// const tuto_dotsContainer = document.getElementById('tuto_dots');
// const tuto_playButton = document.getElementById('tuto_playButton');

// let tuto_currentIndex = 0;

// function tuto_renderSlider() {
//     tuto_slider.style.width = `100%`;
//     tuto_slider.innerHTML = tuto_images.map(src => `<img src="${src}" alt="Tutorial Image">`).join('');

//     tuto_dotsContainer.innerHTML = tuto_images.map((_, index) => 
//         `<div class="tuto_dot ${index === 0 ? 'tuto_active' : ''}" data-index="${index}"></div>`
//     ).join('');
// }

// function tuto_updateSlider() {
//     tuto_slider.style.transform = `translateX(-${tuto_currentIndex * 100}%)`;

//     document.querySelectorAll('.tuto_dot').forEach((dot, index) => {
//         dot.classList.toggle('tuto_active', index === tuto_currentIndex);
//     });

//     if (tuto_currentIndex === tuto_images.length - 1) {
//         tuto_playButton.classList.add('tuto_show');
//     } else {
//         tuto_playButton.classList.remove('tuto_show');
//     }
// }

// document.querySelector('.tuto_arrow.tuto_left').addEventListener('click', () => {
//     tuto_currentIndex = (tuto_currentIndex - 1 + tuto_images.length) % tuto_images.length;
//     tuto_updateSlider();
// });

// document.querySelector('.tuto_arrow.tuto_right').addEventListener('click', () => {
//     tuto_currentIndex = (tuto_currentIndex + 1) % tuto_images.length;
//     tuto_updateSlider();
// });

// tuto_dotsContainer.addEventListener('click', event => {
//     if (event.target.classList.contains('tuto_dot')) {
//         tuto_currentIndex = parseInt(event.target.dataset.index, 10);
//         tuto_updateSlider();
//     }
// });

// tuto_playButton.addEventListener('click', () => {
//     alert('Play button clicked!'); // Replace with desired functionality
// });

// tuto_renderSlider();
// tuto_updateSlider();