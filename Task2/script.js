let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const themeToggle = document.getElementById('theme-toggle');

function formatTime(time) {
  let milliseconds = parseInt((time % 1000));
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)));

  return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}.${milliseconds.toString().padStart(3,'0')}`;
}

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    display.classList.add('running');
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

function pause() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    display.classList.remove('running');
  }
}

function reset() {
  pause();
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = '';
  localStorage.removeItem('laps');
}

function lap() {
  const lapTime = formatTime(elapsedTime);
  const label = prompt("Enter lap name (optional):", "");
  const li = document.createElement('li');
  li.textContent = label ? `${label} - ${lapTime}` : lapTime;
  lapsList.appendChild(li);

  // Save to local storage
  let savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
  savedLaps.push(li.textContent);
  localStorage.setItem('laps', JSON.stringify(savedLaps));
}

// Load laps from local storage
window.onload = () => {
  let savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
  savedLaps.forEach(lap => {
    const li = document.createElement('li');
    li.textContent = lap;
    lapsList.appendChild(li);
  });
}

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

// Button listeners
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

