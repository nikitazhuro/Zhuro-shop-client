import { $host, $authHost } from './index';

export const createGood = async (formData) => {
  const { data } = await $authHost.post('api/good/createGood', formData);
  return data;
};

export const getAll = async () => {
  const { data } = await $host.get('api/good/goods');
  return data;
};

export const getAllCategorySort = async (sexId, category, page, limit) => {
  const { data } = await $host.get(`api/good/goodsCategoryPage/${sexId}&${category}`, { params: { page, limit } });
  return data;
};

export const getOneGood = async (goodId) => {
  const { data } = await $host.get(`api/good/goods/${goodId}`);
  return data;
};

export const removeOne = async (goodId) => {
  await $authHost.get(`api/good/goods/${goodId}/removeOne`);
};

export const updateOne = async (goodId, data) => {
  await $authHost.post(`api/good/goods/${goodId}/updateOne`, data);
};

export const addData = async (goodId, data) => {
  await $authHost.post(`api/good/goods/${goodId}/addData`, data);
};
