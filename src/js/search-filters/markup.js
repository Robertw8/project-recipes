import getFilterRefs from './refs';
const { areaFilter, ingredientsFilter, recipeList } = getFilterRefs();

const renderAreaOptions = data => {
  areaFilter?.insertAdjacentHTML(
    'beforeend',
    data.results
      .map(
        item =>
          `<li class="extra-options-item" data-area="${item.area}">${item.area}</li>`
      )
      .join('')
  );
};

const renderIngredientsOptions = data => {
  ingredientsFilter?.insertAdjacentHTML(
    'beforeend',
    data
      .map(
        item =>
          `<li class="extra-options-item" data-ingredient="${item._id}">${item.name}</li>`
      )
      .join('')
  );
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
            <button type="button" class="recipe-favorite-btn">
                <svg class="recipe-favorite-icon" width="22" height="22"><use href="/images/sprite.svg#icon-heart"></use></svg>
            </button>
            <h2 class="recipe-name">${title}</h2>
            <p class="recipe-description">${description}</p>
            <div class="recipe-rating-wrap">
                <p class="recipe-rating">${rating}<span class="recipe-stars">stars</span></p>
                <button class="recipe-see" type="button">See recipe</button>
            </div>
        </div>
    </li>
    `;
    })
    .join('');

  recipeList.innerHTML = '';
  recipeList?.insertAdjacentHTML('beforeend', markup);
};

export { renderAreaOptions, renderIngredientsOptions, renderFilteredRecipes };
