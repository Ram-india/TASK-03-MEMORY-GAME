const cards = document.querySelectorAll('.card');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let moves = 0;

// Add event listeners to cards and reset button
cards.forEach((card) => card.addEventListener('click', flipCard));
resetButton.addEventListener('click', resetGame);

// Function to flip a card
function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    increaseMoves();
    checkForMatch();
  }
}

// Check if two cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.number === secondCard.dataset.number;

  if (isMatch) {
    updateScore();
    resetCards();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

// Increase moves counter
function increaseMoves() {
  moves++;
  movesDisplay.textContent = moves;
}

// Update score when there's a match
function updateScore() {
  score += 10;
  scoreDisplay.textContent = score;
}

// Reset game to initial state
function resetGame() {
  score = 0;
  moves = 0;
  scoreDisplay.textContent = score;
  movesDisplay.textContent = moves;

  cards.forEach((card) => card.classList.remove('flipped'));
  shuffleCards();
  resetCards();
}

// Shuffle cards randomly
function shuffleCards() {
  const gameBoard = document.getElementById('gameBoard');
  Array.from(cards)
    .sort(() => Math.random() - 0.5)
    .forEach((card) => gameBoard.appendChild(card));
}

// Reset card variables
function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}