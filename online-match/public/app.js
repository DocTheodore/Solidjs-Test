const socket = io();

const status = document.getElementById('status');
const choices = document.getElementById('choices');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('button')

//Começo do jogo
socket.on('start_game', () => {
    //console.log("teste");
    status.textContent = 'Escolha sua jogada!';
    choices.style.display = 'block';
});

//Jogada do oponente
socket.on('opponent_play', (battle) => {
    choices.style.display = 'none';
    const userChoice = document.querySelector('.selected') ? document.querySelector('.selected').id : '';
    if(!userChoice) return;
    result.textContent = `O oponente escolheu ${choice}, você escolheu ${userChoice}, ${winner}`;
});


//Função selecionar jogada do jogador
buttons.forEach(button => {
    button.addEventListener('click', () => {
        //console.log("Escolheu", button.id);
        choices.display = 'none';
        socket.emit('play', button.id);
        button.classList.add('selected');
        buttons.forEach(button_b => {
            button_b.style.display = 'none';
        })
    })
});