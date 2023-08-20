const getFilterRefs = () => ({
  filtersList: document.querySelector('.extra-filters-list'),
  areaFilter: document.querySelector('#area-filter'),
  ingredientsFilter: document.querySelector('#ingredients-filter'),
  timeFilter: document.querySelector('#time-filter'),
  searchInput: document.querySelector('.search-input'),
  recipeList: document.querySelector('.recipe-list'),
  resetBtn: document.querySelector('.reset-btn'),
  selectedTime: document.querySelector('#selected-time'),
  selectedArea: document.querySelector('#selected-area'),
  selectedIngredient: document.querySelector('#selected-ingredient'),
  loader: document.querySelector('.loader'),
});

export default getFilterRefs;
