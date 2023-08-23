import { putFavorites } from './put-favorites';

const dishesList = document.querySelector('.favorites-dishes');
const favoritsHero = document.querySelector('.favorites-heroImg');
const favoritesInstead = document.querySelector('.favorites-instead');
const tabletHat = document.querySelector('.tablet-favorites-svg');
const phoneHat = document.querySelector('.phone-favorites-svg');

function hideElement(element, className) {
  element?.classList.add(className);
}

putFavorites(dishesList);
function favorites() {
  if (!dishesList?.innerHTML && window.innerWidth < 768) {
    hideElement(favoritsHero, 'd-none');
    hideElement(tabletHat, 'd-none');
  }

  if (!dishesList?.innerHTML && window.innerWidth >= 768) {
    hideElement(phoneHat, 'd-none');
  }
  if (dishesList?.innerHTML) {
    hideElement(favoritesInstead, 'is-hidden');
  }
}

export { favorites };
