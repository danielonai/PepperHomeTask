import axios, { AxiosResponse } from 'axios';
import { User } from '../types/user';

const getUser = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get('https://api.npoint.io/3fc8f279899456907de0');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export default getUser;
