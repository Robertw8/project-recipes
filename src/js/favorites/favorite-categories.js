const categiriesList = document.querySelector('.favorites-categoris');
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
        return `<li>${a}</li>`;
      })
      .join('')
  );
}
