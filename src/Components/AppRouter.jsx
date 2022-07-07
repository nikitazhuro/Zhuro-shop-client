/* eslint-disable no-nested-ternary */
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Context } from '../Context';
import { publicRoutes, privateRoutes, adminRoutes } from '../Router';

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    user?.isAuth
      ? user?.user?.role === 'admin'
        ? (
          <Routes>
            {adminRoutes.map((page) => (
              <Route
                key={page.element}
                path={page.path}
                exact={page.exact}
                element={page.element}
              />
            ))}
          </Routes>
        )
        : (
          <Routes>
            {privateRoutes.map((page) => (
              <Route
                key={page.element}
                path={page.path}
                exact={page.exact}
                element={page.element}
              />
            ))}
          </Routes>
        )
      : (
        <Routes>
          {publicRoutes.map((page) => (
            <Route
              key={page.element}
              path={page.path}
              exact={page.exact}
              element={page.element}
            />
          ))}
        </Routes>
      )

  );
});

export default AppRouter;
