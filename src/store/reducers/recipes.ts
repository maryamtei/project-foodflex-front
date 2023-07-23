import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Recipe } from '../../@types/recipe';
// Définition de l'interface pour l'état des recettes.
interface RecipesState {
  list: Recipe[];
}
// Initialisation de l'état initial des recettes.
export const initialState: RecipesState = {
  list: [],
};

export interface ApiRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const fetchRandomRecipes = createAsyncThunk(
  'recipes/fetchRandomRecipes',
  async ({ count }: { count: number }) => {
    const uniqueMeals = [];
    const mealIds = new Set<number>();

    while (uniqueMeals.length < count) {
      const remaining: number = count - uniqueMeals.length;

      // eslint-disable-next-line no-await-in-loop
      const responses = await Promise.all(
        Array(remaining + 4)
          .fill(null)
          .map(() =>
            fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
              cache: 'no-store',
            })
          )
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const response of responses) {
        if (uniqueMeals.length >= 14) {
          break;
        }

        // eslint-disable-next-line no-await-in-loop
        const data = await response.json();
        const meal = data.meals[0];

        if (!mealIds.has(meal.idMeal)) {
          mealIds.add(meal.idMeal);
          uniqueMeals.push({
            idDbMeal: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            position: 0,
          });
        }
      }
    }

    return uniqueMeals.map((meal, index) => {
      return {
        ...meal,
        position: index,
      };
    });
  }
);

// Création d'une action Redux async pour fetch des recettes en fonction d'une recherche nom et ingredients
export const fetchSearchRecipe = createAsyncThunk(
  'recipes/fetchSearchRecipes',
  async (search: string) => {
    const [recipeResponse, ingredientResponse] = await Promise.all([
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`),
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`),
    ]);

    const recipeData: { meals: ApiRecipe[] | null } =
      await recipeResponse.json();
    const ingredientData: { meals: ApiRecipe[] | null } =
      await ingredientResponse.json();

    const recipeMeals = recipeData.meals || [];
    const ingredientMeals = ingredientData.meals || [];

    const combinedMeals = [...recipeMeals, ...ingredientMeals];

    // Élimination des doublons
    const mealIds = new Set();
    const uniqueMeals = combinedMeals.filter((meal) => {
      if (!mealIds.has(meal.idMeal)) {
        mealIds.add(meal.idMeal);
        return true;
      }
      return false;
    });

    return uniqueMeals.map((meal) => {
      return {
        idDbMeal: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        position: 0,
      };
    });
  }
);

// Création d'un reducer pour gérer l'état des recettes.
const recipesReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchRandomRecipes.fulfilled, (state, action) => {
    state.list = action.payload;
  });

  builder.addCase(fetchSearchRecipe.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});

export default recipesReducer;
