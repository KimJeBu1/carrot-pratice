'use strict'

const show = document.querySelector('.game__button');
show.addEventListener('click', (event) => {
    event.target.classList.remove('.game__field--hide')
})