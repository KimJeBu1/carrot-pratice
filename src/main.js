'use strict';
import PopUp from './popup.js';
import Field from './field.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;


const gameBtn = document.querySelector('.game__button');
const timerIndicator = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');



const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false; //게임이 시작되었는지 확인 하는 변수
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field();
gameField.onItemClick((item) => {

});

function onItemClick(item) {
  if (!started) {
    return;
  }
  const target = event.target; //내가 클릭한것이 벌레인지 당근인지 확인을하는것
  if (target.matches('.carrot')) { //matches는 css 셀렉터가 해당하는지 확인하는 것
    target.remove();
    // 당근!!
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    finishGame(false);
  }
}

field.addEventListener('click', onFieldClick);//field.addEventListener('click',event => (event));
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY❓');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  timerIndicator.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC; //남아있는 시간동안 계속 interval가 발생될수 있도록
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(score === CARROT_COUNT);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerIndicator.innerHTML = `${minutes}:${seconds}`;
}


function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생성한뒤 field에 추가해줌
  // console.log(fieldRect);
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}


function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
