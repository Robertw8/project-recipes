import getFilterRefs from './refs';
import { queryParams } from './requests';
import { executeRequest } from './requests';

const { selectedArea, selectedIngredient, selectedTime } = getFilterRefs();

const filterByArea = e => {
  queryParams.areaQuery = e.target.dataset.area;
  updateSelectedContent(selectedArea, e.target.textContent);
  executeRequest();
};

const filterByIngredient = e => {
  queryParams.ingredientQuery = e.target.dataset.ingredient;
  updateSelectedContent(selectedIngredient, e.target.textContent);
  executeRequest();
};

const filterByTime = e => {
  queryParams.timeQuery = e.target.dataset.time;
  updateSelectedContent(selectedTime, e.target.textContent);
  executeRequest();
};

const updateSelectedContent = (element, content) => {
  if (element instanceof Element) {
    element.textContent = content;
  }
};

export { filterByArea, filterByIngredient, filterByTime };
