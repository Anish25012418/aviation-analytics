const BASE_URL = 'https://api.aviationstack.com/v1';
const ACCESS_KEY = import.meta.env.VITE_API_ACCESS_KEY

export const API_PATHS = {
  GET_AIRPORTS: `${BASE_URL}/airports?access_key=${ACCESS_KEY}`,
  GET_AIRLINES: `${BASE_URL}/airlines?access_key=${ACCESS_KEY}`,
  GET_FLIGHTS: `${BASE_URL}/flights?access_key=${ACCESS_KEY}`,
}