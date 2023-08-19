import { getRequestsService } from './API/api-service';
import { getRecipes } from './API/api-recipes';
import axios from 'axios';
import Swal from 'sweetalert2';

const extraFilterRefs = {
  filtersList: document.querySelector('.extra-filters-list'),
  areaFilter: document.querySelector('#area-filter'),
  ingredientsFilter: document.querySelector('#ingredients-filter'),
  timeFilter: document.querySelector('#time-filter'),
  input: document.querySelector('.search-input'),
  recipeList: document.querySelector('.recipe-list'),
  resetBtn: document.querySelector('.reset-btn'),
  selectedTime: document.querySelector('#selected-time'),
  selectedArea: document.querySelector('#selected-area'),
  selectedIngredient: document.querySelector('#selected-ingredient'),
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

const renderAreaOptions = data => {
  extraFilterRefs.areaFilter?.insertAdjacentHTML(
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
  extraFilterRefs.ingredientsFilter?.insertAdjacentHTML(
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
let selectedArea = '';
let selectedIngredient = '';
let selectedTime = '';
let searchQuery = '';

const filterByArea = e => {
  selectedArea = e.target.dataset.area;

  extraFilterRefs.selectedArea.textContent = e.target.textContent;
  executeRequest();
};

const filterByIngredient = e => {
  selectedIngredient = e.target.dataset.ingredient;

  extraFilterRefs.selectedIngredient.textContent = e.target.textContent;
  executeRequest();
};

const filterByTime = e => {
  selectedTime = e.target.dataset.time;

  extraFilterRefs.selectedTime.textContent = e.target.textContent;
  executeRequest();
};

const onSearchInput = e => {
  searchQuery = e.target.value;
  executeRequest();
};

const executeRequest = async () => {
  queryParam = '';

  if (selectedTime) {
    queryParam += `&time=${encodeURIComponent(selectedTime)}`;
  }

  if (selectedArea) {
    queryParam += `&area=${encodeURIComponent(selectedArea)}`;
  }

  if (selectedIngredient) {
    queryParam += `&ingredient=${encodeURIComponent(selectedIngredient)}`;
  }

  if (searchQuery) {
    queryParam += `&title=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?${queryParam}`
    );

    renderFilteredRecipes(response.data.results);

    console.log(queryParam);
  } catch (error) {
    console.error('Error executing request:', error);
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

  extraFilterRefs.recipeList.innerHTML = '';
  extraFilterRefs.recipeList?.insertAdjacentHTML('beforeend', markup);
};

const onResetBtnClick = async () => {
  extraFilterRefs.input.value = '';
  selectedArea = '';
  selectedTime = '';
  selectedIngredient = '';
  queryParam = '';
  extraFilterRefs.selectedTime.textContent = 'Select';
  extraFilterRefs.selectedArea.textContent = 'Select';
  extraFilterRefs.selectedIngredient.textContent = 'Select';
  const response = getRecipes().then(data =>
    renderFilteredRecipes(data?.data.results)
  );
  console.log(queryParam);

  const items = extraFilterRefs.recipeList?.querySelectorAll('.recipe-item');

  items?.forEach(item => item.classList.remove('d-none'));
};

export {
  extraFilterRefs,
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
