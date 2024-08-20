
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

const correctCode = ['1', '2', '3', '4'];
        let attempts = 0;

        function increment(id) {
            let inputBox = document.getElementById(id);
            let value = parseInt(inputBox.value);
            if (value < 9) {
                inputBox.value = value + 1;
            }
        }

        function decrement(id) {
            let inputBox = document.getElementById(id);
            let value = parseInt(inputBox.value);
            if (value > 0) {
                inputBox.value = value - 1;
            }
        }

        function checkGuess() {
            attempts++;
            document.getElementById('attempts').textContent = attempts;

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
                document.getElementById('message').textContent = 'Congratulations!';
            } else {
                document.getElementById('message').textContent = `Correct positions: ${correctPositions}, Correct digits (wrong positions): ${correctDigits}`;
            }
        }