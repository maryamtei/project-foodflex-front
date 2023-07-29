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
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';
import Schedule from './components/Schedule/Schedule';
import Profil from './components/Profil/Profil';
import store from './store';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import TermsPage from './components/TermsPage/TermsPage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home signInDomain="" />} />
      <Route path="/sign-up" element={<Home signInDomain="signup" />} />
      <Route path="/sign-in" element={<Home signInDomain="signin" />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/favoris" element={<Favoris />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="recipes" element={<Recipes />} />
      <Route path="recipes/:id" element={<Recipe />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
