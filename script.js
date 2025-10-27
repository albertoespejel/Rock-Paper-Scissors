// Game state
let playerScore = 0;
let computerScore = 0;
let gameMode = null; // 'single' or 'multi'
let ws = null;
let roomCode = null;
let playerName = null;
let opponentName = null;
let waitingForOpponent = false;

// DOM elements
const modeSelection = document.getElementById('mode-selection');
const multiplayerSetup = document.getElementById('multiplayer-setup');
const gameArea = document.getElementById('game-area');
const singlePlayerBtn = document.getElementById('single-player-btn');
const multiplayerBtn = document.getElementById('multiplayer-btn');
const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const backToModeBtn = document.getElementById('back-to-mode');
const backToMenuBtn = document.getElementById('back-to-menu');
const playerNameInput = document.getElementById('player-name');
const roomCodeInput = document.getElementById('room-code-input');
const roomCodeField = document.getElementById('room-code');
const joinBtn = document.getElementById('join-btn');
const roomInfo = document.getElementById('room-info');
const roomCodeDisplay = document.getElementById('room-code-display');
const waitingMessage = document.getElementById('waiting-message');
const connectionStatus = document.getElementById('connection-status');

const choices = document.querySelectorAll('.choice');
const resultMessage = document.getElementById('result-message');
const choicesDisplay = document.getElementById('choices-display');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const player1Label = document.getElementById('player1-label');
const player2Label = document.getElementById('player2-label');
const resetBtn = document.getElementById('reset');

// Game choices
const gameChoices = ['rock', 'paper', 'scissors'];

// Choice emojis
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Mode selection handlers
singlePlayerBtn.addEventListener('click', () => {
    gameMode = 'single';
    modeSelection.style.display = 'none';
    gameArea.style.display = 'block';
    player1Label.textContent = 'Player';
    player2Label.textContent = 'Computer';
    connectionStatus.style.display = 'none';
});

multiplayerBtn.addEventListener('click', () => {
    gameMode = 'multi';
    modeSelection.style.display = 'none';
    multiplayerSetup.style.display = 'block';
});

backToModeBtn.addEventListener('click', () => {
    multiplayerSetup.style.display = 'none';
    modeSelection.style.display = 'block';
    resetMultiplayerSetup();
});

backToMenuBtn.addEventListener('click', () => {
    gameArea.style.display = 'none';
    modeSelection.style.display = 'block';
    resetGame();
    if (ws) {
        ws.close();
        ws = null;
    }
});

// Multiplayer setup handlers
createRoomBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert('Please enter your name');
        return;
    }
    playerName = name;
    connectWebSocket(() => createRoom());
});

joinRoomBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert('Please enter your name');
        return;
    }
    playerName = name;
    roomCodeInput.style.display = 'block';
});

joinBtn.addEventListener('click', () => {
    const code = roomCodeField.value.trim().toUpperCase();
    if (!code) {
        alert('Please enter a room code');
        return;
    }
    connectWebSocket(() => joinRoom(code));
});

// WebSocket functions
function connectWebSocket(onConnect) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
        console.log('Connected to server');
        updateConnectionStatus('Connected', 'connected');
        if (onConnect) onConnect();
    };
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleServerMessage(data);
    };
    
    ws.onclose = () => {
        console.log('Disconnected from server');
        updateConnectionStatus('Disconnected', 'disconnected');
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        updateConnectionStatus('Connection error', 'error');
    };
}

function createRoom() {
    ws.send(JSON.stringify({
        type: 'create_room',
        playerName
    }));
}

function joinRoom(code) {
    ws.send(JSON.stringify({
        type: 'join_room',
        roomCode: code,
        playerName
    }));
}

function handleServerMessage(data) {
    switch (data.type) {
        case 'room_created':
            roomCode = data.roomCode;
            roomCodeDisplay.textContent = roomCode;
            roomInfo.style.display = 'block';
            createRoomBtn.style.display = 'none';
            joinRoomBtn.style.display = 'none';
            playerNameInput.disabled = true;
            break;
            
        case 'game_ready':
            opponentName = data.opponentName;
            multiplayerSetup.style.display = 'none';
            gameArea.style.display = 'block';
            player1Label.textContent = playerName;
            player2Label.textContent = opponentName;
            connectionStatus.style.display = 'block';
            updateConnectionStatus('Connected to ' + opponentName, 'connected');
            resultMessage.textContent = 'Game started! Make your choice!';
            break;
            
        case 'choice_received':
            waitingForOpponent = true;
            resultMessage.textContent = 'Waiting for opponent...';
            disableChoices();
            break;
            
        case 'game_result':
            waitingForOpponent = false;
            displayMultiplayerResult(data.yourChoice, data.opponentChoice, data.result);
            updateScores(data.result);
            enableChoices();
            break;
            
        case 'opponent_disconnected':
            alert('Opponent disconnected');
            backToMenuBtn.click();
            break;
            
        case 'error':
            alert(data.message);
            break;
    }
}

function updateConnectionStatus(message, status) {
    connectionStatus.textContent = message;
    connectionStatus.className = 'connection-status ' + status;
}

function disableChoices() {
    choices.forEach(choice => {
        choice.disabled = true;
        choice.style.opacity = '0.5';
    });
}

function enableChoices() {
    choices.forEach(choice => {
        choice.disabled = false;
        choice.style.opacity = '1';
    });
}

function resetMultiplayerSetup() {
    playerNameInput.value = '';
    playerNameInput.disabled = false;
    roomCodeField.value = '';
    roomCodeInput.style.display = 'none';
    roomInfo.style.display = 'none';
    createRoomBtn.style.display = 'inline-block';
    joinRoomBtn.style.display = 'inline-block';
    if (ws) {
        ws.close();
        ws = null;
    }
}

// Add event listeners to choice buttons
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.getAttribute('data-choice');
        
        if (gameMode === 'single') {
            playGame(playerChoice);
        } else if (gameMode === 'multi' && !waitingForOpponent) {
            makeMultiplayerChoice(playerChoice);
        }
    });
});

// Reset button event listener
resetBtn.addEventListener('click', resetGame);

// Multiplayer choice
function makeMultiplayerChoice(choice) {
    ws.send(JSON.stringify({
        type: 'make_choice',
        roomCode,
        choice
    }));
}

// Main game function (single player)
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

// Display result (single player)
function displayResult(playerChoice, computerChoice, result) {
    choicesDisplay.innerHTML = '';
    
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
    
    updateResultMessage(result);
}

// Display result (multiplayer)
function displayMultiplayerResult(yourChoice, opponentChoice, result) {
    choicesDisplay.innerHTML = '';
    
    const yourChoiceDiv = document.createElement('div');
    yourChoiceDiv.className = 'choice-item';
    const yourSpan = document.createElement('span');
    yourSpan.textContent = choiceEmojis[yourChoice];
    const yourText = document.createElement('p');
    yourText.textContent = `You chose ${yourChoice}`;
    yourChoiceDiv.appendChild(yourSpan);
    yourChoiceDiv.appendChild(yourText);
    
    const vsDiv = document.createElement('div');
    const vsText = document.createElement('p');
    vsText.style.fontSize = '1.5em';
    vsText.style.fontWeight = 'bold';
    vsText.textContent = 'VS';
    vsDiv.appendChild(vsText);
    
    const opponentChoiceDiv = document.createElement('div');
    opponentChoiceDiv.className = 'choice-item';
    const opponentSpan = document.createElement('span');
    opponentSpan.textContent = choiceEmojis[opponentChoice];
    const opponentText = document.createElement('p');
    opponentText.textContent = `${opponentName} chose ${opponentChoice}`;
    opponentChoiceDiv.appendChild(opponentSpan);
    opponentChoiceDiv.appendChild(opponentText);
    
    choicesDisplay.appendChild(yourChoiceDiv);
    choicesDisplay.appendChild(vsDiv);
    choicesDisplay.appendChild(opponentChoiceDiv);
    
    updateResultMessage(result);
}

function updateResultMessage(result) {
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
    waitingForOpponent = false;
    enableChoices();
}
