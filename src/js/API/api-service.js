import axios from 'axios';
import { Toast } from '../utilities/sweetalert';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

export const getRequestsService = async (request, params) => {
  try {
    const response = await axios.get(`${BASE_URL}${request}`, params);
    return response.data;
  } catch (error) {
    Toast.fire({
      icon: 'error',
      title: 'Something went wrong, try reloading the page',
    });
  }
};
