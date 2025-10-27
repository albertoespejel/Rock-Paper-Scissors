const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Game rooms storage
const rooms = new Map();

// Generate random room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleMessage(ws, data);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
        handleDisconnect(ws);
    });
});

function handleMessage(ws, data) {
    const { type, roomCode, playerName, choice } = data;
    
    switch (type) {
        case 'create_room':
            createRoom(ws, playerName);
            break;
        case 'join_room':
            joinRoom(ws, roomCode, playerName);
            break;
        case 'make_choice':
            handleChoice(ws, roomCode, choice);
            break;
    }
}

function createRoom(ws, playerName) {
    const roomCode = generateRoomCode();
    const room = {
        code: roomCode,
        players: [{ ws, name: playerName, choice: null }],
        status: 'waiting'
    };
    
    rooms.set(roomCode, room);
    ws.roomCode = roomCode;
    ws.playerIndex = 0;
    
    ws.send(JSON.stringify({
        type: 'room_created',
        roomCode,
        playerName
    }));
    
    console.log(`Room ${roomCode} created by ${playerName}`);
}

function joinRoom(ws, roomCode, playerName) {
    const room = rooms.get(roomCode);
    
    if (!room) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room not found'
        }));
        return;
    }
    
    if (room.players.length >= 2) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room is full'
        }));
        return;
    }
    
    room.players.push({ ws, name: playerName, choice: null });
    ws.roomCode = roomCode;
    ws.playerIndex = 1;
    room.status = 'ready';
    
    // Notify both players
    room.players.forEach((player, index) => {
        player.ws.send(JSON.stringify({
            type: 'game_ready',
            roomCode,
            playerName: player.name,
            opponentName: room.players[1 - index].name
        }));
    });
    
    console.log(`${playerName} joined room ${roomCode}`);
}

function handleChoice(ws, roomCode, choice) {
    const room = rooms.get(roomCode);
    
    if (!room) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'Room not found'
        }));
        return;
    }
    
    const player = room.players.find(p => p.ws === ws);
    if (player) {
        player.choice = choice;
    }
    
    // Check if both players have made their choices
    if (room.players.every(p => p.choice !== null)) {
        const result = determineWinner(room.players[0].choice, room.players[1].choice);
        
        // Send results to both players
        room.players.forEach((player, index) => {
            const opponentIndex = 1 - index;
            player.ws.send(JSON.stringify({
                type: 'game_result',
                yourChoice: player.choice,
                opponentChoice: room.players[opponentIndex].choice,
                result: index === 0 ? result : reverseResult(result)
            }));
        });
        
        // Reset choices for next round
        room.players.forEach(p => p.choice = null);
    } else {
        // Notify the player that their choice was received
        ws.send(JSON.stringify({
            type: 'choice_received',
            choice
        }));
    }
}

function determineWinner(choice1, choice2) {
    if (choice1 === choice2) {
        return 'draw';
    }
    
    if (
        (choice1 === 'rock' && choice2 === 'scissors') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissors' && choice2 === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function reverseResult(result) {
    if (result === 'win') return 'lose';
    if (result === 'lose') return 'win';
    return 'draw';
}

function handleDisconnect(ws) {
    if (ws.roomCode) {
        const room = rooms.get(ws.roomCode);
        if (room) {
            // Notify other player
            room.players.forEach(player => {
                if (player.ws !== ws) {
                    player.ws.send(JSON.stringify({
                        type: 'opponent_disconnected'
                    }));
                }
            });
            
            // Remove room
            rooms.delete(ws.roomCode);
            console.log(`Room ${ws.roomCode} closed`);
        }
    }
}
