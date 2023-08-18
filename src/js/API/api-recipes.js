import axios from 'axios';
// import Notiflix from 'notiflix';

const RECIPES_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes?page=1&limit=9';

const getRecipes = async () => {
  try {
    return await axios.get(`${RECIPES_URL}`);
  } catch (error) {
    console.log(error);
  }
};
export { getRecipes };