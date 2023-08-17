const filtersList = document.querySelector('.extra-filters-list');

const onFilterItemClick = e => {
  const item = e.target.closest('.extra-filters-item');
  item.querySelector('.extra-select').classList.toggle('opened');
  item.querySelector('.extra-options-list').classList.toggle('opened-list');
};

export { filtersList, onFilterItemClick };
