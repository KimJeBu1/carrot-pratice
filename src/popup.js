'use strict';

export default class PopUp { //export default는 class를 바깥으로 노출시켜
    constructor() { 
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            this.onclick && this.onclick();
            hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }
    
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }
    
    hide() {
        this.popUp.classList.add('pop-up--hide');
    }

}