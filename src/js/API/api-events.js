import axios from 'axios';
// import Notiflix from 'notiflix';

const URL = 'https://tasty-treats-backend.p.goit.global/api/events';

const getEvents = async () => {
  try {
    const response = await axios.get(`${URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
    // Notiflix.Notify.failure('Sorry ERROR. Please try again.');
  }
};

export { getEvents };