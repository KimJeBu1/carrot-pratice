'use strict'

const  CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button'); 
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const sec=0;

let started = false; //게임이 시작되었는지 확인 하는 변수
let score = 0;
let timer = undefined;



gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
        startGameTimer();
    }
    started = !started; //started의 반대 boolen이 할당
});

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {

}

function startGameTimer() {
    gameTimer.innerHTML = "00:00"
    sec = %60;
    const timer = setInterval(function {

    })
}

function showStopButton(){
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
};

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    //벌레와 당근을 생성한뒤 field에 추가해줌
    console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png')
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// initGame();

// StartBtn.addEventListener('click', () =>{
//     field.style.opacity = '1';
// })

