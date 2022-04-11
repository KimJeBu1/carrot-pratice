'use strict';

const GAME_DURATION_SEC = 5;

let score = 0;
let timer = undefined;

export default class Game {
    constructor() {
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.timerIndicator = document.querySelector('.game__timer');
        this.game.addEventListener('click', this.onclick);

    }

    setClicklistener(onClick)

    hideGameButton() {
        gameBtn.style.visibility = 'hidden';
      }

    showStopButton() {
        const icon = gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        gameBtn.style.visibility = 'visible';
      }

    startGameTimer() {
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

    updateScoreBoard() {
        gameScore.innerText = CARROT_COUNT - score;
      }

    showTimerAndScore() {
        timerIndicator.style.visibility = 'visible';
        gameScore.style.visibility = 'visible';
      }

    updateTimerText(time) {
        this.minutes = Math.floor(time / 60);
        this.seconds = time % 60;
        timerIndicator.innerHTML = `${minutes}:${seconds}`;
      }
      
      
}