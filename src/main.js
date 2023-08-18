

import { getImageApi, createMarkup, renderElement } from './js/popular-recipes.js';
renderElement();

import { setLocalStorageTheme, setThemeOnClick } from './js/dark-theme';

import { filtersList, onFilterItemClick } from './js/search-filter';

filtersList?.addEventListener('click', onFilterItemClick);

import './js/slider-events.js'
