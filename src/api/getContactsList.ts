import axios, { AxiosResponse } from 'axios';
import { Contact } from '../types/contact';

const getContactsList = async (): Promise<Contact[]> => {
  try {
    const response: AxiosResponse<{ contacts: Contact[] }> = await axios.get('https://api.npoint.io/76e59c76f1d150e47618');
    return response.data.contacts;
  } catch (error) {
    console.error('Error fetching contacts list:', error);
    throw error;
  }
};

export default getContactsList;
