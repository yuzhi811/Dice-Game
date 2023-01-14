"use strict";
//Selecting elements
const $dice = document.querySelector(".dice");
const $score0 = document.querySelector("#score--0");
const $score1 = document.getElementById("score--1");
const $current0 = document.querySelector("#current--0");
const $current1 = document.querySelector("#current--1");
const $btnNew = document.querySelector(".btn--new");
const $btnRoll = document.querySelector(".btn--roll");
const $btnHold = document.querySelector(".btn--hold");
// const $player = document.querySelector('.player');
const $player0 = document.querySelector(".player--0");
const $player1 = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; // final scores keep accumulating
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  $score0.textContent = 0;
  $score1.textContent = 0;
  $current0.textContent = 0;
  $current1.textContent = 0;
  $dice.classList.add("hidden");
  $player0.classList.remove("player-winner");
  $player1.classList.remove("player-winner");
  $player0.classList.add("player--active");
  $player1.classList.remove("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
};
//함수를 호출해야 페이지가 로드되자마자 실행되게끔 할 수 있기 때문에
init();
// <Refactoring>
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //reassigning the activePlayer and check whether it is player0
  $player0.classList.toggle("player--active");
  $player1.classList.toggle("player--active");
}

//Rolling dice funcionality
$btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    $dice.classList.remove("hidden");
    $dice.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    //we will just display it on player1 to make it a little bit simpler, but in the future we will need to keep track of which player is the active
    if (dice !== 1) {
      currentScore += dice;
      //$current0.textContent = currentScore; //*CHANGE LATER
      // dinamically select the element!!
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//Hold the number
$btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // ===> scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the score > 50
    if (scores[activePlayer] > 20) {
      playing = false;
      //Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      $dice.classList.add("hidden");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
//Finishing the game -> the button no longer work

$btnNew.addEventListener("click", init);

//**try myself first
// $btnNew.addEventListener('click', () => {
//   // scores = [0, 0]; // final scores keep accumulating
//   // currentScore = 0; // 현재점수를 배열에 저장

//   document.getElementById(`score--${activePlayer}`).textContent = 0;

//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   // currentScore = 0;
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   document.getElementById(`score--${activePlayer}`).textContent = 0;

//   document.getElementById(`current--${activePlayer}`).textContent = 0;
// });
