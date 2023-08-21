import { getRequestsService } from './API/api-service.js';
import { executeRequest, queryParams } from './search-filters/requests.js';
import { Toast } from './utilities/sweetalert.js';

const categoryBox = document.querySelector('.categories ul');
const categoriesList = document.querySelector('.categories-list');
const allCategoriesBtn = document.querySelector('.all-categories-btn');

document.addEventListener('DOMContentLoaded', getAllCategories);
document.removeEventListener('load', getAllCategories);
allCategoriesBtn?.addEventListener('click', onAllCategoriesClick);
categoriesList?.addEventListener('click', onClick);

async function getAllCategories() {
  try {
    const allCategories = await getRequestsService('categories');
    makeCategoryList(allCategories);
  } catch (error) {
    Toast.fire({
      icon: 'error',
      title: 'Something went wrong. Reload the page and try again',
    });
  }
}

function onClick(evt) {
  const isButton = evt.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  queryParams.category = evt.target.textContent;
  executeRequest();
}

function makeCategoryList(obj) {
  clearBox();
  const category = obj.map(markup).join('');
  categoryBox.insertAdjacentHTML('beforeend', category);
}

function markup({ name }) {
  return `
  <li>
    <button type="button">${name}</button>
  </li>
  `;
}

function onAllCategoriesClick() {
  queryParams.category = '';
  executeRequest();
}

function clearBox() {
  categoryBox.innerHTML = '';
}
