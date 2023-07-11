import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './styles/index.scss';

import App from './components/App/App';
import Favoris from './components/App/Profil/Favoris';
import Profil from './components/App/Profil/Profil';
import Apptest from './components/App/Apptest';
import store from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/profil" element={<Profil />} />
      <Route path="/favoris" element={<Favoris />} />
      <Route path="/login" element={<Apptest />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
