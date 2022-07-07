import { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context';

const useObserver = (observableElem, isLoading, totalPages) => {
  const { goods } = useContext(Context);
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    const cb = function (entries) {
      if (entries[0].isIntersecting && goods.page < totalPages) {
        goods.setPage(goods.page + 1);
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(observableElem.current);
  }, [isLoading]);
};

export default useObserver;
