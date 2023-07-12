import { useEffect } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import RecipeCard from '../RecipeCard/RecipeCard';
import { fetchRecipes } from '../../store/reducers/recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function Recipes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const recipes = useAppSelector((state) => state.recipes.list);

  return (
    <div className="mt-20 p-6">
      <SearchComponent />
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
