import { Heart } from 'react-feather';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  addFavori,
  deleteFavori,
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../../store/reducers/settings';
import { Recipe } from '../../../@types/recipe';

interface HeartFavoriProps {
  recipe: Recipe;
}

function HeartFavori({ recipe }: HeartFavoriProps) {
  const [recipeFavori, setRecipeFavori] = useState(false);
  const favoris = useAppSelector(
    (state) => state.settings.currentUser.favorites
  );
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.settings.isLogged);

  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
    dispatch(toggleIsOpen());
  };

  // useCallback to memoize the searchFavori function and prevent unnecessary
  // re-renders
  const matchingFavori = useMemo(() => {
    const findFavori = favoris.find(
      (favori) => favori.idDbMeal === recipe.idDbMeal
    );
    return findFavori;
  }, [favoris, recipe.idDbMeal]);

  // Function to handle adding the recipe to favorites
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
        <Heart data-testid="heart-icon" size={20} fill="red" />
      ) : (
        <Heart data-testid="heart-icon" size={20} />
      )}
    </button>
  );
}
export default HeartFavori;
