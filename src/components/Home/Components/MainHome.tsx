import Carousel from '../../Carousel/Carousel';
import { Recipe } from '../../../@types/recipe';
import HomeTitle from './HomeTitles';

interface RecipeProps {
  recipes: Recipe[];
}

function MainHome({ recipes }: RecipeProps) {
  return (
    <div>
      <HomeTitle content="EXAMPLE MENU" />
      <div>
        <Carousel meals={recipes} />
      </div>
    </div>
  );
}

export default MainHome;
