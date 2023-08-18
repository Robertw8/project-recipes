import { getRequestsService } from './API/api-service';
import { getRecipes } from './API/api-recipes';

const extraFilterRefs = {
  filtersList: document.querySelector('.extra-filters-list'),
  areaFilter: document.querySelector('#area-filter'),
  ingredientsFilter: document.querySelector('#ingredients-filter'),
  input: document.querySelector('.search-input'),
  recipeList: document.querySelector('.recipe-list'),
  resetBtn: document.querySelector('.reset-btn'),
};

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

const renderFilterOptions = (data, elem) => {
  elem?.insertAdjacentHTML(
    'beforeend',
    data
      .map(item => `<li class="extra-options-item">${item.name}</li>`)
      .join('')
  );
};

const onSearchInput = async e => {
  const response = await getRecipes();
  const results = response?.data.results;

  results.forEach(({ title }) => {
    const matched = title.toLowerCase().includes(e.target.value.toLowerCase());
    const listItem = document.querySelector(`[data-title="${title}"]`);

    if (listItem) {
      matched
        ? listItem.classList.remove('d-none')
        : listItem.classList.add('d-none');
    }
  });
};

const onResetBtnClick = () => {
  extraFilterRefs.input.value = '';

  const items = extraFilterRefs.recipeList?.querySelectorAll('.recipe-item');

  items?.forEach(item => item.classList.remove('d-none'));
};

export {
  extraFilterRefs,
  onFilterItemClick,
  renderFilterOptions,
  onSearchInput,
  onResetBtnClick,
};
