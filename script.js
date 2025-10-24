// Game state
let playerScore = 0;
let computerScore = 0;

// DOM elements
const choices = document.querySelectorAll('.choice');
const resultMessage = document.getElementById('result-message');
const choicesDisplay = document.getElementById('choices-display');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset');

// Game choices
const gameChoices = ['rock', 'paper', 'scissors'];

// Choice emojis
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Add event listeners to choice buttons
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.getAttribute('data-choice');
        playGame(playerChoice);
    });
});

// Reset button event listener
resetBtn.addEventListener('click', resetGame);

// Main game function
function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    updateScores(result);
    displayResult(playerChoice, computerChoice, result);
}

// Get random computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * gameChoices.length);
    return gameChoices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

// Update scores
function updateScores(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

// Display result
function displayResult(playerChoice, computerChoice, result) {
    // Clear previous result
    choicesDisplay.innerHTML = '';
    
    // Create choice display
    const playerChoiceDiv = document.createElement('div');
    playerChoiceDiv.className = 'choice-item';
    const playerSpan = document.createElement('span');
    playerSpan.textContent = choiceEmojis[playerChoice];
    const playerText = document.createElement('p');
    playerText.textContent = `You chose ${playerChoice}`;
    playerChoiceDiv.appendChild(playerSpan);
    playerChoiceDiv.appendChild(playerText);
    
    const vsDiv = document.createElement('div');
    const vsText = document.createElement('p');
    vsText.style.fontSize = '1.5em';
    vsText.style.fontWeight = 'bold';
    vsText.textContent = 'VS';
    vsDiv.appendChild(vsText);
    
    const computerChoiceDiv = document.createElement('div');
    computerChoiceDiv.className = 'choice-item';
    const computerSpan = document.createElement('span');
    computerSpan.textContent = choiceEmojis[computerChoice];
    const computerText = document.createElement('p');
    computerText.textContent = `Computer chose ${computerChoice}`;
    computerChoiceDiv.appendChild(computerSpan);
    computerChoiceDiv.appendChild(computerText);
    
    choicesDisplay.appendChild(playerChoiceDiv);
    choicesDisplay.appendChild(vsDiv);
    choicesDisplay.appendChild(computerChoiceDiv);
    
    // Update result message
    resultMessage.className = '';
    if (result === 'win') {
        resultMessage.textContent = 'You Win! 🎉';
        resultMessage.classList.add('win');
    } else if (result === 'lose') {
        resultMessage.textContent = 'You Lose! 😢';
        resultMessage.classList.add('lose');
    } else {
        resultMessage.textContent = "It's a Draw! 🤝";
        resultMessage.classList.add('draw');
    }
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultMessage.textContent = 'Make your choice!';
    resultMessage.className = '';
    choicesDisplay.innerHTML = '';
}
