import axios from 'axios';
//import from types
import { REGISTER_USER, LOGIN_USER, AUTH_USER } from './types';

// import from utils
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

export function auth() {
  const request = axios.get(`${USER_ROUTES}/auth`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
