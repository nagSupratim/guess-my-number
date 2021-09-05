'use strict';

const generateSecretNumber = () => {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = generateSecretNumber();
let currScore = 20;
let highScore = 0;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};
const displayScore = score => {
  document.querySelector('.score').textContent = score;
};
const displayGuess = value => {
  document.querySelector('.guess').value = value;
};
const displayNumber = number => {
  document.querySelector('.number').textContent = number;
};
const displayHighScore = hscore => {
  document.querySelector('.highscore').textContent = hscore;
};
const addWinState = () => {
  document.querySelector('body').classList.add('win-body');
  document.querySelector('.number').classList.add('win-div');
};
const removeWinState = () => {
  document.querySelector('body').classList.remove('win-body');
  document.querySelector('.number').classList.remove('win-div');
};
const disableCheck = () => {
  document.querySelector('.check').disabled = true;
};
const enableCheck = () => {
  document.querySelector('.check').disabled = false;
};

const resetGame = () => {
  removeWinState();
  secretNumber = generateSecretNumber();
  currScore = 20;
  displayMessage('Start guessing..');
  displayScore(currScore);
  displayGuess('');
  displayNumber('?');
  enableCheck();
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = +document.querySelector('.guess').value;
  //when there is no input
  if (!guess) {
    displayMessage('⛔ No number!');

    //when player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    addWinState();
    displayNumber(secretNumber);
    if (highScore < currScore) {
      highScore = currScore;
      displayHighScore(highScore);
    }
    disableCheck();

    //when guess is wrong
  } else {
    if (currScore > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      displayScore(--currScore);
    } else {
      displayMessage('😪 You lost the game!');
      displayScore(0);
    }
  }
});
document.querySelector('.again').addEventListener('click', resetGame);
