import React from 'react';
import { RootState } from '../../store';
import myImage from '../../../img/images.jpeg';
import Carousel from '../Carousel/Carousel';
import RecipeCard from '../RecipeCard/RecipeCard';
import MenuSemaine from './MenuSemaine/MenuSemaine';

function MainHome() {
  return (
    <div>
      <h2 className="text-lg sm:text-2xl font-bold mt-8 text-center sm:text-center md:text-center">
        EXAMPLE MENU
      </h2>

      <div className="sm:hidden block">
        <Carousel />
      </div>

      <div className="md:block hidden">
        <MenuSemaine />
      </div>
    </div>
  );
}

export default MainHome;
