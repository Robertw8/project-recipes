import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

export const getRequestsService = async (request, params) => {
  try {
    const response = await axios.get(`${BASE_URL}${request}`, params);
    return response.data;
  } catch (error) {
    //* Потім замінити на нотифікашки
    console.log(error);
  }
};
