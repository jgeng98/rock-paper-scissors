// UIs
const moveOptions = document.querySelectorAll(".icon");
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const reset = document.querySelector("#reset button");
const lastUserMove = document.querySelector("#user-move");
const lastCompMove = document.querySelector("#comp-move");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");
const replay = document.querySelector("#replay");
const result = document.querySelector("#result");
const popUpBackground = document.querySelector("#pop-up-background");
const popUp = document.querySelector("#pop-up");

const popElement = function (element) {
  element.animate([{ transform: "scale(1.25)" }, { translate: "scale(1)" }], {
    duration: 150,
    easing: "ease-in-out",
  });
};

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

// game functions
const compPlay = function () {
  const possibleMoves = Object.keys(Moves);
  const playedMove = Math.floor(Math.random() * possibleMoves.length);
  return Moves[possibleMoves[playedMove]];
};

const playRound = function (userMove, compMove) {
  if (userMove === compMove) {
    return Result.TIE;
  } else if (
    (userMove === Moves.PAPER && compMove === Moves.ROCK) ||
    (userMove === Moves.ROCK && compMove === Moves.SCISSORS) ||
    (userMove === Moves.SCISSORS && compMove === Moves.PAPER)
  ) {
    return Result.WIN;
  } else {
    return Result.LOSE;
  }
};

const clickMove = function (event) {
  // gets the ID of the move chosen by the user
  const clickedButton = event.currentTarget.id;
  // randomly generates a move for the computer
  let compMove = compPlay();
  let userMove;

  // finds out which move was chosen based on the ID of the button clicked
  switch (clickedButton) {
    case rockButton.id:
      userMove = Moves.ROCK;
      break;
    case paperButton.id:
      userMove = Moves.PAPER;
      break;
    case scissorsButton.id:
      userMove = Moves.SCISSORS;
      break;
  }

  // determines whether the user won or lost
  let roundResult = playRound(userMove, compMove);

  // updates the move boxes for both user and computer
  updateLastMoves(userMove, compMove);

  // updates the scoreboard
  updateScore(roundResult);

  // displays the end screen if there was a winner (reached 5 points)
  checkWinner(parseInt(userScore.textContent), parseInt(compScore.textContent));
};

const getMoveClass = function (move) {
  // gets the correct class name of the icon for each given move
  let moveClass;

  switch (move) {
    case Moves.ROCK:
      moveClass = "fa-hand-rock";
      break;
    case Moves.PAPER:
      moveClass = "fa-hand-paper";
      break;
    case Moves.SCISSORS:
      moveClass = "fa-hand-scissors";
      break;
  }

  return moveClass;
};

const updateLastMoves = function (userMove, compMove) {
  // remove all content in moves box for both user and computer
  lastUserMove.textContent = "";
  lastCompMove.textContent = "";

  // create new <i> tags and add the correct class names for both user and computer
  let newUserMove = document.createElement("i");
  newUserMove.classList.add("fas");
  let newCompMove = newUserMove.cloneNode();

  newUserMove.classList.add(getMoveClass(userMove));
  newCompMove.classList.add(getMoveClass(compMove));

  // replace content in moves box with most recent moves for both user and computer
  lastUserMove.append(newUserMove);
  lastCompMove.append(newCompMove);

  // make elements pop in move box
  popElement(newUserMove);
  popElement(newCompMove);
};

const updateScore = function (roundResult) {
  // get the current score of both user and computer as ints
  let currentUserScore = parseInt(userScore.textContent);
  let currentCompScore = parseInt(compScore.textContent);

  switch (roundResult) {
    case Result.WIN:
      // adds one to current user score and updates the scoreboard
      currentUserScore++;
      userScore.textContent = userScore.textContent.replace(
        userScore.textContent,
        currentUserScore
      );
      // changes the move borders to indicate the winner
      lastUserMove.style.border = "4px solid #99e599b0";
      lastCompMove.style.border = "4px solid #ff7770a0";
      break;
    case Result.LOSE:
      // adds one to current comp score and updates the scoreboard
      currentCompScore++;
      compScore.textContent = compScore.textContent.replace(
        compScore.textContent,
        currentCompScore
      );
      // changes the move borders to indicate the winner
      lastUserMove.style.border = "4px solid #ff7770a0";
      lastCompMove.style.border = "4px solid #99e599b0";
      break;
    case Result.TIE:
      // changes the move borders to indicate it was a tie
      lastUserMove.style.border = "4px solid #EEE29Fc0";
      lastCompMove.style.border = "4px solid #EEE29Fc0";
  }
};

const checkWinner = function (currentUserScore, currentCompScore) {
  let winner;
  // if someone has reached 5 points, determines the winner and triggers the end screen
  if (currentUserScore === numRounds) {
    winner = Player.USER;
    endScreen(winner);
  }

  if (currentCompScore === numRounds) {
    winner = Player.COMPUTER;
    endScreen(winner);
  }
};

const endScreen = function (winner) {
  // changes the end screen popup message depending on the winner
  if (winner === Player.USER) {
    result.textContent = " won! Congrats 🙌";
    popUpBackground.style.visibility = "visible";
    popUp.style.visibility = "visible";
  } else {
    result.textContent = " lost. Better luck next time 🤞";
    popUpBackground.style.visibility = "visible";
    popUp.style.visibility = "visible";
  }
};

const resetGame = function () {
  // reset score to 0
  userScore.textContent = "0";
  compScore.textContent = "0";
  // reset last moves to "?" and reset move borders
  lastUserMove.textContent = "?";
  lastCompMove.textContent = "?";
  lastUserMove.style.border = "4px solid #83616e";
  lastCompMove.style.border = "4px solid #83616e";
  // hide popup and popup background again
  popUp.style.visibility = "hidden";
  popUpBackground.style.visibility = "hidden";
};

// event listeners
moveOptions.forEach((move) => {
  move.addEventListener("click", (e) => {
    clickMove(e);
  });
});

reset.addEventListener("click", resetGame);

replay.addEventListener("click", resetGame);
