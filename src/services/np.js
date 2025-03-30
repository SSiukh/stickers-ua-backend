import axios from 'axios';
import { getEnvVar } from '../utils/getEnvVar.js';

axios.defaults.baseURL = 'https://api.novaposhta.ua/v2.0/json';

export const getAllLocations = async (CityName, Limit, Page) => {
  const requestBody = {
    apiKey: getEnvVar('NP_APIKEY'),
    modelName: 'AddressGeneral',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName,
      Limit,
      Page,
    },
  };

  const { data } = await axios.post('/', requestBody);
  return data.data;
};
