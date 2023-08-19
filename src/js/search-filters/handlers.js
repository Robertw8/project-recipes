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

export { onFilterItemClick };
