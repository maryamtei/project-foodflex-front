import { v4 as uuidv4 } from 'uuid';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../@types/recipe';

interface CarouselSlideProps {
  day: string;
  recipe1: Recipe;
  recipe2: Recipe;
}

export default function CarouselSlide({
  day,
  recipe1,
  recipe2,
}: CarouselSlideProps) {
  return (
    <div className="p-4 mr-4">
      <div className="text-fourthff text-md sm:text-xl font-bold text-center mb-4 sm:mb-8 underline underline-offset-4 ">
        {day}
      </div>
      <div className="flex flex-col">
        <p className="text-fourthff text-sm sm:text-md font-bold text-center mb-2 bt-2 sm:mb-4 sm:mt-4  ">
          Lunch :
        </p>
        <RecipeCard recipe={recipe1} key={uuidv4()} />
        <p className="text-fourthff text-sm sm:text-md font-bold text-center bt-2 mb-4 mt-4 ">
          Dinner :
        </p>
        <RecipeCard recipe={recipe2} key={uuidv4()} />
      </div>
    </div>
  );
}
