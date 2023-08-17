import { testFn } from './js/test';
testFn();

import { filtersList, onFilterItemClick } from './js/search-filter';

filtersList?.addEventListener('click', onFilterItemClick);
