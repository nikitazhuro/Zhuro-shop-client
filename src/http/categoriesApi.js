import { $host, $authHost } from './index';

export const createCategoryMen = async (categories) => {
  await $authHost.post('api/categories/createCategoryMen', { categories });
};

export const createCategoryWomen = async (categories) => {
  await $authHost.post('api/categories/createCategoryWomen', { categories });
};

export const getAllCategories = async () => {
  const { data } = await $host.get('api/categories/allCategories');
  return data;
};

export const removeCategoryMen = async (categories) => {
  await $authHost.post('api/categories/removeCategoryMen', { categories });
};

export const removeCategoryWomen = async (categories) => {
  await $authHost.post('api/categories/removeCategoryWomen', { categories });
};
