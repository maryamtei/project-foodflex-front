import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { RecipeDetails } from '../../@types/recipe';

interface RecipeDetailsState {
  recipe: RecipeDetails | null;
}
// Initialisation de l'état initial des recettes.
export const initialState: RecipeDetailsState = {
  recipe: null,
};

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

    const recipeDetails: RecipeDetails = {
      id: meal.idMeal,
      name: meal.strMeal,
      imageUrl: meal.strMealThumb,
      instruction: meal.strInstructions,
      ingredients,
      mesures,
    };

    return recipeDetails;
  }
);

const recipeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchRecipeDetails.fulfilled, (state, action) => {
    return {
      recipe: action.payload,
    };
  });
});

export default recipeDetailsReducer;
