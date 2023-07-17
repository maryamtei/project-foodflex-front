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
    <div className="p-4 border border-thirdff rounded-xl mr-4">
      <div className="text-thirdff text-md sm:text-xl font-bold text-center mb-8 underline underline-offset-4 ">
        {day}
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-thirdff text-sm sm:text-md font-bold text-center mb-2 underline underline-offset-4 ">
            Lunch :
          </p>

          <RecipeCard recipeCard={recipe1} key={recipe1.idMeal} />
        </div>
        <div>
          <p className="text-thirdff text-sm sm:text-md font-bold text-center mb-2 underline underline-offset-4 ">
            Dinner :
          </p>
          <RecipeCard recipeCard={recipe2} key={recipe2.idMeal} />
        </div>
      </div>
    </div>
  );
}
