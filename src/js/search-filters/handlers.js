import getFilterRefs from './refs';
import { getRecipes } from '../API/api-recipes';
import { renderFilteredRecipes } from './markup';
import { queryParams } from './requests';
import { executeRequest } from './requests';

const onFilterItemClick = e => {
  try {
    const item = e.target.closest('.extra-filters-item');
    const select = item.querySelector('.extra-select');
    const list = item.querySelector('.extra-options-list');

    select.classList.toggle('opened');
    list.classList.toggle('opened-list');
  } catch (error) {
    return;
  }
};

const {
  searchInput,
  selectedTime,
  selectedArea,
  selectedIngredient,
  recipeList,
} = getFilterRefs();

const onResetBtnClick = async () => {
  searchInput.value = '';
  queryParams.areaQuery = '';
  queryParams.timeQuery = '';
  queryParams.ingredientQuery = '';
  queryParams.queryParam = '';

  selectedTime.textContent = 'Select';
  selectedArea.textContent = 'Select';
  selectedIngredient.textContent = 'Select';
  const response = getRecipes().then(data =>
    renderFilteredRecipes(data?.data.results)
  );

  const items = recipeList?.querySelectorAll('.recipe-item');

  items?.forEach(item => item.classList.remove('d-none'));
};

const onSearchInput = e => {
  queryParams.searchQuery = e.target.value;
  executeRequest();
};

export { onFilterItemClick, onResetBtnClick, onSearchInput };
