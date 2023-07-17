import { useCallback, useEffect, useState } from 'react';
import { Plus, Heart } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectedDay,
  addFavori,
  deleteFavori,
  addSchedule,
  displaySchedule,
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../store/reducers/settings';
import { Recipe } from '../../@types/recipe';

interface CardProps {
  recipeCard: Recipe;
}

function RecipeCard({ recipeCard }: CardProps) {
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
    dispatch(addSchedule(recipeCard));
  }

  // useCallback to memoize the searchFavori function and prevent unnecessary
  // re-renders
  const searchFavori = useCallback(
    (recipe: Recipe) => {
      const findFavori = favoris.find(
        (favori) => favori.idMeal === recipe.idMeal
      );
      return findFavori;
    },
    [favoris]
  );

  // Function to handle adding the recipe to favorites
  function handleAddFavori(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const findFavori = searchFavori(recipeCard);
    if (!findFavori) {
      dispatch(addFavori(recipeCard));
      setRecipeFavori(true);
    } else {
      dispatch(deleteFavori(recipeCard.idMeal));
      setRecipeFavori(false);
    }
  }

  // useEffect to check if the recipe is in favorites and update recipeFavori
  // accordingly
  useEffect(() => {
    const findFavori = searchFavori(recipeCard);

    if (findFavori) {
      setRecipeFavori(true);
    } else {
      setRecipeFavori(false);
    }
  }, [recipeCard, searchFavori]);

  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
    dispatch(toggleIsOpen());
  };
  const stateHome = useAppSelector((state) => state.home.stateHome);

  return (
    <Link
      to="/recipe"
      className="shadow-md rounded-lg relative hover:shadow-lg transition-all"
      onClick={(event: { preventDefault: () => void }) => {
        if (displayScheduleModal) {
          event.preventDefault();
        }
        handleClickDay(recipeCard.position);
      }}
    >
      <img
        src={recipeCard.imageUrl}
        alt={recipeCard.name}
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
      <div className="rounded-b-lg">
        <h2 className="text-fourthff font-bold p-2 text-center truncate">
          {recipeCard.name}
        </h2>
      </div>
    </Link>
  );
}

export default RecipeCard;
