import { getRequestsService } from './API/api-service';
import { getRecipes } from './API/api-recipes';
import axios from 'axios';
import { Toast } from './utilities/sweetalert';
import getFilterRefs from './search-filters/refs';

const {
  filtersList,
  areaFilter,
  ingredientsFilter,
  timeFilter,
  searchInput,
  recipeList,
  resetBtn,
  selectedTime,
  selectedArea,
  selectedIngredient,
} = getFilterRefs();

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

let queryParam = '';
let areaQuery = '';
let ingredientQuery = '';
let timeQuery = '';
let searchQuery = '';

const filterByArea = e => {
  areaQuery = e.target.dataset.area;

  selectedArea.textContent = e.target.textContent;
  executeRequest();
};

const filterByIngredient = e => {
  ingredientQuery = e.target.dataset.ingredient;

  selectedIngredient.textContent = e.target.textContent;
  executeRequest();
};

const filterByTime = e => {
  timeQuery = e.target.dataset.time;

  selectedTime.textContent = e.target.textContent;
  executeRequest();
};

const onSearchInput = e => {
  searchQuery = e.target.value;
  executeRequest();
};

const executeRequest = async () => {
  queryParam = '';

  if (timeQuery) {
    queryParam += `&time=${encodeURIComponent(timeQuery)}`;
  }

  if (areaQuery) {
    queryParam += `&area=${encodeURIComponent(areaQuery)}`;
  }

  if (ingredientQuery) {
    queryParam += `&ingredient=${encodeURIComponent(ingredientQuery)}`;
  }

  if (searchQuery) {
    queryParam += `&title=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?${queryParam}`
    );

    renderFilteredRecipes(response.data.results);
  } catch (error) {
    // Swal.fire();
    console.log(error);
  }
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

const onResetBtnClick = async () => {
  searchInput.value = '';
  areaQuery = '';
  timeQuery = '';
  ingredientQuery = '';
  queryParam = '';
  selectedTime.textContent = 'Select';
  selectedArea.textContent = 'Select';
  selectedIngredient.textContent = 'Select';
  const response = getRecipes().then(data =>
    renderFilteredRecipes(data?.data.results)
  );

  const items = recipeList?.querySelectorAll('.recipe-item');

  items?.forEach(item => item.classList.remove('d-none'));
};

export {
  onFilterItemClick,
  renderAreaOptions,
  renderIngredientsOptions,
  onSearchInput,
  onResetBtnClick,
  filterByArea,
  filterByIngredient,
  filterByTime,
  executeRequest,
};
