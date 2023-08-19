import axios from 'axios';
import { renderFilteredRecipes } from './markup';
import { Toast } from '../utilities/sweetalert';

const queryParams = {
  queryParam: '',
  areaQuery: '',
  ingredientQuery: '',
  timeQuery: '',
  searchQuery: '',
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
    await Toast.fire({
      icon: 'error',
      title: 'Something went wrong. Reload the page and try again',
    });
    console.log(error);
  }
};

export { queryParams, executeRequest };
