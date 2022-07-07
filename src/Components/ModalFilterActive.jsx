/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import classes from '../Styles/ModalFilterActive.module.css';

import { Context } from '../Context';

const ModalFilterActive = observer(({
  sizes, onChangeSize, onChangeColor, colors,
}) => {
  const { goods } = useContext(Context);
  const color = (value) => {
    if (!goods.activeColors.includes(value)) {
      goods.addActiveColor(value);
    } else {
      goods.filterActiveColors(value);
    }
    onChangeColor(value, goods.activeColors);
  };
  const size = (value) => {
    if (!goods.activeSizes.includes(value)) {
      goods.addActiveSize(value);
    } else {
      goods.filterActiveSizes(value);
    }
    onChangeSize(value, goods.activeSizes);
  };
  return (
    <div>
      <div className={classes.ModalFilterActive_content}>
        <div className={classes.sizeBlock}>
          <h1>
            Размер
            {' '}
            {goods.activeSizes.length !== 0 && `(${goods.activeSizes.length})`}
          </h1>
          <form className={classes.sizeBlock_content}>
            {sizes.map((e) => (
              <div key={e}>
                <label>
                  <div style={{ display: 'none' }}>
                    <input onClick={(elem) => size(elem.target.value)} type="checkbox" value={e} />
                  </div>
                  <span
                    style={{ cursor: 'pointer' }}
                    className={goods.activeSizes.includes(e) ? classes.Active : classes.unActive}
                  >
                    {e}
                  </span>
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className={classes.colorBlock}>
          <h1>
            Цвет
            {' '}
            {goods.activeColors.length !== 0 && `(${goods.activeColors.length})`}
          </h1>
          <form className={classes.colorBlock_content}>
            {colors.map((e) => (
              <div key={e} className={classes.colorElem}>
                <label>
                  <div style={{ display: 'none' }}>
                    <input onClick={(elem) => color(elem.target.value)} type="checkbox" value={e} />
                  </div>
                  <span
                    style={{ cursor: 'pointer' }}
                    className={goods.activeColors.includes(e) ? classes.Active : classes.unActive}
                  >
                    {e}
                  </span>
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
});

export default ModalFilterActive;
