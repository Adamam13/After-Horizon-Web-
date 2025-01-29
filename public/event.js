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
    flashElement.style.zIndex = '99999999'; // อยู่ด้านบนสุด
    flashElement.style.transition = 'opacity 0.3s ease'; // เพิ่มเอฟเฟกต์ fade-out

    // เพิ่ม Element เข้าไปใน body
    document.body.appendChild(flashElement);

    // ลบ Element หลังจาก 300 มิลลิวินาที
    setTimeout(() => {
        flashElement.style.opacity = '0'; // ทำให้จางหายไป
        setTimeout(() => flashElement.remove(), 300); // ลบออกจาก DOM
    }, 300);
}