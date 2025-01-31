let virus = 0;
let reboot_code;
let num_need_reboot = 3;
let reboot_count = 0;
let temp_reboot = 0;

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
    
}
