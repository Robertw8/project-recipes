import axios from "axios";


const openModalButton = document.querySelector('.open');
const modalRecipeBackDrop = document.querySelector('.recipe-backdrop');
const modalRecipe = document.getElementById('modal-recipe');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.recipe-btn-close');

modal.style.display = 'none';

openModalButton.addEventListener('click', openModal);
function openModal(){
    modal.style.display = 'block';
}

closeModalButton.addEventListener('click', closeModal);

function closeModal(){
    modal.style.display = 'none';
}

modalRecipeBackDrop.addEventListener('click', modalBackDrop);

function modalBackDrop (event){
    if (event.target === modalRecipeBackDrop) {
        modal.style.display = 'none';
      }
}

document.addEventListener('keydown', closeEsc);
function closeEsc (event){
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
}


export { openModalButton, modalRecipe, modal, closeModalButton, closeEsc, modalBackDrop, closeModal, openModal };




const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

// const getRecipes = async () => {
//   try {
//     return await axios.get(`${URL}`);
//   } catch (error) {
//     console.log(error);
    
//   }
// };


// getRecipes()
//   .then(response => {
//     console.log('data:', response.data); 
//   })
//   .catch(error => {
//     console.error(error);
  
//   });


const getRecipeDetails = async (recipeID) => {
    try {
      const response = await axios.get(`${URL}${recipeID}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createRecipeMarkup = (recipeData) => {
    
    const ingredientsList = recipeData.ingredients.map(ingredient => `
      <li>${ingredient.name} - ${ingredient.measure}</li>
    `).join('');
  
    const markup = `
      <div class="recipe-details">
      
        <h2>${recipeData.title}</h2>
        <p>Rating: ${recipeData.rating}</p>
        <p>Cooking Time: ${recipeData.time} mins</p>
        <h3>Ingredients:</h3>
        <ul>
          ${ingredientsList}
        </ul>
        <h3>Tags:</h3>
        <ul>
          ${recipeData.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipeData.instructions}</p>
      
      </div>
    `;
    return markup;
  };

  const recipeID = '6462a8f74c3d0ddd28897fdf'; // _id рецепту, треба щоб передавали 
  const markUpElement = document.querySelector('.markUp');
  
  getRecipeDetails(recipeID)
    .then(recipeData => {
      if (recipeData) {
        const recipeMarkup = createRecipeMarkup(recipeData);
        markUpElement.innerHTML = recipeMarkup; // Вставте отриману розмітку у .markUp
      } else {
        // Обробка ситуації, коли не вдалося отримати дані рецепту
      }
    })
    .catch(error => {
      console.error(error);
      
    });


    // <div class="recipe-video">
    //   <iframe width="295" height="295" src="https://www.youtube.com/embed/${recipeData.youtube}" frameborder="0" allow="autoplay; encrypted-media; fullscreen"></iframe>
    // </div>