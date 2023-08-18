import { testFn } from './js/test';
import { setLocalStorageTheme, setThemeOnClick } from './js/dark-theme';
// testFn();

import { filtersList, onFilterItemClick } from './js/search-filter';

filtersList?.addEventListener('click', onFilterItemClick);

import './js/slider-events.js'

import { renderRecipes }  from './js/recipes-render';