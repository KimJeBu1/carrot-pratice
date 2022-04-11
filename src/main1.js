'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';
import Game from './game.js';

let started = false; //게임이 시작되었는지 확인 하는 변수

const CARROT_COUNT = 20;
const BUG_COUNT = 20;

const gameAll = new Game();

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') { //matches는 css 셀렉터가 해당하는지 확인하는 것
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item ==='bug') {
    finishGame(false);
  }
}

// field.addEventListener('click', onFieldClick);//field.addEventListener('click',event => (event));
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
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY❓');
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopGameTimer();
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
}

function stopGameTimer() {
  clearInterval(timer);
}

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생성한뒤 field에 추가해줌
  // console.log(fieldRect);
  gameField.init();
}



