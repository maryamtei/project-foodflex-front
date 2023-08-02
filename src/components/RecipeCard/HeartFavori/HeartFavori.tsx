import { Heart } from 'react-feather';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  addFavori,
  deleteFavori,
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../../store/reducers/user';
import { Recipe } from '../../../@types/recipe';

interface HeartFavoriProps {
  recipe: Recipe;
}

function HeartFavori({ recipe }: HeartFavoriProps) {
  const dispatch = useAppDispatch();

  const [recipeFavori, setRecipeFavori] = useState(false);

  const favoris = useAppSelector(
    (state) => state.settings.currentUser.favorites
  );

  const isLogged = useAppSelector((state) => state.settings.isLogged);

  // Function to toggle the SignUp modal and the AddSchedule modal
  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
    dispatch(toggleIsOpen());
  };

  // useCallback to memoize the matchingFavori and prevent unnecessary re-renders
  const matchingFavori = useMemo(() => {
    const findFavori = favoris.find(
      (favori) => favori.idDbMeal === recipe.idDbMeal
    );
    return findFavori;
  }, [favoris, recipe.idDbMeal]);

  // Function to handle adding or removing the recipe from favorites
  function handleAddFavori(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!matchingFavori) {
      dispatch(addFavori(recipe));
      setRecipeFavori(true);
    } else {
      dispatch(deleteFavori(matchingFavori.id));
      setRecipeFavori(false);
    }
  }

  // useEffect to update the recipeFavori state based on matchingFavori changes
  useEffect(() => {
    if (matchingFavori) {
      setRecipeFavori(true);
    } else {
      setRecipeFavori(false);
    }
  }, [recipe, matchingFavori]);

  return (
    <button
      type="button"
      className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2 hover:animate-pulse"
      onClick={(event) => {
        event.preventDefault();
        // If the user is not logged in, toggle the SignUp modal
        // Otherwise, handle adding or removing the recipe from favorites
        if (!isLogged) {
          toggleSignUp();
        } else {
          handleAddFavori(event);
        }
      }}
    >
      {recipeFavori ? (
        // Render the filled Heart icon if the recipe is in favorites
        <Heart data-testid="heart-icon" size={20} fill="red" />
      ) : (
        // Render the empty Heart icon if the recipe is not in favorites
        <Heart data-testid="heart-icon" size={20} />
      )}
    </button>
  );
}
export default HeartFavori;
