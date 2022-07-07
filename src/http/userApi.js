import jwtDecode from 'jwt-decode';
import { $host, $authHost } from './index';

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password });
  localStorage.setItem('accessToken', data.accessToken);
  return data;
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('accessToken', data.accessToken);
  return jwtDecode(data.accessToken);
};

export const logout = async () => {
  const { data } = await $host.post('api/user/logout');
  localStorage.removeItem('accessToken');
  return data;
};

export const authCheck = async () => {
  const { data } = await $authHost.get('api/user/auth');
  return data;
};

export const basket = async (userId) => {
  const { data } = await $authHost.get('api/user/basket/:id', { userId });
  return data;
};

export const addToBasket = async (goodId, data) => {
  await $authHost.post(`api/good/goods/${goodId}/addToBasket`, data);
};

export const removeFromBasket = async (userId, number) => {
  await $authHost.post(`api/good/goods/${userId}/removeFromBasket`, { number });
};

export const passRecovery = async (email) => {
  const { data } = await $host.post('api/user/passRecovery', { email });
  return data;
};

export const passRecoveryVerif = async (email, password) => {
  const { data } = await $host.post('api/user/passRecovery/newPass', { email, password });
  return data;
};
