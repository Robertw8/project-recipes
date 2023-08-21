
import { getRequestsService } from './API/api-service.js';
import { Toast } from './utilities/sweetalert.js';
import { openModal } from './modal-recipe.js';

const galeryPopularRecipes = document.querySelector('.gallery-popular-recipes');

export function createMarkup(data) {
    const { preview, _id, description, title } = data;
    return `
      
<li class="popular-recipes-list">
  
     <img id='${_id}' class="popular-img" src=${preview} alt="${title}" width="64px" height="64px">
  <div class="popular-wrapper">
    <h3 class="popular-title">${title}</h3>
    <p class="popular-recipes-text">${description}</p>
    </div>
</li>

`
}
       
export async function renderElement() {
    
    try {
        const data = await getRequestsService('recipes/popular');
        const markup = data.map(recipe => createMarkup(recipe)).join('');
        galeryPopularRecipes.innerHTML = markup;

        onClickPopularCard()
    } catch (error) {
        Toast.fire({
      icon: 'error',
      title: 'Something went wrong, try reloading the page',
    });
    }
}
 
async function onClickPopularCard() {
    galeryPopularRecipes.addEventListener('click', async event => {
        const clickedImg = event.target.closest('.popular-img');
        
        if (clickedImg) {
            try {
                const recipeID = clickedImg.id;
                await openModal(recipeID);
            } catch (error) {
                 Toast.fire({
                    icon: 'error',
                    title: 'Something went wrong, try reloading the page',
                     });
            }
        }
    });
}
