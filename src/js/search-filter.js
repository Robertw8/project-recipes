import { getRequestsService } from './API/api-service';

const extraFilterRefs = {
  filtersList: document.querySelector('.extra-filters-list'),
  areaFilter: document.querySelector('#area-filter'),
  ingredientsFilter: document.querySelector('#ingredients-filter'),
};

const onFilterItemClick = e => {
  try {
    const item = e.target.closest('.extra-filters-item');
    const select = item.querySelector('.extra-select');
    const list = item.querySelector('.extra-options-list');

    select.classList.toggle('opened');
    list.classList.toggle('opened-list');
  } catch (error) {
    return;
  }
};

const renderAreaOptions = (data, elem) => {
  elem?.insertAdjacentHTML(
    'beforeend',
    data
      .map(item => `<li class="extra-options-item">${item.name}</li>`)
      .join('')
  );
};

export { extraFilterRefs, onFilterItemClick, renderAreaOptions };
