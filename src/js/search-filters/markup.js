import getFilterRefs from './refs';
const { areaFilter, ingredientsFilter } = getFilterRefs();

const renderAreaOptions = data => {
  areaFilter?.insertAdjacentHTML(
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
  ingredientsFilter?.insertAdjacentHTML(
    'beforeend',
    data
      .map(
        item =>
          `<li class="extra-options-item" data-ingredient="${item._id}">${item.name}</li>`
      )
      .join('')
  );
};

export { renderAreaOptions, renderIngredientsOptions };
