// UIs
const moveOptions = document.querySelectorAll(".icon");
const reset = document.querySelector("#reset button");
const userScore = document.querySelector("user-score");
const compScore = document.querySelector("comp-score");
const userMove = document.querySelector("user-move");
const compMove = document.querySelector("comp-move");

// variables and enums

const numRounds = 5;

const Moves = Object.freeze({
  ROCK: Symbol("Rock"),
  PAPER: Symbol("Paper"),
  SCISSORS: Symbol("Scissors"),
});

const Result = Object.freeze({
  TIE: Symbol("Tie"),
  WIN: Symbol("Win"),
  LOSE: Symbol("Lose"),
});

const Player = Object.freeze({
  USER: Symbol("User"),
  COMPUTER: Symbol("Computer"),
});

const computerPlay = function () {
  const possibleMoves = Object.keys(Moves);
  const playedMove = Math.floor(Math.random() * possibleMoves.length);
  return Moves[possibleMoves[playedMove]];
};
