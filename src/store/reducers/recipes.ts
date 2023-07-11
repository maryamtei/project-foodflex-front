// eslint-disable-next-line import/no-extraneous-dependencies
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Recipe } from '../../@types/recipe';

interface RecipesState {
  list: Recipe[];
}

export const initialState: RecipesState = {
  list: [],
};

export interface ApiRecipe {
  idMeal: number;
  strMeal: string;
  strMealThumb: string;
}

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=b'
    );
    const data: { meals: ApiRecipe[] } = await response.json();

    return data.meals.map((meal) => {
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        imageUrl: meal.strMealThumb,
      };
    });
  }
);

const recipesReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchRecipes.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});

export default recipesReducer;
