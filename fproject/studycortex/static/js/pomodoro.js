const MODES = {
    "25-5": {
        work: 25 * 60,
        break: 5 * 60,
        label: "25 / 5"
    },

    "50-10": {
        work: 50 * 60,
        break: 10 * 60,
        label: "50 / 10"
    }
};

let currentMode = MODES["25-5"];
let isWorkSession = true;
let timeRemaining = currentMode.work;
let intervalId = null;

const timerEl = document.getElementById("timer");
const sessionEl = document.getElementById("session");
const modeEl = document.getElementById("mode");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateUI() {
    timerEl.textContent = formatTime(timeRemaining);

    sessionEl.textContent = isWorkSession
        ? "Focus Session"
        : "Break Session";

    modeEl.textContent = `Mode: ${currentMode.label}`;
}

function tick() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateUI();
        return;
    }

    isWorkSession = !isWorkSession;

    if (isWorkSession) {
        timeRemaining = currentMode.work;
        alert("Break finished! Back to work.");
    } else {
        timeRemaining = currentMode.break;
        alert("Focus session complete! Take a break.");
    }

    updateUI();
}

function startTimer() {
    if (intervalId !== null) {
        return;
    }

    intervalId = setInterval(tick, 1000);
}

function pauseTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    pauseTimer();

    isWorkSession = true;
    timeRemaining = currentMode.work;

    updateUI();
}

function setMode(modeKey) {
    if (!MODES[modeKey]) {
        return;
    }

    currentMode = MODES[modeKey];
    resetTimer();
}

updateUI();