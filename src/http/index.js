/* eslint-disable no-param-reassign */
import axios from 'axios';

const $host = axios.create({
  baseURL: 'https://zhuro-shop-server.herokuapp.com/',
});

const $authHost = axios.create({
  baseURL: 'https://zhuro-shop-server.herokuapp.com/',
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost,
};
