// import { patchRating } from '../api';
import Swal from 'sweetalert';

import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const refs = {
    starsEl: document.querySelector('.live-rating'),
    submitBtnEl: document.querySelector('.rating-modal-form-btn'),
    inputEl: document.querySelector('.rating-modal-form-input'),
    openButtonEl: document.querySelector('.give-rating-btn'),
    closeButtonEl: document.querySelector('.rating-modal-btn-close'),
    backdropEl: document.querySelector('.js-backdrop'),
    test: document.querySelector('.my-rating-9'),
    bodyEl: document.querySelector('body'),
};

$('.my-rating-9').starRating({
    initialRating: 0.0,
    disableAfterRate: true,

    starSize: 24,
    onHover: function (currentIndex) {
        $('.live-rating').text(currentIndex);
    },
    onLeave: function (currentRating) {
        $('.live-rating').text(currentRating + '/' + currentRating);
    },
});

refs.closeButtonEl.addEventListener('click', onRatingModalRemove);
refs.backdropEl.addEventListener('click', onRatingBackdropClick);
refs.submitBtnEl.addEventListener('click', submitRating);
refs.bodyEl.addEventListener('click', onClick);

function onClick(evt) {
    if (!evt.target.classList.contains('rating-modal-btn-open')) {
        return;
    } else {
        const recipeId = evt.target.dataset.id;
        localStorage.setItem('recipeId', recipeId);
        onRatingModalOpen(recipeId);
    }
}

function submitRating(evt, recipeId) {
    evt.preventDefault();
    let giveRating = Number(refs.starsEl.textContent);
    let email = refs.inputEl.value;
    recipeId = localStorage.getItem('recipeId');

    const options = {
        rate: giveRating,
        email,
    };

    patchRating(recipeId, options)
        .then(() => {
            if (localStorage.getItem('patch-rating') !== 'error') {
                onRatingModalRemove();
                refs.starsEl.textContent = '0.0';
                refs.inputEl.value = '';
                localStorage.removeItem('recipeId');
                setTimeout(() => {
                    Swal({
                        title: 'Thank you for your feedback!',
                        type: 'success',
                        timer: 1500, // Автоматически закрыть через 1.5 секунды
                        showConfirmButton: false
                    });
                }, 500);
            }
            return;
        })
        .catch(error => console.log(error))
        .finally(
            setTimeout(() => {
                Loading.remove();
            }, 500)
        );
}

function onRatingModalOpen() {
    disablePageScroll();
    window.addEventListener('keydown', onEscKeyPress);
    document.body.classList.add('show-modal-rating');
    if (document.body.classList.contains('show-modal-rating')) {
        window.addEventListener('click', onClickWin);
    }
}

function onClickWin(event) {
    if (!event.target.classList.contains('js-backdrop')) {
        return;
    }
    onRatingModalRemove();
    window.removeEventListener('click', onClickWin);
}

function onRatingModalRemove() {
    window.removeEventListener('keydown', onEscKeyPress);
    document.body.classList.remove('show-modal-rating');
    enablePageScroll();
}

function onRatingBackdropClick(event) {
    if (event.currentTarget === event.target) {
        onRatingModalRemove();
    }
}

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onRatingModalRemove();
    }
}
export { onRatingModalOpen };