"use strict";
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const scoreEl = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScoreEl = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;
// setting score to 0

const initialise = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  scoreEl.textContent = 0;
  score1El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScoreEl.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
};

initialise();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

//roll dice
rollDice.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
    //
  }
});

newGame.addEventListener("click", initialise);
