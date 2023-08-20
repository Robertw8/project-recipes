import { getRequestsService } from './API/api-service.js';
import { queryParams } from './search-filters/requests.js';

const categoryBox = document.querySelector('.categories ul');
const categories = document.querySelector('.categories');

document.addEventListener('DOMContentLoaded', getAllCategories);
document.removeEventListener('load', getAllCategories);
categories.addEventListener('click', onClick);

async function getAllCategories() {
  try {
    const allCategories = await getRequestsService('categories');
    makeCategoryList(allCategories);
  } catch (error) {
    console.log(error);
  }
}

function onClick(evt) {
  const isButton = evt.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  queryParams.category = evt.target.textContent;
  console.dir(queryParams);
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

function clearBox() {
  categoryBox.innerHTML = '';
}
