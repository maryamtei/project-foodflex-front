import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchRecipeDetails } from '../../store/reducers/recipeDetails';
import '../RecipeCard/RecipeCard.css';
import IngredientsList from './ingredient';

function Recipe() {
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  useEffect(() => {
    // Fonction pour gérer le comportement du scroll
    const handleScroll = (e: Event) => {
      if (modalIsOpen) {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    };

    // Ajouter ou supprimer l'écouteur d'événement en fonction du modalIsOpen
    if (modalIsOpen) {
      document.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.removeEventListener('scroll', handleScroll);
    }
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('scroll', handleScroll);
    };
  }, [modalIsOpen]);

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
    // Scroll-To-Top
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
      <div
        className={`bg-bgff relative mb-20 ${
          modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
        } `}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl text-titleff font-bold m-8">{recipe.name}</h1>
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="rounded-lg flex"
          />
        </div>
        <h2 className="text-3xl font-bold text-titleff sm:mt-8 md:m-10 text-center">
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
            <h2 className="text-xl font-bold text-titleff mb-2">Instructions:</h2>
            <div className="prose lg:prose-lg">
              {recipe.instruction.split('\n').map((line) => (
                <p className='text-gray-500' key={line}>{line}</p>
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
            <h2 className="text-3xl font-bold sm:mt-8 md:m-10 text-titleff text-center">
              Step-by-Step Video Guide
            </h2>
            <div className="py-4 flex justify-center">
              <ReactPlayer url={recipe.videoUrl} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recipe;
