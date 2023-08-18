const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';
const galeryPopularRecipes = document.querySelector('.gallery-popular-recipes');
import axios from "axios";


export const getImageApi = async () => {
          try {
        const { data } = await axios(`${BASE_URL}`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

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
    const data = await getImageApi();
    const markup = data.map(recipe => createMarkup(recipe)).join('');
        galeryPopularRecipes.innerHTML = markup;
    } catch (error) {
        console.log(error.message);
    }
}
   
