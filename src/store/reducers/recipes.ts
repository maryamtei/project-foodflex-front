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

export const fetchRandomRecipes = createAsyncThunk(
  'recipes/fetchRandomRecipes',
  async () => {
    const promises = [];
    for (let i = 0; i < 10; i += 1) {
      promises.push(
        fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(
          (response) => response.json()
        )
      );
    }
    const results = await Promise.all(promises);
    const meals = results.flatMap((result) => result.meals);

    return meals.map((meal) => {
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        imageUrl: meal.strMealThumb,
      };
    });
  }
);

export const fetchSearchRecipe = createAsyncThunk(
  'recipes/fetchSearchRecipes',
  async (search: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
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
  builder.addCase(fetchRandomRecipes.fulfilled, (state, action) => {
    state.list = action.payload;
  });

  builder.addCase(fetchSearchRecipe.fulfilled, (state, action) => {
    state.list = action.payload;
  });
});

export default recipesReducer;
