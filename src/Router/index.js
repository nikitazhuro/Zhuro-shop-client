import React from 'react';

import Main from '../Pages/Main';
import Goods from '../Pages/Goods';
import GoodItemPage from '../Pages/GoodItemPage';
import Logon from '../Pages/Logon';
import Singup from '../Pages/Singup';
import Backet from '../Pages/Backet';
import AdminPage from '../Pages/AdminPage';
import GoodsCategoryPage from '../Pages/GoodsCategoryPage';
import PassRecovery from '../Pages/PassRecovery';
import PassRecoveryVerif from '../Pages/PassRecoveryVerif';

export const publicRoutes = [
  { path: '/', exact: true, element: <Main /> },
  { path: '/Goods', exact: true, element: <Goods /> },
  { path: '/goodsCategoryPage/:sexId&:category', exact: true, element: <GoodsCategoryPage /> },
  { path: '/Goods/:id', exact: true, element: <GoodItemPage /> },
  { path: '/Logon', exact: true, element: <Logon /> },
  { path: '/Logon/passRecovery', exact: true, element: <PassRecovery /> },
  { path: '/Logon/passRecovery/:id', exact: true, element: <PassRecoveryVerif /> },
  { path: '/Singup', exact: true, element: <Singup /> },
  { path: '*', exact: true, element: <Main /> },
];

export const privateRoutes = [
  { path: '/', exact: true, element: <Main /> },
  { path: '/Goods', exact: true, element: <Goods /> },
  { path: '/goodsCategoryPage/:sexId&:category', exact: true, element: <GoodsCategoryPage /> },
  { path: '/Goods/:id', exact: true, element: <GoodItemPage /> },
  { path: '/Basket/:id', exact: true, element: <Backet /> },
  { path: '*', exact: true, element: <Main /> },
];

export const adminRoutes = [
  { path: '/', exact: true, element: <Main /> },
  { path: '/Goods', exact: true, element: <Goods /> },
  { path: '/goodsCategoryPage/:sexId&:category', exact: true, element: <GoodsCategoryPage /> },
  { path: '/Goods/:id', exact: true, element: <GoodItemPage /> },
  { path: '/Basket/:id', exact: true, element: <Backet /> },
  { path: '/admin-page', exact: true, element: <AdminPage /> },
  { path: '*', exact: true, element: <Main /> },
];
