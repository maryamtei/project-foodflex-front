import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../@types/recipe';

interface RecipeProps {
  recipes: Recipe[];
}

function Weekmeals({ recipes }: RecipeProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4 p-8 ">
      <div>
        <div className=" text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Monday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[0]} key={recipes[0].idMeal} />
            <RecipeCard recipeCard={recipes[1]} key={recipes[1].idMeal} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Tuesday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[2]} key={recipes[2].idMeal} />
            <RecipeCard recipeCard={recipes[3]} key={recipes[3].idMeal} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Wednesday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[4]} key={recipes[4].idMeal} />
            <RecipeCard recipeCard={recipes[5]} key={recipes[5].idMeal} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Thursday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[6]} key={recipes[6].idMeal} />
            <RecipeCard recipeCard={recipes[7]} key={recipes[7].idMeal} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Friday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[8]} key={recipes[8].idMeal} />
            <RecipeCard recipeCard={recipes[9]} key={recipes[9].idMeal} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Saturday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[10]} key={recipes[10].idMeal} />
            <RecipeCard recipeCard={recipes[11]} key={recipes[11].idMeal} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black ">
          Sunday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard recipeCard={recipes[12]} key={recipes[12].idMeal} />
            <RecipeCard recipeCard={recipes[13]} key={recipes[13].idMeal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weekmeals;
