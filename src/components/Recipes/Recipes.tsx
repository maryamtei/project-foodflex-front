import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import SearchComponent from '../SearchComponent/SearchComponent';
import RecipeCard from '../RecipeCard/RecipeCard';
import {
  fetchRandomRecipes,
  fetchSearchRecipe,
} from '../../store/reducers/recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ScheduleFavori from '../Profil/ScheduleFavori/ScheduleFavori';

function Recipes() {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  // Utilisation du debounce pour limiter le nombre d'appel à l'api
  useDebounce(
    () => {
      if (search) {
        dispatch(fetchSearchRecipe(search));
      }
    },
    400,
    [dispatch, search]
  );

  // déclenchement du random sur une chaîne de recherche vide dans la search
  useEffect(() => {
    if (!search) {
      dispatch(fetchRandomRecipes({ count: 10 }));
    }
  }, [dispatch, search]);

  const recipes = useAppSelector((state) => state.recipes.list);

  // affichage modale planning si on clique sur le '+'
  const displaySchedule = useAppSelector(
    (state) => state.settings.clickAddSchedule
  );

  return (
    <div
      className={`my-10 px-3 sm:px-8 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      }`}
    >
      {/* // affichage modale planning si on clique sur le '+' */}
      {displaySchedule && <ScheduleFavori />}
      <h1 className="text-thirdff text-2xl sm:text-4xl font-bold md:mb-12 mb-6 text-center">
        Find exactly what you need !
      </h1>
      <SearchComponent
        name="RecipeSearch"
        value={search}
        onChange={setSearch}
      />
      {recipes.length === 0 && (
        <div className="text-center text-thirdff text-2xl font-bold  mt-10">
          No recipes found
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
        {recipes.map((recipe) => (
          <RecipeCard recipeCard={recipe} key={recipe.idMeal} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
