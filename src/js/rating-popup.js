// import { patchRating } from '../api';
import Swal from 'sweetalert';
import sprite from '../public/sprite.svg';

// import { disablePageScroll, enablePageScroll } from 'scroll-lock';

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




refs.openButtonEl.addEventListener('click', function () {

    refs.bodyEl.style.overflow = 'hidden';
    refs.backdropEl.style.display = 'block';
    refs.modalEl.style.display = 'block';


});

refs.closeButtonEl.addEventListener('click', function () {

    refs.bodyEl.style.overflow = '';
    refs.backdropEl.style.display = 'none';
    refs.modalEl.style.display = 'none';


});

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

