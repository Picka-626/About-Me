const froggy = document.getElementById('froggy');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalMessage = document.getElementById('final-message');
const frog = document.getElementById('frog');
const fly = document.getElementById('fly');

let score = 0;
let timer;
let timeLeft = 30;
let tongue = null;

// Start game
function startGame() {
  gameContainer.style.display = 'block';
  scoreDisplay.style.display = 'block';
  timerDisplay.style.display = 'block';
  finalMessage.style.display = 'none';

  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = 'Score: 0';
  timerDisplay.textContent = 'Time: 30s';

  // Start countdown
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = 'Time: ' + timeLeft + 's';
    if (timeLeft <= 0) endGame();
  }, 1000);
}

// End game
function endGame() {
  clearInterval(timer);
  gameContainer.style.display = 'none';
  scoreDisplay.style.display = 'none';
  timerDisplay.style.display = 'none';
  finalMessage.style.display = 'block';
  finalMessage.textContent = "Time's up! Your final score is " + score + ' 🐸';
}

// Show game upon click
froggy.addEventListener('click', startGame);

// Increase score and moving fly upon clicking
fly.addEventListener('click', () => {
  if (timeLeft <= 0) return; // Ignore if game ended
  score++;
  scoreDisplay.textContent = 'Score: ' + score;

  // Recall tongue
  showEmojiTongue();

  // Move fly randomly
  const maxX = gameContainer.clientWidth - fly.clientWidth;
  const maxY = gameContainer.clientHeight - fly.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  fly.style.left = randomX + 'px';
  fly.style.top = randomY + 'px';
});

// Follow mouse
gameContainer.addEventListener('mousemove', e => {
  const rect = gameContainer.getBoundingClientRect();
  const x = e.clientX - rect.left - frog.clientWidth / 2;
  frog.style.left = Math.max(0, Math.min(gameContainer.clientWidth - frog.clientWidth, x)) + 'px';
});

// Tongue animation
function showEmojiTongue() {
  if (tongue) tongue.remove();

  tongue = document.createElement('div');
  tongue.textContent = '👅';
  tongue.style.position = 'absolute';
  tongue.style.bottom = '35px';
  tongue.style.left = (parseInt(frog.style.left) || 130) + 15 + 'px';
  tongue.style.fontSize = '14px';
  tongue.style.opacity = '0';
  tongue.style.transition = 'all 0.15s ease-out';
  gameContainer.appendChild(tongue);

  // Animate upwards and fade
  requestAnimationFrame(() => {
    tongue.style.transform = 'translateY(-50px)';
    tongue.style.opacity = '1';
  });

  setTimeout(() => {
    tongue.style.opacity = '0';
    tongue.style.transform = 'translateY(-70px)';
    setTimeout(() => tongue.remove(), 150);
  }, 300);
}

