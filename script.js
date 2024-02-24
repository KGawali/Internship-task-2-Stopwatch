let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  } else {
    isRunning = true;
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0);
    timer = setInterval(updateTime, 10);
  }
}

function updateTime() {
  const elapsedTime = Date.now() - startTime;
  displayTime(elapsedTime);
}

function displayTime(elapsedTime) {
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  document.getElementById('stopwatch').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  lapTimes = [];
  displayTime(0);
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  const elapsedTime = Date.now() - startTime;
  lapTimes.push(elapsedTime);
  const lapDisplay = document.createElement('div');
  lapDisplay.textContent = `Lap ${lapTimes.length}: ${formatTime(elapsedTime)}`;
  document.getElementById('laps').appendChild(lapDisplay);
}

function formatTime(elapsedTime) {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
