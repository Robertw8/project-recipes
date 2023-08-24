const categiriesList = document.querySelector('.favorites-categoris-list');
export function makeCategories() {
  //обнуляємо все що було
  categiriesList.innerHTML = '';
  //створюємо еррей категорій
  const categoriesArray = JSON.parse(localStorage.getItem('favorites'))
    .map(a => a.category)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  //кидаємо категорії в контейнер
  categiriesList.insertAdjacentHTML(
    'beforeend',
    categoriesArray
      .map(a => {
        return `<li class="favorites-categoris-item" data-category=${a}>${a}</li>`;
      })
      .join('')
  );
  if (categiriesList.innerHTML) {
    categiriesList.insertAdjacentHTML(
      'afterbegin',
      `<li class="favorites-categoris-item" data-category="All categories">All categories</li>`
    );
  }
}
