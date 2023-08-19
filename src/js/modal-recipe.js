import axios from 'axios';
import { getRequestsService } from './API/api-service';


const openModalButton = document.querySelector('.open');
const modalRecipeBackDrop = document.querySelector('.recipe-backdrop');
const modalRecipe = document.getElementById('modal-recipe');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.recipe-btn-close');

openModalButton.addEventListener('click', openModal);
function openModal() {
  modalRecipeBackDrop.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

closeModalButton.addEventListener('click', closeModal);

function closeModal() {
  modalRecipeBackDrop.style.display = 'none';
  document.body.style.overflow = 'auto';
}

modalRecipeBackDrop.addEventListener('click', modalBackDrop);

function modalBackDrop(event) {
  if (event.target === modalRecipeBackDrop) {
    closeModal();
  }
}

document.addEventListener('keydown', closeEsc);
function closeEsc(event) {
  if (event.key === 'Escape' && modalRecipeBackDrop.style.display === 'block') {
    closeModal();
  }
}

export {
  openModalButton,
  modalRecipe,
  modal,
  closeModalButton,
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
    console.error(error);
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

  const markup = `
      <div class="recipe-details">
       <div>
     <iframe class="recipe-video" src="https://www.youtube.com/embed/${
       recipeData.youtube
     }" frameborder="0" allow="autoplay; encrypted-media; fullscreen"></iframe>
     </div>
     <div class="recipe-container">
     <h2 class="modal-recipe-title">${recipeData.title}</h2>
        <div class="modal-recipe-cooking">
        <p class="modal-recipe-rating"> ${recipeData.rating}</p>
        <p class="modal-recipe-time"> ${recipeData.time} mins</p>
        </div>
        
        <div class="overflow-scroll">
        <ul class="modal-ingredients">
          ${ingredientsList}
        </ul>
        </div>
        
        </div>
        
        
        <ul class="modal-recipe-tag">
          ${recipeData.tags
            .map(tag => `<li class="recipe-tag-item"><p>#${tag}</p></li>`)
            .join('')}
          
        </ul>
        
        <p class="modal-recipe-text">${recipeData.instructions}</p>
      
      </div>
    `;
  return markup;
};

const recipeID = '6462a8f74c3d0ddd28897fdf'; // _id рецепту, треба щоб передавали
const markUpElement = document.querySelector('.markUp');

getRecipeDetails(recipeID)
  .then(recipeData => {
    if (recipeData) {
      const recipeMarkup = createRecipeMarkup(recipeData);
      markUpElement.innerHTML = recipeMarkup; 
    } else {
      Notiflix.Notify.failure('Sorry ERROR. Please try again.');
    }
  })
  .catch(error => {
    console.error(error);
  });
