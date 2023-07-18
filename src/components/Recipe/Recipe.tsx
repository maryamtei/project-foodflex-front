import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipeDetails } from '../../store/reducers/recipeDetails';
import '../RecipeCard/RecipeCard.css';

function Recipe() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('No id provided');
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipeDetails(id));
  }, [dispatch, id]);

  const recipe = useAppSelector((state) => state.recipeDetails.recipe);

  if (!recipe) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto  ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold m-8 text-red">{recipe.name}</h1>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className=" rounded-lg flex"
        />
      </div>
      <h2 className="text-3xl font-bold m-10 text-center">Meal Preparation</h2>
      <div className="flex flex-col md:flex-row p-4">
        <div className="md:hidden  md:w-1/3 md:pl-8">
          <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
          <ol className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${ingredient}${index}`}>
                {ingredient} - {recipe.mesures[index]}
              </li>
            ))}
          </ol>
        </div>
        <div className="md:w-2/3 md:pr-8 pt-4 md:p-0 ">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <p className="leading-8">{recipe.instruction}</p>
        </div>
        <div className="hidden md:block md:w-1/3  justify-center text-center foodPattern bg-opacity-25 p-4 rounded-xl shadow-md border border-fourthff text-bgff">
          <h2 className="text-xl font-bold py-2 text-bgff">
            Ingredients you need:
          </h2>
          <ol className="list-none list-inside py-2 p-10 text-md ">
            {recipe.ingredients.map((ingredient, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="flex justify-center" key={`${ingredient}${index}`}>
                <p className="font-semibold pr-2"> {ingredient}</p> -
                <p className="pl-2">{recipe.mesures[index]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.videoUrl && (
        <>
          <h2 className="text-3xl font-bold m-10 text-center">
            Step-by-Step Video Guide
          </h2>
          <div className="py-4 flex justify-center">
            <ReactPlayer url={recipe.videoUrl} />
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
