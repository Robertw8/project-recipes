const dishesList = document.getElementsByClassName('favorites-dishes');
const favoritsHero = document.getElementsByClassName('favorites-heroImg');
const favoritesInstead = document.getElementsByClassName('favorites-instead');
const tabletHat = document.getElementsByClassName('tablet-favorites-svg');
const phoneHat = document.getElementsByClassName('phone-favorites-svg');

function hideElement(element, className) {
  element.classList.add(className);
}

function favorites() {
  if (dishesList[0].childElementCount == 0 && window.innerWidth < 768) {
    hideElement(favoritsHero[0], 'd-none');
    hideElement(tabletHat[0], 'd-none');
  }

  if (dishesList[0].childElementCount == 0 && window.innerWidth >= 768) {
    hideElement(phoneHat[0], 'd-none');
  }
  if (dishesList[0].childElementCount !== 0) {
    hideElement(favoritesInstead[0], 'is-hidden');
  }
}

export { favorites };
