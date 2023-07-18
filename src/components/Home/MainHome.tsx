import Carousel from '../Carousel/Carousel';
import Weekmeals from './Weekmeals';
import { Recipe } from '../../@types/recipe';

interface RecipeProps {
  recipes: Recipe[];
}

function MainHome({ recipes }: RecipeProps) {
  return (
    <div className="">
      <h2 className="text-3xl sm:text-4xl font-bold mt-36 text-center sm:text-center md:text-center text-thirdff">
        EXAMPLE MENU
      </h2>

      <div className="mt-10 block">
        <Carousel recipes={recipes} />
      </div>

      {/* <div className="md:block md:mt-20 hidden ">
        <Weekmeals recipes={recipes} />
      </div> */}
    </div>
  );
}

export default MainHome;
