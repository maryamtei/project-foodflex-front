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
            idMeal: meal.idMeal,
            name: meal.strMeal,
            imageUrl: meal.strMealThumb,
            position: 0,
          });
        }
      }
    }

    return uniqueMeals;
  }
);

// Création d'une action Redux async pour fetch des recettes en fonction d'une recherche.
export const fetchSearchRecipe = createAsyncThunk(
  'recipes/fetchSearchRecipes',
  async (search: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data: { meals: ApiRecipe[] | null } = await response.json();
    // Si data.meals est null, assignation d'un tableau vide pour éviter les erreurs.
    const meals = data.meals || [];
    return meals.map((meal) => {
      return {
        idMeal: meal.idMeal,
        name: meal.strMeal,
        imageUrl: meal.strMealThumb,
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
