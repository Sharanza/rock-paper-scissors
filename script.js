// SETUP
const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");
const resetBtn = document.getElementById('reset-button');

const SELECTIONS = [
  { name: "rock", emoji: "✊", beats: "scissors" },
  { name: "paper", emoji: "✋", beats: "rock" },
  { name: "scissors", emoji: "✌", beats: "paper" },
];
const WINNING_SCORE = 5;
let yourTotalGamesWon = 0;
let computerTotalGamesWon = 0;

let yourScore = 0;
let computerScore = 0;

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    // get the selection from the user clicking the button - this is from the data attribute
    const selectionName = selectionButton.dataset.selection;

    console.log("User selected:", selectionName);

    // find in our SELECTIONS the item that the user has clicked
    const selection = SELECTIONS.find((selectionItem) => {
      return selectionItem.name === selectionName;
    });

    makeSelection(selection);
  });
});

// event listener button to clear the game
resetBtn.addEventListener('click',() => resetGame());

function makeSelection(selection) {
  // get the random computer selection
  const computerSelection = randomSelection();

  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) {
    yourScore += 1;
    updateScoreSpan(yourScore, yourScoreSpan);
  }
  if (computerWinner) {
    computerScore += 1;
    updateScoreSpan(computerScore, computerScoreSpan);
  }
  checkForGameWinner();
}

function updateScoreSpan(newScore, scoreSpan) {
  scoreSpan.innerText = newScore;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

function checkForGameWinner() {
  let isWinnerFound = false;
  if(yourScore >= WINNING_SCORE) {
    // TODO - update the total games won
    isWinnerFound = true;
    yourTotalGamesWon += 1;
    displayGameWinnerMessage(true);
  }
  if(computerScore >= WINNING_SCORE) {
    // TODO - update the total games won
    isWinnerFound = true;
    computerTotalGamesWon += 1;
    displayGameWinnerMessage(false);
  }

  if(isWinnerFound) {
    resetGame();
  }
}

function resetGame() {
  // get all of the result selection elements
  const resultElements = document.querySelectorAll('.result-selection');

  // loop over all of the result selection elements and remove from the DOM
  resultElements.forEach((element) => element.remove());

  // reset the user and computer score back to 0
  yourScore = 0;
  computerScore = 0;

  // reset the visual scores to 0
  updateScoreSpan(0, yourScoreSpan);
  updateScoreSpan(0, computerScoreSpan);

  // remove the winner message element from the DOM

}

function displayGameWinnerMessage(isUserWinner) {
  const winnerMessage = isUserWinner ? 'Congrats, you have won the game' : 'The computer has won the game.';
  const yourScoreMessage = `You have won ${yourTotalGamesWon} game${yourTotalGamesWon === 1 ? '' : 's'}.`;
  const computerScoreMessage = `The computer has won ${computerTotalGamesWon} game${computerTotalGamesWon === 1 ? '' : 's'}.`;

  // send alert to the user
  alert(`${winnerMessage}\n${yourScoreMessage}\n${computerScoreMessage}`);

  // const winningDiv = document.createElement('div');
  // winningDiv.classList.add('game-winner-wrapper');

  // const message = isUserWinner ? 'Congratulations you have won' : `I'm sorry, the computer got the best of you today.`;
  // winningDiv.innerHTML = `<p>${message}</p>`;

  // document.body.insertAdjacentElement('beforeend',winningDiv);


}