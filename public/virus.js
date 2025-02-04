let virus = 0;
let reboot_code;
let num_need_reboot = 3;
let reboot_count = 0;
let temp_reboot = 0;
let popup_count = 0;

let popup_img = [
'meme/meme1.jpg',
'meme/meme2.jpg',
'meme/meme3.jpg',
'meme/meme4.jpg',
'meme/meme5.jpg',
'meme/meme6.jpg',
'meme/meme7.jpg',
'meme/meme8.jpg',
'meme/meme9.jpg',
'meme/meme10.png',
'meme/meme11.jpg',
'meme/meme12.jpg',
'meme/meme13.jpg',
'meme/meme14.jpg',
'meme/meme14.jpeg',
'meme/meme15.jpg',
'meme/meme16.jpg',
'meme/meme17.jpg',
'meme/meme18.jpg',
'meme/meme19.jpg'
];

let popup_text = [
    'cat',
    'Hello World',
    'Banacat',
    'Please Forgive me',
    'I L O V E Y O U',
    'afaenfkjan ef',
    'แมวเด้ง',
    'ว้ากกกกกก ! !',
    'Attack !!!!!!',
    '2025181252.png',
    'kitkat',
    'GOOD JOB BRO',
    'Why you look me like that?',
    'beluga',
    'Sexy cat',
    'What are you doing huh?',
    'Cute! <3',
    'Mæw s̄ud ǹā rạk at your service',
    'Cat Bread.jpg',
    "Don't slap your friend like this cat"
    ];

function update_virus(){
    document.querySelector(".virus_text").textContent = `${Math.floor(virus)} %`;
    let virus_des = document.querySelector(".virus_descrip");
    let virus_state = document.querySelector(".virus_state");
    let virus_icon = document.querySelector(".virus_icon");
    let virus_text = document.querySelector(".virus_text");
    
    if(virus <= 0){
        virus_des.textContent = `ไม่พบไวรัส`;
        virus_des.style.color = `hsl(146, 100%, 50%)`;
        virus_state.style.border = `6px solid hsl(146, 100%, 50%)`;
        virus_icon.style.filter = `hue-rotate(146deg)`;
        virus_text.style.color = `hsl(146, 100%, 50%)`;
    }
    else if(virus <= 50){
        virus_des.textContent = `ตรวจพบไวรัสเล็กน้อย`;
        virus_des.style.color = `hsl(80, 100%, 50%)`;
        virus_state.style.border = `6px solid hsl(80, 100%, 50%)`;
        virus_icon.style.filter = `hue-rotate(80deg)`;
        virus_text.style.color = `hsl(80, 100%, 50%)`;
    }
    else if(virus <= 80){
        virus_des.textContent = `ตรวจพบไวรัสจำนวนหนึ่ง !`;
        virus_des.style.color = `hsl(60, 100%, 50%)`;
        virus_state.style.border = `6px solid hsl(60, 100.00%, 50.00%)`;
        virus_icon.style.filter = `hue-rotate(60deg)`;
        virus_text.style.color = `hsl(60, 100%, 50%)`;
    }
    else if(virus <= 100){
        virus_des.textContent = `ตรวจพบไวรัสจำนวนมาก ! ! !`;
        virus_des.style.color = `hsl(0, 100%, 50%)`;
        virus_state.style.border = `6px solid hsl(0, 100%, 50%)`;
        virus_icon.style.filter = `hue-rotate(0deg)`;
        virus_text.style.color = `hsl(0, 100%, 50%)`;
    }
}

function reset_virus(){
    virus = 0;
    update_virus();
}

function increase_virus(num){
    virus += num;
    update_virus();
}

function decrease_virus(num){
    virus -= num;
    update_virus();
}

function reboot_click(code){
    console.log(code);
    console.log(reboot_code);
    if (code == reboot_code[temp_reboot]){
        num_need_reboot -= 1;
        temp_reboot += 1;
    }
    else{
        num_need_reboot = 3 + reboot_count;
        temp_reboot = 0;
        flashScreen('red');
        const soundEffect = new Audio('video/Alertone.mp4');
        soundEffect.play();
        increase_virus(2);
    }

    if(num_need_reboot == 0){
        reset_virus();
        reboot_count += 1;
        temp_reboot = 0;
        num_need_reboot = 3 + reboot_count;
        flashScreen('green');
        const soundEffect = new Audio('video/Correct.mp4');
        soundEffect.play();
    }
    document.querySelector("#need_reboot_code").textContent = num_need_reboot;
}

function check_virus_event(){
    let virus_ocur = Math.random()
    virus_ocur *= 100;
    console.log(virus_ocur);
    if(virus_ocur < virus){
        console.log("virus alert");
        virus_popup_event();
    }
}

function spawn_virus_popup(popup){
    document.querySelector("#game-page").appendChild(popup);
    dragheader();
}

function close_virus_popup(popup){
    popup.parentElement.parentElement.remove();
}

function virus_popup_event(){
    let new_popup = document.querySelector("#virus_popup").cloneNode(true)
    new_popup.style.display = 'flex';

    let temp_img_num = Math.floor(Math.random()*22);
    console.log(temp_img_num);

    if (temp_img_num >= 20){
        new_popup.querySelector("#virus_popup_page").innerHTML =
        `<video autoplay loop>
            <source src="meme/meme1.mp4" type="video/mp4">
        </video>`;
        new_popup.querySelector("#virus_popup_text").textContent = `u ii a io ui ii a io`;
    }else{
        new_popup.querySelector("#virus_popup_page").innerHTML = `<img src="${popup_img[temp_img_num]}" alt="Popup Image">`;
        new_popup.querySelector("#virus_popup_text").textContent = `${popup_text[temp_img_num]}`;
    }
    new_popup.style.top = `${Math.floor(Math.random()*50) + 30}%`;
    new_popup.style.left = `${Math.floor(Math.random()*85) + 10}%`;
    new_popup.style.zIndex = zIndexCounter;

    spawn_virus_popup(new_popup)
}
