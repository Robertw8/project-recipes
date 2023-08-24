import axios from 'axios';
import { queryParams } from '../API/query-params';
import { renderFilteredRecipes } from './markup';
import { Toast } from '../utilities/sweetalert';
import getFilterRefs from './refs';

const { loader } = getFilterRefs();

const buildQueryParam = () => {
  const params = [];

  if (queryParams.category) {
    params.push(`category=${encodeURIComponent(queryParams.category)}`);
  }

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

  console.log(params.join('&'));
  return params.join('&');
};

const executeRequest = async () => {
  try {
    const queryParam = buildQueryParam();

    const response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?page=${queryParams.page}&limit=9&${queryParam}`
    );

    renderFilteredRecipes(response.data.results);
  } catch (error) {
    await Toast.fire({
      icon: 'error',
      title: 'Something went wrong. Reload the page and try again',
    });
  }

  loader?.classList.add('d-none');
};

export { executeRequest, buildQueryParam };
