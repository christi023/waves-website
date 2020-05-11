import axios from 'axios';
//import from types
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from './types';

// import from utils -PRODUCT ROUTES
import { PRODUCT_ROUTES } from '../components/utils/misc';

// get products by sell function
export function getProductsBySell() {
  //?sortBy = sold & order=desc & limit=4
  const request = axios
    .get(`${PRODUCT_ROUTES}/articles?sortBy=sold&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request,
  };
}

// get products by arrival function
export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_ROUTES}/articles?sortBy=createAt&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request,
  };
}
