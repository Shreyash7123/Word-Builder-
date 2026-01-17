let score = 0;
let level = 1;
let gameActive = false;
let currentWord = null;
let userAnswer = [];
let totalWords = 10;
let wordsCompleted = 0;

const words = [
  { word: "CAT", emoji: "🐱", hint: "A furry pet that says meow!" },
  { word: "DOG", emoji: "🐶", hint: "A loyal pet that barks!" },
  { word: "FISH", emoji: "🐟", hint: "Swims in water!" },
  { word: "BIRD", emoji: "🐦", hint: "Has wings and can fly!" },
  { word: "TREE", emoji: "🌲", hint: "Tall plant with leaves!" },
  { word: "STAR", emoji: "⭐", hint: "Shines bright in the sky!" },
  { word: "MOON", emoji: "🌙", hint: "Comes out at night!" },
  { word: "SUN", emoji: "☀️", hint: "Gives us light and warmth!" },
  { word: "APPLE", emoji: "🍎", hint: "A red fruit!" },
  { word: "BOOK", emoji: "📚", hint: "You read this!" }
];

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const emojiEl = document.getElementById("emojiDisplay");
const hintEl = document.getElementById("hint");
const wordDisplay = document.getElementById("wordDisplay");
const letterButtons = document.getElementById("letterButtons");
const feedback = document.getElementById("feedback");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function startGame() {
  if (gameActive) return;

  gameActive = true;
  score = 0;
  level = 1;
  wordsCompleted = 0;

  updateProgress();
  updateUI();
  nextWord();
}

function nextWord() {
  if (!gameActive) return;

  if (wordsCompleted >= totalWords) {
    endGame();
    return;
  }

  userAnswer = [];
  feedback.textContent = "";

  currentWord = words[Math.floor(Math.random() * words.length)];

  emojiEl.textContent = currentWord.emoji;
  hintEl.textContent = currentWord.hint;

  renderSlots();
  renderButtons();
}

function renderSlots() {
  wordDisplay.innerHTML = "";
  for (let i = 0; i < currentWord.word.length; i++) {
    const slot = document.createElement("div");
    slot.className = "letter-slot";
    wordDisplay.appendChild(slot);
  }
}

function renderButtons() {
  const letters = currentWord.word.split("").sort(() => Math.random() - 0.5);
  letterButtons.innerHTML = "";

  letters.forEach(letter => {
    const btn = document.createElement("button");
    btn.className = "letter-btn";
    btn.textContent = letter;
    btn.onclick = () => pickLetter(letter, btn);
    letterButtons.appendChild(btn);
  });
}

function pickLetter(letter, btn) {
  if (!gameActive) return;

  userAnswer.push(letter);
  btn.disabled = true;

  const slots = document.querySelectorAll(".letter-slot");
  slots[userAnswer.length - 1].textContent = letter;

  if (userAnswer.length === currentWord.word.length) {
    checkAnswer();
  }
}

function checkAnswer() {
  const userWord = userAnswer.join("");

  if (userWord === currentWord.word) {
    score++;
    wordsCompleted++;
    if (score % 3 === 0) level++;
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
  } else {
    wordsCompleted++;
    feedback.textContent = "❌ Try Again!";
    feedback.className = "feedback wrong";
  }

  updateProgress();
  updateUI();

  setTimeout(nextWord, 1200);
}

function updateProgress() {
  const percent = (wordsCompleted / totalWords) * 100;
  progressFill.style.width = percent + "%";
  progressText.textContent = `${wordsCompleted}/${totalWords}`;
}

function updateUI() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
}

function endGame() {
  gameActive = false;
  finalScore.textContent = `You spelled ${score} out of ${totalWords} words correctly!`;
  gameOver.classList.add("show");
}

function resetGame() {
  gameActive = false;
  score = 0;
  level = 1;
  wordsCompleted = 0;

  emojiEl.textContent = "👋";
  hintEl.textContent = "Click START to begin!";
  wordDisplay.innerHTML = "";
  letterButtons.innerHTML = "";
  feedback.textContent = "";

  updateProgress();
  updateUI();
  gameOver.classList.remove("show");
}
