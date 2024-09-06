const correctOrder = [1, 5, 9, 4, 3];
    const blinkOrder = [2, 7, 6, 8, 10];
    let currentIndex = 0;
    let blinkIndex = 0;
    let blinkInterval;

    function startBlinking(buttonId) {
        const button = document.getElementById(buttonId);
        button.classList.add('blinking');
    }

    function stopBlinking(buttonId) {
        const button = document.getElementById(buttonId);
        button.classList.remove('blinking');
    }

    function handleClick(buttonNumber) {
        const clickedButton = document.getElementById(`btn${buttonNumber}`);

        // ตรวจสอบว่าปุ่มถูกกดไปแล้วหรือไม่
        if (clickedButton.classList.contains('green')) {
            return;
        }

        // ถ้ากดปุ่มที่ถูกต้องตามลำดับ
        if (buttonNumber === correctOrder[currentIndex]) {
            // เปลี่ยนปุ่มที่กดเป็นสีเขียว
            clickedButton.classList.add('green');

            // หยุดกระพริบปุ่มปัจจุบัน
            stopBlinking(`btn${blinkOrder[currentIndex]}`);

            currentIndex++;

            // ถ้ามีปุ่มถัดไปที่ต้องกระพริบ
            if (currentIndex < correctOrder.length) {
                startBlinking(`btn${blinkOrder[currentIndex]}`);
            } else {
                document.getElementById("message").textContent = "Complete!";
                document.getElementById("message").classList.add('show');
            }
        } else {
            // ถ้ากดผิดลำดับ
            const messageElement = document.getElementById("message");
            messageElement.textContent = "Reset";
            messageElement.classList.add('show');
            resetGame();

            // หลังจาก 3 วินาที ให้ข้อความค่อยๆ จางหายไป
            setTimeout(() => {
                messageElement.classList.add('fade-out');
                setTimeout(() => {
                    messageElement.classList.remove('show', 'fade-out');
                }, 1000); // ระยะเวลาที่ใช้ในการจางหาย (1 วินาที)
            }, 3000); // เวลาที่จะแสดงข้อความ (3 วินาที)
        }
    }

    function resetGame() {
        // รีเซ็ตสถานะของปุ่มทั้งหมด
        currentIndex = 0;

        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.remove('green');
            button.classList.remove('blinking');
        });

        // เริ่มกระพริบปุ่มแรกใหม่
        startBlinking(`btn${blinkOrder[currentIndex]}`);
    }

    // เริ่มต้นกระพริบปุ่มแรก
    startBlinking(`btn${blinkOrder[currentIndex]}`);