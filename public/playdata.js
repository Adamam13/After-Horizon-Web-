let number_event_play = 0;
let survival_time = 0;;
let order_event_clear = [];
let event_clear_time = [];
let seedcode;

function saveGameData() {
    survival_time = elapsedTime;
    seedcode = gameData[seed].code;
    exportGameData();
}

function exportGameData() {
    const minutes = String(Math.floor(survival_time / 60)).padStart(2, '0');
    const seconds = String(survival_time % 60).padStart(2, '0');
    const survivalTimeFormatted = `${minutes}:${seconds}`;

    const eventNames = {
        1: "Electrical Broken",
        2: "Water Supply Broken",
        3: "Oxygen Generator Error"
    };

    const rows = order_event_clear.map((event, i) => {
        const eventName = eventNames[event] || `Event ${event}`;
        const clearTimeInMinutes = event_clear_time[i] !== undefined ? 
            `${String(Math.floor(event_clear_time[i] / 60000)).padStart(2, '0')}:${String(Math.floor((event_clear_time[i] % 60000) / 1000)).padStart(2, '0')} นาที` 
            : "-";
        return `
            <tr>
                <td>${eventName}</td>
                <td>${clearTimeInMinutes}</td>
            </tr>
        `;
    }).join('');

    const playData = `
        <html>
        <head>
            <title>Play Data</title>
            <style>
                body {
                    font-family: "Courier New", Courier, monospace;
                    background-color: #181818;
                    color: #cccccc;
                    margin: 0;
                    padding: 20px;
                    font-size: 16px;
                }
                .container {
                    background-color: #2a2a2a;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                    max-width: 600px;
                    margin: auto;
                    color: #fff;
                }
                h1, h2 {
                    text-align: center;
                    font-size: 24px;
                    color: #ffffff;
                }
                p {
                    font-size: 16px;
                    margin: 10px 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #444444;
                    padding: 8px;
                    text-align: left;
                    color: #e0e0e0;
                }
                th {
                    background-color: #333333;
                }
                tr:nth-child(even) {
                    background-color: #333333;
                }
                tr:hover {
                    background-color: #444444;
                }
                td {
                    background-color: #2a2a2a;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>ข้อมูลเกมที่เล่น</h1>
                <p><strong>Seed Code:</strong> ${seedcode}</p>
                <p><strong>จำนวนอีเว้นที่เล่น:</strong> ${number_event_play}</p>
                <p><strong>เวลารอด:</strong> ${survivalTimeFormatted}</p>
                
                <h2>รายละเอียดอีเว้นที่เคลียร์</h2>
                <table>
                    <tr>
                        <th>Event</th>
                        <th>Clear Time (นาที)</th>
                    </tr>
                    ${rows}
                </table>
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([playData], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "game_data.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}