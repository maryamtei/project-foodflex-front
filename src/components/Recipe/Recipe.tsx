import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipeDetails } from '../../store/reducers/recipeDetails';
import '../RecipeCard/RecipeCard.css';
import IngredientsList from './ingredient';

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  if (!recipe) {
    return (
      <div className="flex justify-center mt-20">
        <div className="loading loading-ring flex justify-center align-middle w-36 " />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold m-8">{recipe.name}</h1>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="rounded-lg flex"
        />
      </div>
      <h2 className="text-3xl font-bold sm:mt-8 md:m-10 text-center">
        Meal Preparation
      </h2>
      <div className="flex flex-col md:flex-row p-4">
        <div className="md:hidden md:w-1/3 md:pl-8">
          <IngredientsList
            ingredients={recipe.ingredients}
            mesures={recipe.mesures}
          />
        </div>
        <div className="md:w-2/3 md:pr-8 pt-4 md:p-0">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <div className="prose lg:prose-lg">
            {recipe.instruction.split('\n').map((line) => (
              <p key={uuidv4()}>{line}</p>
            ))}
          </div>
        </div>
        <div className="hidden md:block md:w-1/3  ">
          <IngredientsList
            ingredients={recipe.ingredients}
            mesures={recipe.mesures}
          />
        </div>
      </div>

      {recipe.videoUrl && (
        <>
          <h2 className="text-3xl font-bold sm:mt-8 md:m-10 text-center">
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
