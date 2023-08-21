import { getRequestsService } from './API/api-service.js';
import { executeRequest, queryParams } from './search-filters/requests.js';
import { Toast } from './utilities/sweetalert.js';

const categories = document.querySelector('.categories');
const categoryBox = document.querySelector('.categories ul');

document.addEventListener('DOMContentLoaded', getAllCategories);
document.removeEventListener('load', getAllCategories);

categories?.addEventListener('click', onClick);

// Функція для отримання усіх категорій при стартовому рендерингу
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

// Обробник події в цілому блоці '.categories'
function onClick(evt) {
  // перевіряємо чи це кнопка
  const elem = evt.target;
  if (elem.nodeName !== 'BUTTON') {
    return;
  }

  // забираємо і ставимо активний клас категорії
  const searchActiveClass = categories.querySelector('.active-category');
  searchActiveClass.classList.toggle('active-category');
  elem.classList.toggle('active-category');

  // перевіряємо чи клікнули по кнопці "All categories"
  const isAllCategoriesBtn = elem.classList.contains('all-categories-btn');

  // записуємо значення в об'єкт запиту
  queryParams.category = isAllCategoriesBtn ? '' : elem.textContent;

  // виконуємо запит
  executeRequest();
}

// Функція рендерингу всіх категорій в контейнер
function makeCategoryList(obj) {
  clearBox();
  const category = obj.map(markup).join('');
  categoryBox.insertAdjacentHTML('beforeend', category);
}

// Функція розмітки
function markup({ name }) {
  return `
  <li>
    <button type="button">${name}</button>
  </li>
  `;
}

// Функція очистки контейнера
function clearBox() {
  categoryBox.innerHTML = '';
}
