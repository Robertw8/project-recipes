import { favoriteCategorisFilter } from './favorites-categoris-filter';
import { putFavorites } from './put-favorites';
const categorisList = document.querySelector('.favorites-categoris-list');
const dishesConteiner = document.querySelector('.favorites-dishes-conteiner');
const dishesList = document.querySelector('.favorites-dishes');
const favoritsHero = document.querySelector('.favorites-heroImg');
const favoritesInstead = document.querySelector('.favorites-instead');
const tabletHat = document.querySelector('.tablet-favorites-svg');
const phoneHat = document.querySelector('.phone-favorites-svg');

function hideElement(element, className) {
  element?.classList.add(className);
}

function favorites() {
  putFavorites(dishesList);
  favoriteCategorisFilter(categorisList);

  if (!dishesList?.innerHTML) {
    hideElement(dishesConteiner, 'd-none');
  }

  if (!dishesList?.innerHTML && window.innerWidth < 768) {
    hideElement(favoritsHero, 'd-none');
    hideElement(tabletHat, 'd-none');
    hideElement(categorisList, 'is-hidden');
  }

  if (!dishesList?.innerHTML && window.innerWidth >= 768) {
    hideElement(phoneHat, 'd-none');
    hideElement(categorisList, 'is-hidden');
  }
  if (dishesList?.innerHTML) {
    hideElement(favoritesInstead, 'd-none');
  }
}
favorites();
export { favorites };
import { onListClick } from '../add-to-favorite';
dishesList.addEventListener('click', onListClick);
