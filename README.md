# Rock-Paper-Scissors Game 🎮

A fun and interactive Rock-Paper-Scissors game built with HTML, CSS, and vanilla JavaScript. Play against the computer or challenge friends from anywhere in the world!

## 🎯 About The Game

Rock-Paper-Scissors is a classic hand game where each player simultaneously forms one of three shapes. This digital version offers both single-player mode against the computer and live multiplayer mode where two players from different parts of the world can compete in real-time!

## ✨ Features

- **Two Game Modes**:
  - **Single Player**: Play against the computer with smart AI
  - **Multiplayer**: Play live against friends anywhere in the world
- **Real-time Multiplayer**: WebSocket-based instant gameplay
- **Room System**: Create or join game rooms with unique codes
- **Real-time Score Tracking**: Keep track of wins for both players
- **Visual Feedback**: Color-coded results (green for wins, red for losses, orange for draws)
- **Emoji Icons**: Fun emoji representations for each choice (✊ Rock, ✋ Paper, ✌️ Scissors)
- **Connection Status**: Live connection indicators for multiplayer games
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern gradient background with smooth animations
- **Reset Functionality**: Clear the scores and start fresh anytime

## 🎮 How to Play

### Game Rules

1. **Rock** (✊) beats **Scissors** (✌️)
2. **Scissors** (✌️) beats **Paper** (✋)
3. **Paper** (✋) beats **Rock** (✊)
4. If both players choose the same option, it's a **draw**

### Single Player Mode

1. Click "Play vs Computer"
2. Click on one of the three choices: Rock, Paper, or Scissors
3. The computer will randomly select its choice
4. The result will be displayed showing both choices and who won
5. Scores are automatically updated
6. Click "Reset Game" to clear scores and start over

### Multiplayer Mode

1. Click "Play vs Friend"
2. Enter your name
3. **To Create a Room**:
   - Click "Create Room"
   - Share the room code with your friend
   - Wait for them to join
4. **To Join a Room**:
   - Click "Join Room"
   - Enter the room code your friend shared
   - Click "Join"
5. Once both players are connected, the game begins!
6. Make your choice - the game waits for both players
7. Results are revealed simultaneously
8. Play as many rounds as you want!

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- Node.js (v14 or higher) - for multiplayer functionality

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/albertoespejel/Rock-Paper-Scissors.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Rock-Paper-Scissors
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

### Single Player (No Server Required)

If you only want to play single-player mode, you can simply open `index.html` directly in your browser without running the server.

## 📁 Project Structure

```
Rock-Paper-Scissors/
│
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Game logic and functionality
├── server.js       # WebSocket server for multiplayer
├── package.json    # Node.js dependencies
├── .gitignore      # Git ignore file
└── README.md       # This file
```

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox, gradients, and transitions
- **Vanilla JavaScript**: Game logic without external dependencies
- **Node.js**: Backend server for multiplayer
- **Express**: HTTP server for serving static files
- **WebSocket (ws)**: Real-time bidirectional communication

### Key Functions

**Single Player:**
- `playGame(playerChoice)`: Main game function that orchestrates gameplay
- `getComputerChoice()`: Randomly generates computer's choice
- `determineWinner(playerChoice, computerChoice)`: Evaluates game rules to determine winner
- `updateScores(result)`: Updates and displays scores
- `displayResult(playerChoice, computerChoice, result)`: Shows the game result visually

**Multiplayer:**
- `connectWebSocket()`: Establishes connection to game server
- `createRoom()`: Creates a new game room
- `joinRoom(code)`: Joins an existing game room
- `makeMultiplayerChoice(choice)`: Sends player's choice to server
- `handleServerMessage(data)`: Processes messages from server

**Common:**
- `resetGame()`: Resets scores and game state

## 🎨 Design Features

- **Color Scheme**: Purple gradient background (#667eea to #764ba2)
- **Hover Effects**: Interactive button animations with scale and color transitions
- **Responsive Layout**: Adapts to different screen sizes with media queries
- **Visual Feedback**: Different colors for win (green), lose (red), and draw (orange)
- **Connection Indicators**: Real-time status updates for multiplayer connections

## 🌐 Deployment

To deploy this game for worldwide access:

1. Deploy the server to a hosting platform (Heroku, Railway, DigitalOcean, etc.)
2. Update WebSocket connection URL in script.js if needed
3. Ensure the PORT environment variable is set correctly
4. Your friends can connect using the deployed URL!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

## 📝 License

This project is open source and available for anyone to use and modify.

## 👤 Author

**Alberto Espejel**

- GitHub: [@albertoespejel](https://github.com/albertoespejel)

## 🎉 Enjoy the Game!

Have fun playing Rock-Paper-Scissors! May the odds be ever in your favor! 🍀

Whether you're challenging the computer or competing with friends across the globe, we hope you enjoy this classic game with a modern twist!
