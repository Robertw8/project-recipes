import getFilterRefs from './refs';
import { getRequestsService } from '../API/api-service';

const { areaFilter, ingredientsFilter, recipeList } = getFilterRefs();

const renderAreaOptions = data => {
  if (areaFilter) {
    const markup = data
      .map(
        item =>
          `<li class="extra-options-item" data-area="${item.name}">${item.name}</li>`
      )
      .join('');
    areaFilter.insertAdjacentHTML('beforeend', markup);
  }
};

const renderIngredientsOptions = data => {
  if (ingredientsFilter) {
    const markup = data
      .map(
        item =>
          `<li class="extra-options-item" data-ingredient="${item._id}">${item.name}</li>`
      )
      .join('');
    ingredientsFilter.insertAdjacentHTML('beforeend', markup);
  }
};

const renderFilteredRecipes = results => {
  const markup = results
    .map(({ rating, title, id, description, preview }) => {
      return `
        <li class="recipe-item" data-title="${title}">
            <img class="recipe-img" loading="lazy"
                src="${preview}"
                alt="${id}">
            <div class="recipe-wrap">
                <div class="top-wrap">
                    <button type="button" class="recipe-favorite-btn">
                        <svg class="recipe-favorite-icon" width="22" height="22"><use class="heart-icon" href="/images/sprite.svg#icon-heart"></use></svg>
                    </button>
                </div>
                <div class="bottom-wrap">
                    <h2 class="recipe-name">${title}</h2>
                    <p class="recipe-description">${description}</p>
                    <div class="recipe-rating-wrap">
                        <p class="recipe-rating">${rating}<span class="recipe-stars">
                        <svg class="recipe-stars-icon" width="84" height="18"><use class="stars-icon" href="/images/sprite.svg#icon-${Math.round(
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

  if (recipeList) {
    recipeList.innerHTML = '';
    recipeList.insertAdjacentHTML('beforeend', markup);
  }
};

getRequestsService('areas').then(data => {
  renderAreaOptions(data);
});

getRequestsService('ingredients').then(data => {
  renderIngredientsOptions(data);
});

export { renderAreaOptions, renderIngredientsOptions, renderFilteredRecipes };