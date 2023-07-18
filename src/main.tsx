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
import Favoris from './components/Profil/Favoris';
import Home from './components/Home/Home';
import Apptest from './components/App/Apptest';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';
import Schedule from './components/Schedule/Schedule';
import Profil from './components/Profil/Profil';
import store from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Apptest />}>
      <Route index path="/" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/favoris" element={<Favoris />} />
      <Route path="/schedule" element={<Schedule />} />
      {/* <Route path="/login" element={<Apptest />} /> */}
      {/* Modifier les routes et l'élement Apptest en fonction de vos taches */}
      {/* <Route index element={<Apptest />} /> */}
      <Route path="recipes" element={<Recipes />} />
      <Route path="recipes/:id" element={<Recipe />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
