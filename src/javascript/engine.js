
const state = {
    // alterar um elemento visual na tela
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    } , 
    // alterar o estado do jogo
    values: {
        gameVelocity: 400,
        hitPosition : 0,
        result: 0,
        currentTime: 60 
    },
    actions: {
        timerId : setInterval(randomSquare,400),
        countDownTimerId: setInterval(countDown,1000)
    }
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",() => {
            if(square.id === state.values.hitPosition){ // quadrado q meu usuario cliclou --- quadrado onde esta inimigo
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playAudio()
            }
        })
    })
}

function randomSquare(){

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id; // guardando a posicao do meu quadrado atual onde esta inimigo para fazer comparacao
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randomSquare,state.values.gameVelocity) // a cada certo intervalo de tempo eu chamo a funcao randomSquare
// }

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime < 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playAudio(){
    const audio = new Audio("./src/audio/hit.m4a")
    audio.volume = 0.1
    audio.play()
}

function init(){
    // moveEnemy()
    addListenerHitBox()
}

init();

