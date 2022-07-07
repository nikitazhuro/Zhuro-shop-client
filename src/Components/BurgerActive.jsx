import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from '../Styles/BurgerActive.module.css';

import { Context } from '../Context';

function BurgerActive({ ...props }) {
  const { goods, user } = useContext(Context);

  const [active, setActive] = useState({ activeMan: false, activeWoman: false });

  const womanClasses = [classes.BurgerActive_categories_woman];
  const manClasses = [classes.BurgerActive_categories_man];

  const sex = {
    male: 'male',
    female: 'female',
  };

  if (active.activeMan) {
    manClasses.push(classes.Active);
  }

  if (active.activeWoman) {
    womanClasses.push(classes.Active);
  }

  const makeWomanActiveAndUnactive = () => (
    !active.activeWoman
      ? setActive({ ...active, activeWoman: true, activeMan: false })
      : setActive({ ...active, activeWoman: false })
  );

  const makeManActiveAndUnactive = () => (
    !active.activeMan
      ? setActive({ ...active, activeMan: true, activeWoman: false })
      : setActive({ ...active, activeMan: false })
  );

  useEffect(() => {
    if (props.mainPageModalMen) {
      setActive({ ...active, activeMan: true });
    }
    if (props.mainPageModalWomen) {
      setActive({ ...active, activeWoman: true });
    }
  }, []);

  return (
    <div className={classes.BurgerActive}>
      <div className={classes.BurgerActive_categories}>
        <ul>
          <li>
            <span
              aria-hidden
              className={active.activeWoman && classes.active}
              onClick={makeWomanActiveAndUnactive}
            >
              Женщины
            </span>
            <ul className={womanClasses}>
              {goods.womenCategories.map((elem) => (
                <li
                  aria-hidden
                  onClick={() => window.location.reload()}
                  key={elem}
                >
                  <Link
                    to={`/goodsCategoryPage/${sex.female}&${elem}`}
                  >
                    {elem}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <span
              aria-hidden
              className={active.activeMan && classes.active}
              onClick={makeManActiveAndUnactive}
            >
              Мужчины
            </span>
            <ul className={manClasses}>
              {goods.menCategories.map((elem) => (
                <li
                  aria-hidden
                  onClick={() => window.location.reload()}
                  key={elem}
                >
                  <Link
                    to={`/goodsCategoryPage/${sex.male}&${elem}`}
                  >
                    {elem}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className={classes.BurgerActive_options}>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li>{user.isAuth ? <Link to={`/Basket/${user.user.id}`}>Корзина</Link> : <Link to="/Logon">Мой аккаунт</Link>}</li>
          <li>
            <button
              type="button"
              onClick={() => props.exit()}
            >
              Выйти
            </button>
          </li>
        </ul>
      </div>
      <div className={classes.darkTheme} />
    </div>
  );
}

export default BurgerActive;
