# Rock-Paper-Scissors Game 🎮

A fun and interactive Rock-Paper-Scissors game built with HTML, CSS, and vanilla JavaScript. Play against the computer and see who wins!

## 🎯 About The Game

Rock-Paper-Scissors is a classic hand game where each player simultaneously forms one of three shapes. This digital version allows you to play against the computer with a beautiful, modern interface featuring smooth animations and real-time score tracking.

## ✨ Features

- **Interactive Gameplay**: Click on your choice (Rock, Paper, or Scissors) to play
- **Real-time Score Tracking**: Keep track of wins for both player and computer
- **Visual Feedback**: Color-coded results (green for wins, red for losses, orange for draws)
- **Emoji Icons**: Fun emoji representations for each choice (✊ Rock, ✋ Paper, ✌️ Scissors)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern gradient background with smooth animations
- **Reset Functionality**: Clear the scores and start fresh anytime

## 🎮 How to Play

### Game Rules

1. **Rock** (✊) beats **Scissors** (✌️)
2. **Scissors** (✌️) beats **Paper** (✋)
3. **Paper** (✋) beats **Rock** (✊)
4. If both players choose the same option, it's a **draw**

### Playing the Game

1. Open the game in your web browser
2. Click on one of the three choices: Rock, Paper, or Scissors
3. The computer will randomly select its choice
4. The result will be displayed showing both choices and who won
5. Scores are automatically updated
6. Click "Reset Game" to clear scores and start over

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/albertoespejel/Rock-Paper-Scissors.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Rock-Paper-Scissors
   ```

3. Open `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Right-click and select "Open with" your preferred browser, or
   - Use a local server (e.g., with VS Code Live Server extension)

That's it! No build process or dependencies required.

## 📁 Project Structure

```
Rock-Paper-Scissors/
│
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Game logic and functionality
└── README.md       # This file
```

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox, gradients, and transitions
- **Vanilla JavaScript**: Game logic without external dependencies

### Key Functions

- `playGame(playerChoice)`: Main game function that orchestrates gameplay
- `getComputerChoice()`: Randomly generates computer's choice
- `determineWinner(playerChoice, computerChoice)`: Evaluates game rules to determine winner
- `updateScores(result)`: Updates and displays scores
- `displayResult(playerChoice, computerChoice, result)`: Shows the game result visually
- `resetGame()`: Resets scores and game state

## 🎨 Design Features

- **Color Scheme**: Purple gradient background (#667eea to #764ba2)
- **Hover Effects**: Interactive button animations with scale and color transitions
- **Responsive Layout**: Adapts to different screen sizes with media queries
- **Visual Feedback**: Different colors for win (green), lose (red), and draw (orange)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

## 📝 License

This project is open source and available for anyone to use and modify.

## 👤 Author

**Alberto Espejel**

- GitHub: [@albertoespejel](https://github.com/albertoespejel)

## 🎉 Enjoy the Game!

Have fun playing Rock-Paper-Scissors! May the odds be ever in your favor! 🍀
