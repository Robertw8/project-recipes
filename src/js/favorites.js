// const dishesList = document.getElementsByClassName('favorites-dishes');
// const favoritsHero = document.getElementsByClassName('favorites-heroImg');
// const favoritesInstead = document.getElementsByClassName('favorites-instead');
// const tabletHat = document.getElementsByClassName('tablet-favorites-svg');
// const phoneHat = document.getElementsByClassName('phone-favorites-svg');

// function hideElement(element, className) {
//   element.classList.add(className);
// }

// function favorites() {
//   if (!dishesList.innerHTML && window.innerWidth < 768) {
//     hideElement(favoritsHero[0], 'd-none');
//     hideElement(tabletHat[0], 'd-none');
//   }

//   if (!dishesList.innerHTML && window.innerWidth >= 768) {
//     hideElement(phoneHat[0], 'd-none');
//   }
//   if (dishesList.innerHTML) {
//     hideElement(favoritesInstead[0], 'is-hidden');
//   }
//   console.log('djfsvnksfjvnsjovdnskdjvnj');
// }

// export { favorites };

// //
const dishesList = document.querySelector('.favorites-dishes');
const favoritsHero = document.querySelector('.favorites-heroImg');
const favoritesInstead = document.querySelector('.favorites-instead');
const tabletHat = document.querySelector('.tablet-favorites-svg');
const phoneHat = document.querySelector('.phone-favorites-svg');

function hideElement(element, className) {
  element?.classList.add(className);
}

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

// window.matchMedia('(min-width: 768px)').addEventListener('change', favorites);

export { favorites };
