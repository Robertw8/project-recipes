import { getRequestsService } from './API/api-service.js';

const categoryBox = document.querySelector('.categories ul');

(async function allCategories() {
  try {
    const getAllCategories = await getRequestsService('categories');
    makeCategoryList(getAllCategories);
  } catch (error) {
    console.log(error);
  }
})();

function markup({ name }) {
  return `
  <li>
    <button type="button">${name}</button>
  </li>
  `;
}

function makeCategoryList(obj) {
  const category = obj.map(markup).join('');
  categoryBox.insertAdjacentHTML('beforeend', category);
}
