import { useEffect, useMemo, useState } from 'react';
import { Heart, Plus } from 'react-feather';
import { Link } from 'react-router-dom';
import { Recipe } from '../../@types/recipe';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addFavori,
  addSchedule,
  deleteFavori,
  displaySchedule,
  selectedDay,
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../store/reducers/settings';
import './RecipeCard.css';

interface CardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: CardProps) {
  const [recipeFavori, setRecipeFavori] = useState(false);
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const stateSchedule = useAppSelector((state) => state.schedule.stateSchedule);
  const clickAddFavori = useAppSelector(
    (state) => state.schedule.clickAddSchedule
  );
  const displayScheduleModal = useAppSelector(
    (state) => state.settings.clickAddSchedule
  );
  const favoris = useAppSelector(
    (state) => state.settings.currentUser.favorites
  );

  const dispatch = useAppDispatch();
  function handleClickDay(position: number) {
    dispatch(selectedDay(position));
  }
  // Function to handle adding the recipe to the schedule
  function handleAddSchedule(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(displaySchedule(!clickAddFavori));
    dispatch(addSchedule(recipe));
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }

  // useCallback to memoize the searchFavori function and prevent unnecessary
  // re-renders
  const matchingFavori = useMemo(() => {
    const findFavori = favoris.find(
      (favori) => favori.idMeal === recipe.idMeal
    );
    return findFavori;
  }, [favoris, recipe.idMeal]);

  // Function to handle adding the recipe to favorites
  function handleAddFavori(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!matchingFavori) {
      dispatch(addFavori(recipe));
      setRecipeFavori(true);
    } else {
      dispatch(deleteFavori(recipe.idMeal));
      setRecipeFavori(false);
    }
  }

  // useEffect to check if the recipe is in favorites and update recipeFavori
  // accordingly
  useEffect(() => {
    if (matchingFavori) {
      setRecipeFavori(true);
    } else {
      setRecipeFavori(false);
    }
  }, [recipe, matchingFavori]);

  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
    dispatch(toggleIsOpen());
  };
  const stateHome = useAppSelector((state) => state.home.stateHome);

  return (
    <Link
      to={`/recipes/${recipe.idMeal}`}
      className="shadow-md rounded-lg relative hover:shadow-lg transition-all"
      onClick={(event: { preventDefault: () => void }) => {
        if (displayScheduleModal) {
          event.preventDefault();
        }
        handleClickDay(recipe.position);
      }}
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="rounded-t-md cover"
      />
      <div className="text-bgff absolute top-2 right-1 ">
        <div
          className={`card-actions justify-end bg-t ${stateHome ? 'hidden' : ''}
          ${stateSchedule ? 'hidden' : ''}`}
        >
          <button
            type="button"
            className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
            onClick={(event) => {
              event.preventDefault();
              if (!isLogged) {
                toggleSignUp();
              } else {
                handleAddFavori(event);
              }
            }}
          >
            {recipeFavori ? (
              <Heart size={20} fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </button>
          <button
            type="button"
            className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
            onClick={(event) => {
              event.preventDefault();
              if (!isLogged) {
                toggleSignUp();
              } else {
                handleAddSchedule(event);
              }
            }}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="rounded-b-lg foodPattern">
        <h2 className="text-white font-semibold p-2 text-center truncate text-sm sm:text-md">
          {recipe.name}
        </h2>
      </div>
    </Link>
  );
}

export default RecipeCard;
