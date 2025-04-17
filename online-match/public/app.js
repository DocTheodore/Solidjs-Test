const socket = io();

const status = document.getElementById('status');
const choices = document.getElementById('choices');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');

//Começo do jogo
socket.on('start_game', () => {
    //console.log("teste");
    status.textContent = 'Escolha sua jogada!';
    choices.style.display = 'block';
});

//Jogada do oponente
socket.on('opponent_play', (winner, opChoice) => {
    console.log("Resultado:")
    choices.style.display = 'none';
    const userChoice = document.querySelector('.selected') ? document.querySelector('.selected').id : '';
    if(!userChoice) return;
    result.textContent = `você escolheu ${userChoice}, seu oponente escolheu ${opChoice}, Você ${winner}!`;
});


//Função selecionar jogada do jogador
buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Escolheu", button.id);
        choices.display = 'none';
        socket.emit('play', button.id);
        button.classList.add('selected');
        buttons.forEach(button_b => {
            button_b.style.display = 'none';
        })
    })
});