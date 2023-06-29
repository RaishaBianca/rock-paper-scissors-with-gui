const startButton = document.querySelector("#start-button");
const gameChoices = document.querySelectorAll("#rock, #paper, #scissors");
const containers = document.querySelectorAll(".container");
const container_comp = document.querySelectorAll("#rock-computer, #paper-computer, #scissors-computer");
const winningCombination = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};
const move = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return move[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 1;
  }
  if (winningCombination[playerSelection] === computerSelection) {
    return 2;
  }
  if (winningCombination[computerSelection] === playerSelection) {
    return 3;
  }
}

function updateSelectionClass(selection) {
  const playerSelection = document.querySelector(`#${selection}`);
  gameChoices.forEach((choice) => {
    choice.classList.remove("rock", "paper", "scissors");
  });
  playerSelection.classList.add(selection);
}

function updateComputerSelectionClass(computerSelection) {
  container_comp.forEach((container) => {
    container.classList.remove("rock", "paper", "scissors");
  });

  if (computerSelection === "rock") {
    document.querySelector("#rock-computer").classList.add("rock");
  } else if (computerSelection === "paper") {
    document.querySelector("#paper-computer").classList.add("paper");
  } else if (computerSelection === "scissors") {
    document.querySelector("#scissors-computer").classList.add("scissors");
  }
}

async function game() {
  let playerScore = 0;
  let computerScore = 0;
  const currentScore = document.createElement("h2");
  currentScore.textContent = "";
  currentScore.classList.add("text");
  containers[0].insertAdjacentElement("afterend", currentScore);

  for (let i = 0; i < 5; i++) {
    const playerChoice = await getPlayerChoice();
    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);

    updateSelectionClass(playerChoice);
    updateComputerSelectionClass(computerChoice);

    if (result === 1) {
      currentScore.innerHTML = `It's a tie. The score currently is: Player ${playerScore}, Computer ${computerScore}`;
    } else if (result === 2) {
      playerScore++;
      currentScore.innerHTML = `Player wins this round! The score currently is: Player ${playerScore}, Computer ${computerScore}`;
    } else if (result === 3) {
      computerScore++;
      currentScore.innerHTML = `Computer wins this round! The score currently is: Player ${playerScore}, Computer ${computerScore}`;
    }
  }

  containers.forEach((container) => {
    container.style.display = "none";
  });

  if (playerScore > computerScore) {
    currentScore.textContent = "Player wins the game!";
  } else if (playerScore < computerScore) {
    currentScore.textContent = "Computer wins the game!";
  } else {
    currentScore.textContent = "It's a tie!";
  }

  currentScore.innerHTML += `<br><br>The final score was: Player ${playerScore}, Computer ${computerScore}`;
}

function getPlayerChoice() {
  return new Promise((resolve) => {
    gameChoices.forEach((choice) => {
      choice.addEventListener("click", () => {
        resolve(choice.getAttribute("id"));
      });
    });
  });
}

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  containers.forEach((container) => {
    container.style.display = "flex";
  });
  game();
});
