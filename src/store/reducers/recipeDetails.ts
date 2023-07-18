import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

interface RecipeProps {
  strMeal: string;
  imageUrl: string;
  ingredients: string[];
  mesures: [];
  strInstructions: string;
  idMeal: string;
  strMealThumb: string;
}

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (id: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    const meal = data.meals[0];

    const ingredients = [];
    for (let i = 1; i <= 20; i += 1) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`]);
      }
    }

    const mesures = [];
    for (let i = 1; i <= 20; i += 1) {
      if (meal[`strMeasure${i}`]) {
        mesures.push(meal[`strMeasure${i}`]);
      }
    }

    return {
      strMeal: meal.strMeal,
      imageUrl: meal.strMealThumb,
      ingredients,
      mesures,
      strInstructions: meal.strInstructions,
      idMeal: meal.idMeal,
      strMealThumb: meal.strMealThumb,
    };
  }
);

const initialState: RecipeProps = {
  strMeal: '',
  imageUrl: '',
  ingredients: [],
  mesures: [],
  strInstructions: '',
  idMeal: '',
  strMealThumb: '',
};

const recipeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchRecipeDetails.fulfilled, (state, action) => {
    return action.payload;
  });
});

export default recipeDetailsReducer;
