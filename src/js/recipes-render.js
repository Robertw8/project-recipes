import { Toast } from './utilities/sweetalert';
import { getRequestsService } from './API/api-service';
import { onListClick } from './add-to-favorite';
import sprite from '/sprite.svg';
import { queryParams } from './API/query-params';

let totalPages;
let limit = window.innerWidth < 768 ? 6 : 9;
let totalResults;
export async function renderRecipes() {
  try {
    const response = await getRequestsService(
      `recipes?${queryParams.category}&page=${queryParams.page}&limit=${limit}&time=${queryParams.timeQuery}&area=${queryParams.areaQuery}&ingredient=${queryParams.ingredientQuery}`
    );
    const recipesArr = response.results;
    totalResults = recipesArr.length;
    if (totalResults < 9) {
      paginationWrap?.classList.add('is-hidden');
    }
    totalPages = response.totalPages;
    const markup = recipesArr
      .map(({ rating, title, description, preview, _id }) => {
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
      })
      .join('');
    const recipeListEl = document.querySelector('.recipe-list');
    recipeListEl?.addEventListener('click', onListClick);
    recipeListEl?.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    const defaultWindowEl = document.querySelector('.resipe-list-empty');
    const paginationEl = document.querySelector('.recipe-pagination');
    defaultWindowEl?.classList.remove('is-hidden');
    paginationEl?.classList.add('is-hidden');
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

export function displayPaginationBtns(value) {
  if (totalPages <= 1) {
    secondPageBtnEl?.classList.remove('is-hidden');
  } else if (totalPages === 2) {
    secondPageBtnEl?.classList.remove('is-hidden');
  } else if (totalPages === 3) {
    secondPageBtnEl?.classList.remove('is-hidden');
    thirdPageBtnEl?.classList.remove('is-hidden');
  } else {
    secondPageBtnEl?.classList.remove('is-hidden');
    thirdPageBtnEl?.classList.remove('is-hidden');
    morePageBtnEl?.classList.remove('is-hidden');
  }
}
displayPaginationBtns(totalPages);
export function minPagination() {
  window.innerWidth < 768
    ? morePageBtnEl?.classList.add('is-hidden')
    : morePageBtnEl?.classList.remove('is-hidden');
}
minPagination();

// PAGE 1; --DONE;
currentFirstPageBtnEl?.addEventListener('click', e => {
  if (queryParams.page === 1) {
    return Toast.fire({
      icon: 'info',
      title: 'You already on this page!',
    });
  } else if (queryParams.page === 2) {
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
    morePageBtnEl?.classList.remove('is-hidden');
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
secondPageBtnEl?.addEventListener('click', e => {
  if (queryParams.page === 1) {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
  } else if (queryParams.page !== Number(e.target.innerText)) {
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
thirdPageBtnEl?.addEventListener('click', e => {
  if (queryParams.page <= 2) {
    recipeListEl.innerHTML = '';
    queryParams.page = Number(e.target.innerText);
    renderRecipes();
    e.target.innerText = Number(e.target.innerText) + 1;
    secondPageBtnEl.textContent = queryParams.page;
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
  } else if (Number(e.target.innerText) === totalPages) {
    morePageBtnEl?.classList.add('is-hidden');
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
    morePageBtnEl?.classList.add('is-hidden');
  } else if (queryParams.page + 2 === totalPages) {
    queryParams.page += 1;
    recipeListEl.innerHTML = '';
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
    morePageBtnEl?.classList.add('is-hidden');
  } else {
    queryParams.page += 2;
    recipeListEl.innerHTML = '';
    renderRecipes();
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  }
});
// NEXT PAGE BTN; --DONE;
nextPageBtnEl?.addEventListener('click', e => {
  if (queryParams.page === 1) {
    recipeListEl.innerHTML = '';
    queryParams.page += 1;
    renderRecipes();
  } else if (queryParams.page === totalPages - 1) {
    recipeListEl.innerHTML = '';
    queryParams.page += 1;
    renderRecipes();
    morePageBtnEl.classList.remove('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
    morePageBtnEl?.classList.add('is-hidden');
  } else {
    recipeListEl.innerHTML = '';
    queryParams.page += 1;
    renderRecipes();
    morePageBtnEl?.classList.remove('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 1;
    secondPageBtnEl.textContent = queryParams.page;
    thirdPageBtnEl.textContent = queryParams.page + 1;
  }
});
// LAST PAGE BTN; --DONE;
lastPageBtnEl?.addEventListener('click', e => {
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
    morePageBtnEl?.classList.add('is-hidden');
    currentFirstPageBtnEl.textContent = queryParams.page - 2;
    secondPageBtnEl.textContent = queryParams.page - 1;
    thirdPageBtnEl.textContent = queryParams.page;
  }
});
// FIRST PAGE BTN; --DONE;
firstPageBtnEl?.addEventListener('click', e => {
  if (queryParams.page <= 2) {
    return;
  } else if (queryParams.page === totalPages) {
    recipeListEl.innerHTML = '';
    queryParams.page = 1;
    renderRecipes();
    morePageBtnEl?.classList.remove('is-hidden');
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
prevPageBtnEl?.addEventListener('click', e => {
  if (queryParams.page === 1) {
    return;
  } else if (queryParams.page === 2) {
    recipeListEl.innerHTML = '';
    queryParams.page = 1;
    renderRecipes();
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
