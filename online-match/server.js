const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Definir a pasta pública onde os arquivos estáticos (HTML, CSS, JS) estarão
app.use(express.static('public'));

// Mapeamento para a comunicação entre jogadores
let players = [];

io.on('connection', (socket) => {
  console.log('Novo jogador conectado');
  
  // Adicionar jogador à lista de jogadores
  players.push({id: socket.id, choice: ''});
  if (players.length === 2) {
    io.emit('start_game');
  } else if(players.length > 2) players.shift();

  // Comunicação para jogo de pedra-papel-tesoura
  socket.on('play', (choice) => {
    //console.log("Jogador fez sua jogada", choice);
    const user = players.find(player => player.id === socket.id);
    const opponent = players.find(player => player.id !== socket.id);
    let battle = true;

    players.forEach(player => {
        if (!player.choice) battle = false;
    })

    user.choice = choice;

    if (opponent && battle) {
        if (user.choice === opponent.choice) socket.emit('opponent_play', "Empate");
        if(
            (user.choice === 'pedra' && opponent.choice === 'tesoura') || 
            (user.choice === 'tesoura' && opponent.choice === 'papel') || 
            (user.choice === 'papel' && opponent.choice === 'pedra')
        ) {
            return socket.emit('opponent_play', "Player 1 Venceu!");
        }
        else return socket.emit('opponent_play', "Player 2 Venceu!");
    }
  });

  socket.on('disconnect', () => {
    console.log('Jogador desconectado');
    players = players.filter(id => id !== socket.id);
  });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});