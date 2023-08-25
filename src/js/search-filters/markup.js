import getFilterRefs from './refs';
import { getRequestsService } from '../API/api-service';
import sprite from '/sprite.svg';

const { areaFilter, ingredientsFilter, recipeList, loader } = getFilterRefs();

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
    const maxElements = 100;
    const elementsToRender = data.slice(0, maxElements);

    const markup = elementsToRender
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
    .map(({ rating, title, description, preview, _id }) => {
      return `
        <li class="recipe-item" id="${_id} data-title="${title}">
            <img class="recipe-img" loading="lazy"
                src="${preview}"
                alt="${title}"
                width="335"
                height="335"
                >
            <div class="recipe-wrap">
                <div class="top-wrap">
                    <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                        <svg class="recipe-favorite-icon" width="30" height="30"><use data-id="${_id}" class="heart-icon" href="${sprite}#icon-heart"></use></svg>
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
                        <button data-id="${_id}" class="recipe-see" type="button">See recipe</button>
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
