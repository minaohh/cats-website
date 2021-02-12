import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const CAT_API_KEY = 'a403c667-1377-4864-820d-42216a701449';

const catsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.headers.common = {
  'x-api-key': CAT_API_KEY,
};

export { catsApi };
