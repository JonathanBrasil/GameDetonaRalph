//variaveis de visuais = Views
//variaveis de numeros = Values

//objeto state
const state = {
    //adicionado variaveis que vao alterar elementos visuais
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value:{
        timerId:null,
        gameVelocity: 1000,
        hitPosition: 0,
        result:0,
        curretTime: 60,
    },
    actions:{
        countdownTimerId: setInterval(countdown,1000),
    }
};

//listener é um conceito de ficar ouvindo alguma ação
function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.value.hitPosition){
                state.value.result++;
                state.view.score.textContent = state.value.result; //altera o content do score
                state.value.hitPosition = null; //para n permitir farmar pontos. 
                playSound("hit");
            }
        })
       
    }
    )
}

function countdown(){
    state.value.curretTime--;
    state.view.timeLeft.textContent = state.value.curretTime;

    if(state.value.curretTime<=0){
        clearInterval(state.actions.countdownTimerId)
        clearInterval(state.value.timerId)
        alert("TEMPO ESGOTADO! Sua pontuação foi de: " + state.value.result);
    }
}

//sortear o inimigo para ir em algum quadrado aleatorio
function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });
    let randomNumber = Math.floor(Math.random()*9);

    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id
}

//timer para mover o inimigo
function moveEnemy(){
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity)
}

function playSound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

//funcao main ou inicial
//função principal para chamar outras funções iniciais
function init(){
moveEnemy();
addListenerHitBox();
countdown();
}

init();
