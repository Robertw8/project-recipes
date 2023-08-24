export function favoriteCategorisFilter(element) {
  const recipeArray = document.querySelectorAll('.recipe-item');
  const buttonArray = document.querySelectorAll('.favorites-categoris-item');

  //element це тег ul у якому лежать всі кнопки
  element.addEventListener('click', filter);
  function filter(evnt) {
    //якшо клацнули не на li то return
    if (evnt.target.tagName !== 'LI') {
      return;
    }
    //обнулюю свої класи
    buttonArray.forEach(a => {
      a.classList.remove('favorites-categoris-choosen');
    });
    //добавили зелений колір кнопці
    evnt.target.classList.add('favorites-categoris-choosen');
    //при кліку на  All categoris показуємо все і виходимо з функції
    if (evnt.target.dataset.category == 'All categories') {
      recipeArray.forEach(a => {
        a.classList.remove('d-none');
      });
      return;
    }
    //прохлджуся по всіх li
    recipeArray.forEach(a => {
      //обнулюю свої класи
      a.classList.remove('d-none');
      //показую тільки той li який співпадає з кнопкою
      if (a.dataset.category !== evnt.target.dataset.category) {
        a.classList.add('d-none');
      }
    });
  }
}
