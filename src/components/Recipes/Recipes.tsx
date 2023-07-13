import { useEffect } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import RecipeCard from '../RecipeCard/RecipeCard';
import { fetchRandomRecipes } from '../../store/reducers/recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function Recipes() {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  useEffect(() => {
    dispatch(fetchRandomRecipes());
  }, [dispatch]);

  const recipes = useAppSelector((state) => state.recipes.list);

  return (
    <div
      className={`my-10 px-3 sm:px-8 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      }`}
    >
      <SearchComponent name="RecipeSearch" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
        {recipes.map((recipe) => (
          <RecipeCard
            name={recipe.name}
            key={recipe.id}
            imageUrl={recipe.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
