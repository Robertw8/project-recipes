import { getRequestsService } from './js/API/api-service.js';

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
  renderFilterOptions,
  onSearchInput,
  onResetBtnClick,
} from './js/search-filter';

getRequestsService('areas').then(area => {
  renderFilterOptions(area, extraFilterRefs.areaFilter);
});

getRequestsService('ingredients').then(ingredient => {
  renderFilterOptions(ingredient, extraFilterRefs.ingredientsFilter);
});

extraFilterRefs.filtersList?.addEventListener('click', onFilterItemClick);
extraFilterRefs.input?.addEventListener('input', onSearchInput);
extraFilterRefs.resetBtn?.addEventListener('click', onResetBtnClick);

import './js/slider-events.js';
