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
    <div className="p-4">
      <div className="py-4 text-center">{day}</div>
      <div className="space-y-4 space-x-4">
        <RecipeCard recipeCard={recipe1} key={recipe1.idMeal} />
        <RecipeCard recipeCard={recipe2} key={recipe2.idMeal} />
      </div>
    </div>
  );
}
