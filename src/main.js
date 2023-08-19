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
  onFilterItemClick,
  renderAreaOptions,
  renderIngredientsOptions,
  onSearchInput,
  onResetBtnClick,
  filterByArea,
  filterByIngredient,
  filterByTime,
} from './js/search-filter';
import getFilterRefs from './js/search-filters/refs.js';

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

filtersList?.addEventListener('click', onFilterItemClick);
searchInput?.addEventListener('input', debounce(onSearchInput, 300));
resetBtn?.addEventListener('click', onResetBtnClick);
areaFilter?.addEventListener('click', filterByArea);
ingredientsFilter?.addEventListener('click', filterByIngredient);
timeFilter?.addEventListener('click', filterByTime);

import './js/slider-events.js';
