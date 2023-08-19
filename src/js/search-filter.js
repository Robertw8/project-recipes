import { getRequestsService } from './API/api-service';
import { getRecipes } from './API/api-recipes';
import axios from 'axios';
import { Toast } from './utilities/sweetalert';
import getFilterRefs from './search-filters/refs';
import { queryParams } from './search-filters/requests';

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

const onSearchInput = e => {
  queryParams.searchQuery = e.target.value;
  executeRequest();
};

const executeRequest = async () => {
  queryParams.queryParam = '';

  if (queryParams.timeQuery) {
    queryParams.queryParam += `&time=${encodeURIComponent(
      queryParams.timeQuery
    )}`;
  }

  if (queryParams.areaQuery) {
    queryParams.queryParam += `&area=${encodeURIComponent(
      queryParams.areaQuery
    )}`;
  }

  if (queryParams.ingredientQuery) {
    queryParams.queryParam += `&ingredient=${encodeURIComponent(
      queryParams.ingredientQuery
    )}`;
  }

  if (queryParams.searchQuery) {
    queryParams.queryParam += `&title=${encodeURIComponent(
      queryParams.searchQuery
    )}`;
  }

  try {
    const response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?${queryParams.queryParam}`
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

export { onSearchInput, onResetBtnClick, executeRequest };
