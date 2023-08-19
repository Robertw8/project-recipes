function favorites() {
  const dishesList = document.getElementsByClassName('favorites-dishes')[0];
  const favoritsHero = document.getElementsByClassName('favorites-hero')[0];

  if (dishesList.childElementCount === 0) {
    favoritsHero.classList.add('d-none');
  }
}
export { favorites };
