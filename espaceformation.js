// Valeurs initiales
let days = 5;
let hours = 2;
let minutes = 15;
let seconds = 55;

// Elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Affichage initial
updateDisplay();

// Timer
setInterval(() => {
  seconds--;

  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }

  if (minutes < 0) {
    minutes = 59;
    hours--;
  }

  if (hours < 0) {
    hours = 23;
    days--;
  }

  // Recommencer quand tout est fini
  if (days < 0) {
    days = 5;
    hours = 2;
    minutes = 15;
    seconds = 55;
  }

  updateDisplay();
}, 1000);

// Fonction affichage + animation
function updateDisplay() {
  animate(daysEl, days);
  animate(hoursEl, hours);
  animate(minutesEl, minutes);
  animate(secondsEl, seconds);
}

function animate(el, value) {
  el.style.transform = "scale(0.8)";
  el.textContent = value.toString().padStart(2, "0");

  setTimeout(() => {
    el.style.transform = "scale(1)";
  }, 150);
}
