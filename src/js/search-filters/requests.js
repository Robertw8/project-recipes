import axios from 'axios';
import {
  renderFilteredRecipes,
  renderAreaOptions,
  renderIngredientsOptions,
} from './markup';
import { Toast } from '../utilities/sweetalert';
import { getRequestsService } from '../API/api-service';

const queryParams = {
  areaQuery: '',
  ingredientQuery: '',
  timeQuery: '',
  searchQuery: '',
};

const buildQueryParam = () => {
  const params = [];

  if (queryParams.timeQuery) {
    params.push(`time=${encodeURIComponent(queryParams.timeQuery)}`);
  }

  if (queryParams.areaQuery) {
    params.push(`area=${encodeURIComponent(queryParams.areaQuery)}`);
  }

  if (queryParams.ingredientQuery) {
    params.push(
      `ingredient=${encodeURIComponent(queryParams.ingredientQuery)}`
    );
  }

  if (queryParams.searchQuery) {
    params.push(`title=${encodeURIComponent(queryParams.searchQuery)}`);
  }

  return params.join('&');
};

const executeRequest = async () => {
  try {
    const queryParam = buildQueryParam();

    const response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?&limit=9&${queryParam}`
    );

    renderFilteredRecipes(response.data.results);
  } catch (error) {
    await Toast.fire({
      icon: 'error',
      title: 'Something went wrong. Reload the page and try again',
    });
  }
};

getRequestsService('areas').then(data => {
  renderAreaOptions(data);
});

getRequestsService('ingredients').then(data => {
  renderIngredientsOptions(data);
});

export { queryParams, executeRequest, buildQueryParam };
