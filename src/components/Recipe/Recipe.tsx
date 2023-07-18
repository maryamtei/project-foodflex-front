import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { fetchRecipeDetails } from '../../store/reducers/recipeDetails';

interface RecipeProps {
  name: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  idMeal: string;
}

function Recipe() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [dispatch, id]);

  const recipe = useAppSelector((state) => state.recipeDetails);
  console.log(`recipe: ${recipe}`);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-red">{recipe.name}</h1>

      <p>{recipe.name}</p>

      {/* <img src={recipe} alt={recipe} className="mb-6 rounded-lg" /> */}
      {/* <div className="flex flex-col md:flex-row">
        <div className="md:hidden  md:w-1/3 md:pl-8">
          <div className="bg-bgff p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={instruction}> {instruction}</li>
            ))}
          </ol>
        </div>
        <div className="hidden md:block md:w-1/3 md:pl-8 ">
          <div className="bg-bgff p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Recipe;
