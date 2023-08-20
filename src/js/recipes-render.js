import { getRecipes } from './API/api-recipes';
const recipeListEl = document.querySelector('.recipe-list');

export async function renderRecipes() {
  try {
    const response = await getRecipes();
    const recipesArr = response.data.results;
    const markup = recipesArr
      .map(({ rating, title, id, description, preview }) => {
        return `
        <li class="recipe-item" data-title="${title}">
            <img class="recipe-img" loading="lazy"
                src="${preview}"
                alt="${title}">
            <div class="recipe-wrap">
                <div class="top-wrap">
                    <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                        <svg class="recipe-favorite-icon" width="22" height="22"><use class="heart-icon" href="images/sprite.svg#icon-heart"></use></svg>
                    </button>
                </div>
                <div class="bottom-wrap">
                    <h2 class="recipe-name">${title}</h2>
                    <p class="recipe-description">${description}</p>
                    <div class="recipe-rating-wrap">
                        <p class="recipe-rating">${rating}<span class="recipe-stars">
                        <svg class="recipe-stars-icon" width="84" height="18"><use class="stars-icon" href="images/sprite.svg#icon-${Math.round(rating - 0.1)}-stars"></use></svg>  
                        </span></p>
                        <button class="recipe-see" type="button">See recipe</button>
                </div>
                </div>
            </div>
        `;
      })
      .join('');
    const recipeListEl = document.querySelector('.recipe-list');
    recipeListEl.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error);
  }
}

renderRecipes();
