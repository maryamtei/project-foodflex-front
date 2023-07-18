import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

interface RecipeProps {
  name: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  idMeal: string;
}

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (id: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    console.log(data);
    return data.meals[0];
    console.log(`reducer: ${data.meals[0]}`);
  }
);

const initialState: RecipeProps = {
  name: '',
  imageUrl: '',
  ingredients: [],
  instructions: [],
  idMeal: '',
};

const recipeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchRecipeDetails.fulfilled, (state, action) => {
    return action.payload;
  });
});

export default recipeDetailsReducer;
