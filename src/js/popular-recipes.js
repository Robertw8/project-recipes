
const galeryPopularRecipes = document.querySelector('.gallery-popular-recipes');
import {getRequestsService} from './API/api-service.js'

export function createMarkup(data) {
    const { preview, description, title } = data;
   
    return `
      
<li class="popular-recipes-list">
  
     <img class="popular-img" src=${preview} alt="${title}" width="64px" height="64px">
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
    } catch (error) {
        console.log(error.message);
    }
}
   
