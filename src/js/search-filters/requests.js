import axios from 'axios';
import { renderFilteredRecipes } from './markup';
import { Toast } from '../utilities/sweetalert';

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
    console.log(error);
  }
};

export { queryParams, executeRequest, buildQueryParam };
