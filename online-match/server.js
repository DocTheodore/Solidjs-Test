const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ip = require("ip");

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
  console.log(players);


  // Comunicação para jogo de pedra-papel-tesoura
  socket.on('play', async (choice) => {
    //console.log("Jogador fez sua jogada", choice);
    const user = players.find(player => player.id === socket.id);
    const opponent = players.find(player => player.id !== socket.id);
    let battle = true;

    if (!choice) return
    user.choice = choice;
    

    players.forEach((player, i) => {
      console.log(`player ${i}`,player.choice);
        if (player.choice === '') battle = false;
    })

    if (!choice) return
    try{
      user.choice = choice;
    } catch(err){
      console.log(choice, err);
    }

    if (opponent && battle) {
      await new Promise(resolve => setTimeout(resolve, 350));
      console.log("Batalha");
    
      let resultUser, resultOpponent;
    
      if (user.choice === opponent.choice) {
        resultUser = resultOpponent = "Empatou";
      } else if (
        (user.choice === 'pedra' && opponent.choice === 'tesoura') || 
        (user.choice === 'tesoura' && opponent.choice === 'papel') || 
        (user.choice === 'papel' && opponent.choice === 'pedra')
      ) {
        resultUser = "Venceu";
        resultOpponent = "Perdeu";
      } else {
        resultUser = "Perdeu";
        resultOpponent = "Venceu";
      }
    
      // Enviar resultado para ambos os jogadores
      io.to(user.id).emit('opponent_play', resultUser, opponent.choice);
      io.to(opponent.id).emit('opponent_play', resultOpponent, user.choice);

      // Resetar escolhas para permitir nova rodada
      players.forEach(player => {
        player.choice = '';
        //o.to(player.id).emit("reload_session");
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Jogador desconectado');
    players = players.filter(id => id !== socket.id);
  });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log(`Servidor rodando em  http://${ip.address()}:3000`);
});