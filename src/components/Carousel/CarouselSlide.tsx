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
    <div className="p-4 mx-2">
      <div className="text-fourthff text-md sm:text-xl font-bold text-center mb-4 sm:mb-4 underline underline-offset-4">
        {day}
      </div>
      <div className="flex flex-col">
        <p className="text-fourthff text-sm sm:text-md font-bold text-center mb-2 sm:mt-4 ">
          Lunch
        </p>
        <RecipeCard recipe={recipe1} key={recipe1.idDbMeal} />
        <p className="text-fourthff text-sm sm:text-md font-bold text-center mb-2 mt-8">
          Dinner
        </p>
        <RecipeCard recipe={recipe2} key={recipe2.idDbMeal} />
      </div>
    </div>
  );
}
