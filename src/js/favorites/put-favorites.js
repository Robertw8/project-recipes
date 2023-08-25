import { makeCategories } from './favorite-categories';
import sprite from '/sprite.svg';

export function putFavorites(element) {
  const localArray = JSON.parse(localStorage.getItem('favorites'));
  const buffer = localArray
    .map(({ rating, title, description, preview, _id, category }) => {
      return `
    <li class="recipe-item recipe-item-favorites" data-title="${title}" data-category="${category}">
        <img class="recipe-img" loading="lazy"
            src="${preview}"
            alt="${title}"
            width="335"
            height="335"
            >
        <div class="recipe-wrap">
            <div class="top-wrap">
                <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                    <svg class="recipe-favorite-icon" width="22" height="22"><use data-id="${_id}" class="added-heart-icon" href="${sprite}#icon-heart"></use></svg>
                </button>
            </div>
            <div class="bottom-wrap">
                <h2 class="recipe-name">${title}</h2>
                <p class="recipe-description">${description}</p>
                <div class="recipe-rating-wrap">
                    <p class="recipe-rating">${rating}<span class="recipe-stars">
                    <svg class="recipe-stars-icon" width="84" height="18" >
                    <use class="stars-icon" href="${sprite}#icon-${Math.round(
        rating - 0.1
      )}-stars">
                    </use></svg>
                    </span></p>
                    <button id="recipe-see-favorites" data-id=${_id} class=" recipe-see" type="button" >See recipe</button>
            </div>
            </div>
        </div>
    `;
    })
    .join('');
  element.insertAdjacentHTML('beforeend', buffer);
  //remove
  element.addEventListener('click', removeFavorits);
  function removeFavorits(evnt) {
    if (!evnt.target.classList.contains('added-heart-icon')) {
      return;
    }
    //видалення рецепту з ul
    evnt.target.closest('.recipe-item').remove();
    //видалення рецепту зі сховища
    const currentId = evnt.target.getAttribute('id');
    //створення нового сховища
    const newStorage = JSON.parse(localStorage.getItem('favorites')).filter(
      a => a._id !== currentId
    );
    //перезалив сховища
    localStorage.setItem('favorites', JSON.stringify(newStorage));
    //викликаємо функцію створення категорій щоб вона переписала наш список
    makeCategories();
  }
  //створюються категорії для рецептів зразу як створились рецепти
  makeCategories();
}
