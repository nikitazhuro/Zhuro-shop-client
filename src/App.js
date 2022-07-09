import React, { useContext, useEffect, useState } from 'react';
import decodeToken from 'jwt-decode';
import { BrowserRouter } from 'react-router-dom';

import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { getAllCategories } from './http/categoriesApi';
import AppRouter from './Components/AppRouter';
import './App.css';
import { Context } from './Context';
import { authCheck } from './http/userApi';

const App = observer(() => {
  const { user, goods } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllCategories().then((data) => {
      goods.setMenCategories(data.men);
      goods.setWomenCategories(data.women);
    });

    authCheck().then(() => {
      user.setIsAuth(true);
      const token = localStorage.getItem('accessToken');
      const data = decodeToken(token);
      user.setUser(data);
    }).finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return (
      <div className="Spinner">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
