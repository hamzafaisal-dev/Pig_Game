'use strict';

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const newGameBtn = document.querySelector(".btn--new")

score0.textContent = 0;
score1.textContent = 0;

document.querySelector(".dice").classList.add("hidden");

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
};

//roll button
rollButton.addEventListener("click", function () {
    if (playing) {
        //generate a random number
        const dice = Math.trunc(Math.random() * 6 + 1);

        //display dice
        document.querySelector(".dice").classList.remove("hidden");
        document.querySelector(".dice").src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }

        else {
            switchPlayer();
        }
    }
})

//hold button
holdButton.addEventListener("click", function () {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // WINNING CONDITION
        if (score[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            playing = false;
        }

        else {
            switchPlayer();
        }
    }
});

//reset game
newGameBtn.addEventListener("click", function () {
    playing = true;
    currentScore = 0;
    score[0] = 0;
    score[1] = 0;
    document.querySelector(".dice").classList.add("hidden");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");

    if (activePlayer === 1) {
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
        activePlayer = 0;
    }

    score0.textContent = 0;
    score1.textContent = 0;
    document.getElementById("current--0").textContent = 0;
    document.getElementById("current--1").textContent = 0;
});

