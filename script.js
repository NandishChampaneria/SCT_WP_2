
let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

function startStop() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('startStopBtn').textContent = 'Start';
        document.getElementById('startStopBtn').style.backgroundColor = 'rgb(44, 103, 44)';
        document.getElementById('startStopBtn').style.color = 'rgb(0, 255, 0)';
        document.getElementById('lapBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'block';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); 
        document.getElementById('startStopBtn').textContent = 'Stop';
        document.getElementById('startStopBtn').style.backgroundColor = 'rgb(112, 17, 17)';
        document.getElementById('startStopBtn').style.color = 'red';
        document.getElementById('lapBtn').style.display = 'block';
        document.getElementById('resetBtn').style.display = 'none';
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapCounter = 1;
    document.getElementById('display').textContent = '00:00:00.00';
    document.getElementById('laps').innerHTML = '';
    document.getElementById('startStopBtn').textContent = 'Start';
}

function updateTime() {
    const elapsedTimeMs = Date.now() - startTime;
    const hours = Math.floor(elapsedTimeMs / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTimeMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTimeMs % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTimeMs % 1000) / 10);

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    document.getElementById('display').textContent = formattedTime;
    elapsedTime = elapsedTimeMs;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function lap() {
    if (timerInterval) {
        const lapTime = elapsedTime;
        const lapMinutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
        const lapSeconds = Math.floor((lapTime % (1000 * 60)) / 1000);
        const lapMilliseconds = Math.floor((lapTime % 1000) / 10);

        const formattedLapTime = `${pad(lapMinutes)}:${pad(lapSeconds)}.${pad(lapMilliseconds)}`;
        
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${formattedLapTime}`;
        lapCounter++;

        document.getElementById('laps').appendChild(lapItem);
    }
}
