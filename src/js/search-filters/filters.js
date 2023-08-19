import getFilterRefs from './refs';
import { queryParams } from './requests';
import { executeRequest } from './requests';

const { selectedArea, selectedIngredient, selectedTime } = getFilterRefs();

const filterByArea = e => {
  queryParams.areaQuery = e.target.dataset.area;

  selectedArea.textContent = e.target.textContent;
  executeRequest();
};

const filterByIngredient = e => {
  queryParams.ingredientQuery = e.target.dataset.ingredient;

  selectedIngredient.textContent = e.target.textContent;
  executeRequest();
};

const filterByTime = e => {
  queryParams.timeQuery = e.target.dataset.time;

  selectedTime.textContent = e.target.textContent;
  executeRequest();
};

export { filterByArea, filterByIngredient, filterByTime };
