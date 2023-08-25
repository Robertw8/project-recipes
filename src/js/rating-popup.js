import axios from 'axios';
import { Toast } from './utilities/sweetalert';
import {
  giveRatingBtn,
  recipeIdForRaitingPopUp,
  closeModal,
} from './modal-recipe';

const modRecipe = giveRatingBtn.closest('#modal-recipe');
const ratingPopUp = document.querySelector('.rating-modal');
const rate = document.querySelector('.rate');
const currentRate = document.querySelector('.live-rating');
const ratingFormInput = document.querySelector('.rating-modal-form > input');
const ratingForm = document.querySelector('.rating-modal-form');
const closeModalBtn = ratingPopUp.querySelector('.rating-modal-btn-close');

giveRatingBtn.addEventListener('click', onRatingBtnClick);
rate.addEventListener('click', onRateClick);
ratingForm.addEventListener('submit', onFormSubmit);
closeModalBtn.addEventListener('click', onCloseModal);

function onRatingBtnClick() {
  // ховаємо modal-recipe
  modRecipe.classList.add('is-hidden');

  // показуємо rating-popup
  ratingPopUp.classList.remove('is-hidden');
}

function hideRatingPopUp() {
  modRecipe.classList.remove('is-hidden');
  ratingPopUp.classList.add('is-hidden');
}

function onCloseModal() {
  closeModal();
  hideRatingPopUp();
}

function onRateClick(e) {
  if (e.target.nodeName !== 'INPUT') {
    return;
  }
  currentRate.textContent = e.target.value;
  ratingFormInput.setAttribute('rate', e.target.value);
}

function onFormSubmit(e) {
  e.preventDefault();
  const obj = {
    email: e.target.elements.email.value,
    rate: Number(e.target.elements.email.attributes.rate.value),
  };
  patchRating(obj);
  e.target.reset();
}

async function patchRating(obj) {
  try {
    const URL = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeIdForRaitingPopUp}/rating`;

    await axios.patch(URL, obj);

    Toast.fire({
      icon: 'success',
      title: 'Your rating was successfully added,please enter a new Email',
    });
    onCloseModal();
  } catch (err) {
    if (err.response.status === 409) {
      Toast.fire({
        icon: 'info',
        title: 'You have already rated this recipe',
      });
    }
    if (err.response.status === 400) {
      Toast.fire({
        icon: 'error',
        title: 'An error occured,plase try again',
      });
    }
  }
}
