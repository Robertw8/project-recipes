import getFilterRefs from './refs';
import { queryParams } from './requests';
import { executeRequest } from './requests';

const {
  selectedArea,
  selectedIngredient,
  selectedTime,
  areaFilter,
  ingredientsFilter,
  timeFilter,
  loader,
} = getFilterRefs();

const filterBy = ({ e, filter, dataAttr, param }) => {
  loader?.classList.remove('d-none');
  queryParams[param] = e.target.dataset[dataAttr];
  updateSelectedContent(filter, e.target.textContent);
  executeRequest();
};

const updateSelectedContent = (element, content) => {
  if (element instanceof Element) {
    element.textContent = content;
  }
};

areaFilter?.addEventListener('click', e =>
  filterBy({ e, filter: selectedArea, dataAttr: 'area', param: 'areaQuery' })
);
ingredientsFilter?.addEventListener('click', e =>
  filterBy({
    e,
    filter: selectedIngredient,
    dataAttr: 'ingredient',
    param: 'ingredientQuery',
  })
);
timeFilter?.addEventListener('click', e =>
  filterBy({ e, filter: selectedTime, dataAttr: 'time', param: 'timeQuery' })
);
