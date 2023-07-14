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
      <div className="space-y-4">
        <RecipeCard
          name={recipe1.name}
          key={recipe1.id}
          imageUrl={recipe1.imageUrl}
        />
        <RecipeCard
          name={recipe2.name}
          key={recipe2.id}
          imageUrl={recipe2.imageUrl}
        />
      </div>
    </div>
  );
}
