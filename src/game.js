'use strict';

import Field from './field.js';
import * as sound from './sound.js';

let score = 0;
let timer = undefined;

export default class Game {
    constructor(gameDuration, carrotCount, bugCount) {
      this.gameDuration = gameDuration;
      this.carrotCount = carrotCount;
      this.bugCount = bugCount;

      this.timerIndicator = document.querySelector('.game__timer');
      this.gameScore = document.querySelector('.game__score');
      this.gameBtn = document.querySelector('.game__button');
      // field.addEventListener('click', onFieldClick);//field.addEventListener('click',event => (event));
      this.gameBtn.addEventListener('click', () => {
        if (this.started) {
          this.stop();
        } else {
          this.start();
        }
      });

      this.gameField = new Field(carrotCount, bugCount);
      this.gameField.setClickListener(this.onItemClick);

      this.started = false; //게임이 시작되었는지 확인 하는 변수
      this.score = 0;
      this.timer = undefined;
    }
    
    setGameStopListeber(onGameStop) {
      this.onGameStop = onGameStop;
    }

    start() {
      this.started = true;
      this.initGame();
      this.showStopButton();
      this.showTimerAndScore();
      this.startGameTimer();
      sound.playBackground();
    }
    
    stop() {
      this.started = false;
      this.stopGameTimer();
      this.hideGameButton();
      sound.playAlert();
      sound.stopBackground();
      this.onGameStop && this.onGameStop('cancel');
    }

    finish(win) {
      this.started = false;
      this.hideGameButton();
      if (win) {
        sound.playWin();
      } else {
        sound.playBug();
      }
      this.stopGameTimer();
      sound.stopBackground();
      this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    }

    onItemClick = (item) => {
      if (!this.started) {
        return;
      }
      if (item === 'carrot') { //matches는 css 셀렉터가 해당하는지 확인하는 것
        this.score++;
        this.updateScoreBoard();
        if (this.score === this.carrotCount) {//////////
          this.finish(true);
        }
      } else if (item ==='bug') {
        this.finish(false);
      }
    }
    
    
showStopButton() {
  const icon = this.gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  this.gameBtn.style.visibility = 'visible';
}

hideGameButton() {
  this.gameBtn.style.visibility = 'hidden';
}

showTimerAndScore() {
  this.timerIndicator.style.visibility = 'visible';
  this.gameScore.style.visibility = 'visible';
}

startGameTimer() {
  let remainingTimeSec = this.gameDuration; //남아있는 시간동안 계속 interval가 발생될수 있도록
  this.updateTimerText(remainingTimeSec);
  this.timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(this.timer);
      this.finish(this.carrotCount === this.score);
      return;
    }
    this.updateTimerText(--remainingTimeSec);
  }, 1000);
}

stopGameTimer() {
  clearInterval(this.timer);//window API
}

updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  this.gameTimer.innerText = `${minutes}:${seconds}`;
}

initGame() {
  this.score = 0;
  this.gameScore.innerText = this.carrotCount;
  // 벌레와 당근을 생성한뒤 field에 추가해줌
  // console.log(fieldRect);
  this.gameField.init();
}

updateScoreBoard() {
  this.gameScore.innerText = this.carrotCount - this.score;
}

}