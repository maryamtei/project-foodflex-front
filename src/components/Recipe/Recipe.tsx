import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipeDetails } from '../../store/reducers/recipeDetails';

function Recipe() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [dispatch, id]);

  const recipe = useAppSelector((state) => state.recipeDetails.recipe);
  console.log(recipe);

  if (!recipe) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-red">{recipe.name}</h1>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="mb-6 rounded-lg flex"
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:hidden  md:w-1/3 md:pl-8">
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <ol className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient} - {recipe.mesures[index]}
              </li>
            ))}
          </ol>
        </div>

        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <p>{recipe.instruction}</p>
        </div>
        <div className="hidden md:block md:w-1/3 md:pl-8">
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <ol className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient} - {recipe.mesures[index]}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
