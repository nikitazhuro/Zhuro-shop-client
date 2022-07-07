/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Goods from './Store/Goods';
import User from './Store/User';
import Filter from './Store/Filter';
import { Context } from './Context/index';

ReactDOM.render(
  <Context.Provider value={{
    goods: new Goods(),
    user: new User(),
    filter: new Filter(),
  }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root'),
);
