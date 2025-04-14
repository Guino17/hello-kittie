const kitty = document.getElementById("kitty");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const form = document.getElementById("gameOverForm");
const playerNameInput = document.getElementById("playerName");
const finalScoreInput = document.getElementById("finalScore");




const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

let score = 0;
let kittyX = window.innerWidth / 2 - 40;

function playClick() {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }
}

function playWin() {
  if (winSound) {
    winSound.currentTime = 0;
    winSound.play().catch(() => {});
  }
}

function playLose() {
  if (loseSound) {
    loseSound.currentTime = 0;
    loseSound.play().catch(() => {});
  }
}

// Si tienes un botón real para empezar, aquí iría:
const boton = document.querySelector(".boton");
if (boton) {
  boton.addEventListener("click", playClick);
}

function moveKitty(dir) {
  const step = 20;
  kittyX += dir === "left" ? -step : step;
  kittyX = Math.max(0, Math.min(window.innerWidth - 80, kittyX));
  kitty.style.left = kittyX + "px";
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveKitty("left");
  if (e.key === "ArrowRight") moveKitty("right");
});

// Touch
gameArea.addEventListener("touchstart", e => {
  const x = e.touches[0].clientX;
  kittyX = x - 40;
  kitty.style.left = kittyX + "px";
});

// Mouse
gameArea.addEventListener("mousemove", e => {
  kittyX = e.clientX - 40;
  kitty.style.left = kittyX + "px";
});

// Crear corazones
function createHeart() {
  const heart = document.createElement("img");
  heart.src = "/static/imagenes/heart.png";
  heart.classList.add("heart");
  heart.style.left = Math.random() * (window.innerWidth - 40) + "px";
  gameArea.appendChild(heart);

  let y = 0;
  const fall = setInterval(() => {
    y += 4;
    heart.style.top = y + "px";

    // Detectar colisión
    const heartX = parseInt(heart.style.left);
    if (
      y > 330 &&
      heartX > kittyX - 30 &&
      heartX < kittyX + 60
    ) {
      score++;
      scoreDisplay.textContent = "Puntos: " + score;
      gameArea.removeChild(heart);
      clearInterval(fall);
      playWin(); // ❤️ Suena cuando agarras el corazón
    }

    if (y > 400) {
      clearInterval(fall);
      gameOver();
    }
  }, 30);
}

// Llamar corazones cada segundo
const heartInterval = setInterval(createHeart, 1000);

// Fin del juego
function gameOver() {
  clearInterval(heartInterval);
  playLose(); // 💔 Suena al perder
  finalScoreInput.value = score;
  form.style.display = "block";
  form.submit();
}
