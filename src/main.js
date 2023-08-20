import { getRequestsService } from './js/API/api-service.js';
import debounce from 'lodash.debounce';

import {
  getImageApi,
  createMarkup,
  renderElement,
} from './js/popular-recipes.js';
renderElement();

import { setLocalStorageTheme, setThemeOnClick } from './js/dark-theme.js';

import './js/slider-events.js';

import { renderRecipes } from './js/recipes-render';

import {
  openModalButton,
  modalRecipe,
  modal,
  closeModalButton,
  closeEsc,
  modalBackDrop,
  closeModal,
  openModal,
} from './js/modal-recipe';

import {
  extraFilterRefs,
  onFilterItemClick,
  renderAreaOptions,
  renderIngredientsOptions,
  onSearchInput,
  onResetBtnClick,
  filterByArea,
  filterByIngredient,
  filterByTime,
} from './js/search-filter';

getRequestsService('recipes').then(data => {
  renderAreaOptions(data);
});

getRequestsService('ingredients').then(data => {
  renderIngredientsOptions(data);
});

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

import { favorites } from './js/favorites.js';

favorites();
