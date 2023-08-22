import axios from 'axios';
import { Toast } from './utilities/sweetalert.js';
import { getRequestsService } from './API/api-service';
import '@justinribeiro/lite-youtube';

const modalRecipeBackDrop = document.querySelector('.recipe-backdrop');
const modalRecipe = document.getElementById('modal-recipe');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.recipe-btn-close');
const giveRatingBtn = document.querySelector('.give-rating-btn');

function openModal(recipeID) {
  modal?.classList.replace('hidden-modal', 'opened-modal');
  modalRecipeBackDrop?.classList.replace('hidden-backdrop', 'opened-backdrop');
  handleRecipeDetails(recipeID);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal?.classList.replace('opened-modal', 'hidden-modal');
  modalRecipeBackDrop?.classList.replace('opened-backdrop', 'hidden-backdrop');
  document.body.style.overflow = '';

  const videoElem = modal?.querySelector('lite-youtube');
  videoElem?.remove();
}

closeModalButton?.addEventListener('click', closeModal);

modalRecipeBackDrop?.addEventListener('click', modalBackDrop);

function modalBackDrop(event) {
  if (event.target === modalRecipeBackDrop) {
    closeModal();
  }
}

document.addEventListener('keydown', closeEsc);

function closeEsc(event) {
  if (
    event.key === 'Escape' &&
    modalRecipeBackDrop?.classList.contains('opened-backdrop')
  ) {
    closeModal();
  }
}

export {
  modalRecipe,
  modal,
  closeModalButton,
  giveRatingBtn,
  closeEsc,
  modalBackDrop,
  closeModal,
  openModal,
};

const URL = 'recipes/';

const getRecipeDetails = async recipeID => {
  try {
    const recipeData = await getRequestsService(`${URL}${recipeID}`);
    return recipeData;
  } catch (error) {
    return null;
  }
};

const createRecipeMarkup = recipeData => {
  const ingredientsList = recipeData.ingredients
    .map(
      ingredient => `
        <li class="list-item-recipe">
          <p class="modal-recipe-ingredients">${ingredient.name}</p>
          <p class="modal-recipe-measure">${ingredient.measure}</p>
        </li>
      `
    )
    .join('');

  const youtubeLink = recipeData.youtube;
  var videoId = youtubeLink.match(/v=([a-zA-Z0-9_-]+)/)[1];

  const markup = `
    <div class="recipe-details">

    <div class="video-title">
    <lite-youtube class="recipe-video" videoid="${videoId}"></lite-youtube>
    <h2 class="modal-recipe-title">${recipeData.title}</h2>
    </div>
      <div class="recipe-container">
        <div class="modal-recipe-cooking">
            <p class="modal-recipe-rating">${
              recipeData.rating
            } <svg class="modal-stars-icon" width="84" height="18"><use class="stars-icon" href="public/sprite.svg#icon-${Math.round(
    recipeData.rating - 0.1
  )}-stars"></use></svg>
            </span></p>
          <p class="modal-recipe-time">${recipeData.time} mins</p>
        </div>
        <div class="overflow-scroll">
          <ul class="modal-ingredients">
            ${ingredientsList}
          </ul>
        </div>
        <ul class="modal-recipe-tag">
        ${recipeData.tags
          .map(tag => `<li class="recipe-tag-item"><p>#${tag}</p></li>`)
          .join('')}
      </ul>
      </div>
      <p class="modal-recipe-text">${recipeData.instructions}</p>
    </div>
  `;

  return markup;
};

async function handleRecipeDetails(recipeID) {
  const markUpElement = document.querySelector('.markUp');
  const favoriteBtn = document.querySelector('.favorite-btn');

  try {
    const recipeData = await getRecipeDetails(recipeID);

    if (recipeData) {
      const recipeMarkup = createRecipeMarkup(recipeData);
      markUpElement.innerHTML = recipeMarkup;

      // Завантажити обрані з локального сховища
      const existingFavorites =
        JSON.parse(localStorage.getItem('favorites')) || [];

      const isRecipeInFavorites = checkIfRecipeInFavorites(
        existingFavorites,
        recipeData._id
      );

      if (isRecipeInFavorites) {
        favoriteBtn.textContent = 'Remove from Favorite';
      } else {
        favoriteBtn.textContent = 'Add to Favorite';
      }

      // Видалимо попередні обробники подій, щоб уникнути накопичення
      favoriteBtn.removeEventListener('click', handleFavoriteButtonClick);

      // Додамо новий обробник події
      favoriteBtn.addEventListener('click', () => {
        handleFavoriteButtonClick(existingFavorites, recipeData, favoriteBtn);
      });
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Something went wrong, try reloading the page',
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function handleFavoriteButtonClick(existingFavorites, recipeData, favoriteBtn) {
  const isRecipeInFavorites = checkIfRecipeInFavorites(
    existingFavorites,
    recipeData._id
  );

  if (isRecipeInFavorites) {
    removeFromFavorites(existingFavorites, recipeData._id);
    favoriteBtn.textContent = 'Add to Favorite';
  } else {
    addToFavorites(existingFavorites, recipeData);
    favoriteBtn.textContent = 'Remove from Favorite';
  }
}

function checkIfRecipeInFavorites(existingFavorites, recipeID) {
  return existingFavorites.some(favorite => favorite._id === recipeID);
}
async function addToFavorites(existingFavorites, recipeData) {
  const isRecipeInFavorites = existingFavorites.some(
    favorite => favorite._id === recipeData._id
  );

  if (!isRecipeInFavorites) {
    existingFavorites.push(recipeData);
    localStorage.setItem('favorites', JSON.stringify(existingFavorites));
    const event = new Event('favoritesUpdated');
    window.dispatchEvent(event);
    Toast.fire({
      icon: 'success',
      title: 'Added to favorites!',
    });
  } else {
    Toast.fire({
      icon: 'info',
      title: 'The recipe is already in your favorites!',
    });
  }
}

async function removeFromFavorites(existingFavorites, recipeID) {
  const recipeIndex = existingFavorites.findIndex(
    favorite => favorite._id === recipeID
  );

  if (recipeIndex !== -1) {
    existingFavorites.splice(recipeIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(existingFavorites));
    const event = new Event('favoritesUpdated');
    window.dispatchEvent(event);

    Toast.fire({
      icon: 'info',
      title: 'Removed from favorites!',
    });
  }
}
