const minDisplay = document.getElementById("min");
const secDisplay = document.getElementById("sec");
const countDisplay = document.getElementById("count");

const currentDisplay = document.getElementById("currentTime");

const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");

let min = 0;
let sec = 0;
let count = 0;

let interval = null;
let running = false;
let showMilliseconds = true;

function format(value) {
    return value < 10 ? "0" + value : value;
}

function updateDisplay() {

    minDisplay.textContent = format(min);
    secDisplay.textContent = format(sec);
    countDisplay.textContent = count;

    if (showMilliseconds) {
        countDisplay.style.display = "inline";
        document.getElementById("dot").style.display = "inline";
    } else {
        countDisplay.style.display = "none";
        document.getElementById("dot").style.display = "none";
    }
}

function stopwatch() {

    count++;

    if (count > 9) {
        count = 0;
        sec++;
    }

    if (sec > 59) {
        sec = 0;
        min++;
    }

    updateDisplay();
}

startBtn.addEventListener("click", () => {

    if (!running) {

        interval = setInterval(stopwatch, 100);

        running = true;
        startBtn.textContent = "Pause";

    } else {

        clearInterval(interval);

        running = false;
        startBtn.textContent = "Start";
    }
});

const resetIcon = document.querySelector("#reset i");

resetBtn.addEventListener("click", () => {

    resetIcon.classList.add("rotate");

    setTimeout(()=>{
        resetIcon.classList.remove("rotate");
    }, 500);
})

resetBtn.addEventListener("click", () => {

    clearInterval(interval);

    running = false;

    min = 0;
    sec = 0;
    count = 0;

    startBtn.textContent = "Start";

    currentDisplay.textContent = "00:00.0";

    updateDisplay();
});

lapBtn.addEventListener("click", () => {

    currentDisplay.textContent =
        `${format(min)}:${format(sec)}.${count}`;
});


updateDisplay();