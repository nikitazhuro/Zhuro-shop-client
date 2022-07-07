import { useContext, useMemo } from 'react';

import { Context } from '../Context';

export const useSearchGoods = (filter) => {
  const { goods } = useContext(Context);
  const searchGoods = useMemo(() => goods.goods.filter((good) => (
    good.title.toLocaleLowerCase().includes(filter.search.toLocaleLowerCase())
  )), [filter.search]);
  return searchGoods;
};

export const useSearchAndFilterSex = (filter) => {
  const searchGoodsSearch = useSearchGoods(filter);
  const searchAndFilterSex = useMemo(() => {
    if (filter.sex) {
      return searchGoodsSearch.filter((elem) => elem.sex === filter.sex);
    }
    return searchGoodsSearch;
  }, [searchGoodsSearch, filter.sex]);
  return searchAndFilterSex;
};

export const useSearchAndFilterSize = (filter, size) => {
  const searchGoods = useSearchAndFilterSex(filter);
  const searchAndFilterSize = useMemo(() => (
    searchGoods.filter((elem) => (!size.length || elem.sizes[0].some((e) => size.includes(e))))
  ), [size, searchGoods]);
  return searchAndFilterSize;
};

export const useSearchAndFilter = (filter, size, color) => {
  const searchGoods = useSearchAndFilterSize(filter, size);
  const searchAndFilter = useMemo(() => (
    searchGoods.filter((elem) => (!color.length || elem.colors.some((e) => color.includes(e))))
  ), [color, searchGoods]);
  return searchAndFilter;
};
