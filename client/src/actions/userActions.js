import axios from 'axios';
//import from types
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from './types';

// import from utils - USER ROUTES
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

// Login User
export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_ROUTES}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// Logout User
export function logoutUser() {
  const request = axios.get(`${USER_ROUTES}/me/logout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

// auth
export function auth() {
  const request = axios.get(`${USER_ROUTES}/auth`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
