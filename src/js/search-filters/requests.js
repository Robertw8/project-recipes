import axios from 'axios';
import { renderFilteredRecipes } from './markup';

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
    // Swal.fire();
    console.log(error);
  }
};

export { queryParams, executeRequest };
