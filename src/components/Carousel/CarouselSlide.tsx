import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../@types/recipe';
import { useAppDispatch } from '../../hooks/redux';
import { selectedDay } from '../../store/reducers/settings';

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
  const dispatch = useAppDispatch();
  function handleClickDay(position: number) {
    dispatch(selectedDay(position));
  }
  return (
    <div className="p-4 border border-thirdff rounded-xl mr-3 ">
      <div className="text-thirdff text-md sm:text-xl font-bold text-center mb-8 underline underline-offset-4 ">
        {day}
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-thirdff text-sm sm:text-md font-bold text-center mb-2 underline underline-offset-4 ">
            Lunch :
          </p>
          <button
            type="button"
            className="shadow-md rounded-lg relative hover:shadow-lg "
            onClick={() => handleClickDay(recipe1.position)}
          >
            <RecipeCard recipeCard={recipe1} key={recipe1.idMeal} />
          </button>
        </div>
        <div>
          <p className="text-thirdff text-sm sm:text-md font-bold text-center mb-2 underline underline-offset-4 ">
            Dinner :
          </p>
          <button
            type="button"
            className="shadow-md rounded-lg relative hover:shadow-lg "
            onClick={() => handleClickDay(recipe2.position)}
          >
            <RecipeCard recipeCard={recipe2} key={recipe2.idMeal} />
          </button>
        </div>
      </div>
    </div>
  );
}
