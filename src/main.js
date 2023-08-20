//? Popular recipes
import { renderElement } from './js/popular-recipes.js';
renderElement();

//? Theme switch
import { setLocalStorageTheme, setThemeOnClick } from './js/dark-theme.js';

//? Slider
import './js/slider-events.js';

//? Recipes list
import { renderRecipes } from './js/recipes-render';

//? Recipes modal
import './js/modal-recipe';

//? Search filters
import './js/search-filters/handlers.js';
import './js/search-filters/filters.js';

// <<<<<<< HEAD
const {
  filtersList,
  searchInput,
  resetBtn,
  areaFilter,
  ingredientsFilter,
  timeFilter,
} = getFilterRefs();

getRequestsService('recipes').then(data => {
  renderAreaOptions(data);
});

getRequestsService('ingredients').then(data => {
  renderIngredientsOptions(data);
});

// <<<<<<< HEAD
extraFilterRefs.filtersList?.addEventListener('click', onFilterItemClick);
extraFilterRefs.input?.addEventListener('input', debounce(onSearchInput, 300));
extraFilterRefs.resetBtn?.addEventListener('click', onResetBtnClick);
extraFilterRefs.areaFilter?.addEventListener('click', filterByArea);
extraFilterRefs.ingredientsFilter?.addEventListener(
  'click',
  filterByIngredient
);
extraFilterRefs.timeFilter?.addEventListener('click', filterByTime);

import './js/slider-events.js';


// =======
filtersList?.addEventListener('click', onFilterItemClick);
searchInput?.addEventListener('input', debounce(onSearchInput, 300));
resetBtn?.addEventListener('click', onResetBtnClick);
areaFilter?.addEventListener('click', filterByArea);
ingredientsFilter?.addEventListener('click', filterByIngredient);
timeFilter?.addEventListener('click', filterByTime);
//?----------------------------------------search filters-------------------------------------------
// >>>>>>> main
// =======
//? Favorites
import { favorites } from './js/favorites.js';
favorites();
// >>>>>>> main
