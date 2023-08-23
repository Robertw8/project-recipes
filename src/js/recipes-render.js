import { Toast } from './utilities/sweetalert';
import { getRequestsService } from './API/api-service';
import { onListClick } from './add-to-favorite';
import sprite from '../public/sprite.svg';

let page = 1;
let limit = window.innerWidth < 768 ? 6 : 9;

export async function renderRecipes() {
  try {
    const response = await getRequestsService(
      `recipes?page=${page}&limit=${limit}`
    );
    const recipesArr = response.results;
    const markup = recipesArr
      .map(({ rating, title, description, preview, _id }) => {
        return `
        <li class="recipe-item" data-title="${title}">
            <img class="recipe-img" loading="lazy"
                src="${preview}"
                alt="${title}"
                width="335"
                height="335"
                >
            <div class="recipe-wrap">
                <div class="top-wrap">
                    <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                        <svg class="recipe-favorite-icon" width="22" height="22"><use id="${_id}" class="heart-icon" href="${sprite}#icon-heart"></use></svg>
                    </button>
                </div>
                <div class="bottom-wrap">
                    <h2 class="recipe-name">${title}</h2>
                    <p class="recipe-description">${description}</p>
                    <div class="recipe-rating-wrap">
                        <p class="recipe-rating">${rating}<span class="recipe-stars">
                        <svg class="recipe-stars-icon" width="84" height="18"><use class="stars-icon" href="${sprite}#icon-${Math.round(
          rating - 0.1
        )}-stars"></use></svg>
                        </span></p>
                        <button class="recipe-see" type="button">See recipe</button>
                </div>
                </div>
            </div>
        `;
      })
      .join('');
    const recipeListEl = document.querySelector('.recipe-list');
    recipeListEl.addEventListener('click', onListClick);
    recipeListEl.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    const defaultWindowEl = document.querySelector('.resipe-list-empty');
    const paginationEl = document.querySelector('.recipe-pagination');
    defaultWindowEl.classList.remove('is-hidden');
    paginationEl.classList.add('is-hidden');
    Toast.fire({
      icon: 'error',
      title:
        'Something went wrong, we found 0 recipes. Try reloading the page!',
    });
  }
}
renderRecipes();
