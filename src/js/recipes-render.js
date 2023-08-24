import { Toast } from './utilities/sweetalert';
import { getRequestsService } from './API/api-service';
import { onListClick } from './add-to-favorite';
import sprite from '../public/sprite.svg';
import { checkIfRecipeInFav } from './add-to-favorite';
import { queryParams } from './API/query-params';

// let page = 1;
let totalPages;
let limit;
checkLimit();
let totalResults;
export async function renderRecipes() {
  try {
    const response = await getRequestsService(
      `recipes?page=${queryParams.page}&limit=${limit}`
    );
    const recipesArr = response.results;
    totalResults = recipesArr.length;
    totalPages = response.totalPages;
    let markup;
    markup = recipesArr
      .map(({ rating, title, description, preview, _id }) => {
        const existingFvrts =
          JSON.parse(localStorage.getItem('favorites')) || [];
        const isRecipeInFvrts = checkIfRecipeInFav(existingFvrts, _id);
        if (isRecipeInFvrts) {
          return `
          <li class="recipe-item" id="${_id} data-title="${title}">
              <img class="recipe-img" loading="lazy"
                  src="${preview}"
                  alt="${title}"
                  width="335"
                  height="335"
                  >
              <div class="recipe-wrap">
                  <div class="top-wrap">
                      <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                          <svg class="recipe-favorite-icon" width="30" height="30"><use data-id="${_id}" class="added-heart-icon" href="${sprite}#icon-heart"></use></svg>
                      </button>
                  </div>
                  <div class="bottom-wrap">
                      <h2 class="recipe-name">${title}</h2>
                      <p class="recipe-description">${description}</p>
                      <div class="recipe-rating-wrap">
                          <p class="recipe-rating">${rating}<span class="recipe-stars">
                          <svg class="recipe-stars-icon" width="84" height="18"><use class="stars-icon" href="${sprite}#icon-${Math.round(
            rating - 0.1
          )}-stars"></use></svg>
                          </span></p>
                          <button data-id="${_id}" class="recipe-see" type="button">See recipe</button>
                  </div>
                  </div>
              </div>
          `;
        } else {
          return `
          <li class="recipe-item" id="${_id} data-title="${title}">
              <img class="recipe-img" loading="lazy"
                  src="${preview}"
                  alt="${title}"
                  width="335"
                  height="335"
                  >
              <div class="recipe-wrap">
                  <div class="top-wrap">
                      <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                          <svg class="recipe-favorite-icon" width="30" height="30"><use data-id="${_id}" class="heart-icon" href="${sprite}#icon-heart"></use></svg>
                      </button>
                  </div>
                  <div class="bottom-wrap">
                      <h2 class="recipe-name">${title}</h2>
                      <p class="recipe-description">${description}</p>
                      <div class="recipe-rating-wrap">
                          <p class="recipe-rating">${rating}<span class="recipe-stars">
                          <svg class="recipe-stars-icon" width="84" height="18"><use class="stars-icon" href="${sprite}#icon-${Math.round(
            rating - 0.1
          )}-stars"></use></svg>
                          </span></p>
                          <button data-id="${_id}" class="recipe-see" type="button">See recipe</button>
                  </div>
                  </div>
              </div>
          `;
        }
      })
      .join('');
    const recipeListEl = document.querySelector('.recipe-list');
    recipeListEl.addEventListener('click', onListClick);
    recipeListEl.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    const defaultWindowEl = document.querySelector('.resipe-list-empty');
    const paginationEl = document.querySelector('.recipe-pagination');
    defaultWindowEl.classList.remove('is-hidden');
    paginationEl.classList.add('is-hidden');
    Toast.fire({
      icon: 'error',
      title:
        'Something went wrong, we found 0 recipes. Try reloading the page!',
    });
  }
}
renderRecipes();

//PAGINATION//
const paginationWrap = document.querySelector('.recipe-pagination');
const recipeListEl = document.querySelector('.recipe-list');
const firstPageBtnEl = document.querySelector('.first-page');
const prevPageBtnEl = document.querySelector('.previous-page');
const currentFirstPageBtnEl = document.querySelector('.current-page-1');
const secondPageBtnEl = document.querySelector('.page-2');
const thirdPageBtnEl = document.querySelector('.page-3');
const morePageBtnEl = document.querySelector('.page-5');
const nextPageBtnEl = document.querySelector('.next-page');
const lastPageBtnEl = document.querySelector('.last-page');

export function checkLimit() {
  if (window.innerWidth < 768) {
    return (limit = 6);
  } else if (window.innerWidth < 1280) {
    return (limit = 8);
  } else {
    return (limit = 9);
  }
} // ЛИМИТ ЭЛЕМЕНТОВ MOBILE/TABLET/DESKTOP

export function displayPaginationBtns(value) {
  if (totalPages <= 1) {
    secondPageBtnEl.classList.remove('is-hidden');
  } else if (totalPages === 2) {
    secondPageBtnEl.classList.remove('is-hidden');
  } else if (totalPages === 3) {
    secondPageBtnEl.classList.remove('is-hidden');
    thirdPageBtnEl.classList.remove('is-hidden');
  } else {
    secondPageBtnEl.classList.remove('is-hidden');
    thirdPageBtnEl.classList.remove('is-hidden');
    morePageBtnEl.classList.remove('is-hidden');
  }
} // ОТОБРАЖЕНИЕ КНОПОК PAGE 1/2/3 В ЗАВИСИМОСТИ ОТ КОЛЛ-ВА СТРАНИЦ
displayPaginationBtns(totalPages);

export function minPagination(results) {
  if (window.innerWidth < 768 && totalResults < 6) {
    paginationWrap.classList.add('is-hidden');
  } else if (window.innerWidth < 1280 && totalResults < 8) {
    paginationWrap.classList.add('is-hidden');
  } else if (totalResults < 9) {
    paginationWrap.classList.add('is-hidden');
  } else return;
} // ОТОБОРАЖЕНИЕ ПАГИНАЦИИ В ЗАВИСИМОСТИ ОТ КОЛЛ-ВА СТРАНИЦ
minPagination(totalResults);

// PAGE 1; --DONE;
currentFirstPageBtnEl.addEventListener('click', e => {
  if (queryParams.page === 1) {
    return Toast.fire({
      icon: 'info',
      title: 'You already on this page!',
    });
  } else if (queryParams.page === 2) {
    secondPageBtnEl.classList.remove('current-pagi-page');
    currentFirstPageBtnEl.classList.add('current-pagi-page');
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
  } else if (
    queryParams.page === totalPages ||
    Number(thirdPageBtnEl.textContent) === totalPages
  ) {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
    morePageBtnEl.classList.remove('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  }
});
// PAGE 2 ;--DONE;
secondPageBtnEl.addEventListener('click', e => {
  if (queryParams.page === 1) {
    recipeListEl.innerHTML = '';
    secondPageBtnEl.classList.add('current-pagi-page');
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
  } else if (page !== Number(e.target.innerText)) {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
  } else {
    return Toast.fire({
      icon: 'info',
      title: 'You already on this page!',
    });
  }
});
// PAGE 3; --DONE;
thirdPageBtnEl.addEventListener('click', e => {
  if (queryParams.page <= 2) {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    secondPageBtnEl.classList.add('current-pagi-page');
    renderRecipes();
    e.target.innerText = Number(e.target.innerText) + 1;
    secondPageBtnEl.textContent = queryParams.page;
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
  } else if (Number(e.target.innerText) === totalPages - 1) {
    morePageBtnEl.classList.add('is-hidden');
    queryParams.page = totalPages - 1;
    renderRecipes();
    thirdPageBtnEl.textContent = queryParams.page;
    secondPageBtnEl.textContent = queryParams.page - 1;
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    return Toast.fire({
      icon: 'info',
      title: 'That was the last page',
    });
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
    e.target.innerText = Number(e.target.innerText) + 1;
    secondPageBtnEl.textContent = queryParams.page;
    currentFirstPageBtnEl.textContent = Number(e.target.innerText) - 2;
  }
});
// MORE NEXT BTN; --DONE;
morePageBtnEl.addEventListener('click', e => {
  if (queryParams.page + 3 === totalPages) {
    queryParams.page += 2;
    recipeListEl.innerHTML = '';
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
    morePageBtnEl.classList.add('is-hidden');
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    secondPageBtnEl.classList.add('current-pagi-page');
  } else if (queryParams.page + 2 === totalPages) {
    queryParams.page += 1;
    recipeListEl.innerHTML = '';
    renderRecipes();
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    secondPageBtnEl.classList.add('current-pagi-page');
    currentFirstPageBtnEl.textContent = page - 2;
    secondPageBtnEl.textContent = page - 1;
    thirdPageBtnEl.textContent = page;
    morePageBtnEl.classList.add('is-hidden');
  } else {
    queryParams.page += 2;
    recipeListEl.innerHTML = '';
    renderRecipes();
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    secondPageBtnEl.classList.add('current-pagi-page');
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  }
});
// NEXT PAGE BTN; --DONE;
nextPageBtnEl.addEventListener('click', e => {
  if (queryParams.page === 1) {
    recipeListEl.innerHTML = '';
    queryParams.page += 1;
    secondPageBtnEl.classList.add('current-pagi-page');
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    renderRecipes();
  } else if (queryParams.page + 1 === totalPages) {
    // recipeListEl.innerHTML = '';
    // page += 1;
    // renderRecipes();
    // morePageBtnEl.classList.remove('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
    morePageBtnEl.classList.add('is-hidden');
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page += 1;
    secondPageBtnEl.classList.add('current-pagi-page');
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    renderRecipes();
    morePageBtnEl.classList.remove('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  }
});
// LAST PAGE BTN; --DONE;
lastPageBtnEl.addEventListener('click', e => {
  if (
    queryParams.page === totalPages ||
    queryParams.page === totalPages - 1 ||
    queryParams.page === totalPages - 2
  ) {
    return;
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page = totalPages;
    renderRecipes();
    currentFirstPageBtnEl.classList.remove('current-pagi-page');
    thirdPageBtnEl.classList.add('current-pagi-page');
    morePageBtnEl.classList.add('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
  }
});
// FIRST PAGE BTN; --DONE;
firstPageBtnEl.addEventListener('click', e => {
  if (queryParams.page <= 2) {
    return;
  } else if (queryParams.page === totalPages) {
    recipeListEl.innerHTML = '';
    queryParams.page = 1;
    renderRecipes();
    currentFirstPageBtnEl.classList.add('current-pagi-page');
    secondPageBtnEl.classList.remove('current-pagi-page');
    thirdPageBtnEl.classList.remove('current-pagi-page');
    morePageBtnEl.classList.remove('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page;
    secondPageBtnEl.textContent = queryParams.page + 1;
    thirdPageBtnEl.textContent = queryParams.page + 2;
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page = 1;
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page;
    secondPageBtnEl.textContent = queryParams.page + 1;
    thirdPageBtnEl.textContent = queryParams.page + 2;
  }
});
// PREV PAGE BTN; --DONE;
prevPageBtnEl.addEventListener('click', e => {
  if (queryParams.page === 1) {
    return;
  } else if (queryParams.page === 2) {
    recipeListEl.innerHTML = '';
    queryParams.page = 1;
    renderRecipes();
    currentFirstPageBtnEl.classList.add('current-pagi-page');
    secondPageBtnEl.classList.remove('current-pagi-page');
    currentFirstPageBtnEl.textContent = queryParams.page;
    secondPageBtnEl.textContent = queryParams.page + 1;
    thirdPageBtnEl.textContent = queryParams.page + 2;
  } else if (
    Number(secondPageBtnEl.textContent) === totalPages ||
    Number(thirdPageBtnEl.textContent) === totalPages
  ) {
    recipeListEl.innerHTML = '';
    queryParams.page -= 1;
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page -= 1;
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  }
});
