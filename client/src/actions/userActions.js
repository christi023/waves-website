import axios from 'axios';
//import from types
import { REGISTER_USER } from './types';
import { LOGIN_USER } from './types';

import { USER_ROUTES } from '../components/utils/misc';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_ROUTES}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_ROUTES}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
