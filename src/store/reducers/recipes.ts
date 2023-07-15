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

// Définition de l'interface pour une recette provenant de l'API.
export interface ApiRecipe {
  idMeal: number;
  strMeal: string;
  strMealThumb: string;
}

// Création d'une action Redux async pour fetch des recettes aléatoires.
export const fetchRandomRecipes = createAsyncThunk(
  'recipes/fetchRandomRecipes',
  async () => {
    // Création d'un tableau de promises pour récupérer plusieurs recettes aléatoires.
    const promises = [];
    for (let i = 0; i < 15; i += 1) {
      promises.push(
        fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
          cache: 'no-store',
        }).then((response) => response.json())
      );
    }
    // Attente du résultat de toutes les promises.
    const results = await Promise.all(promises);
    // Transformation des résultats en un seul tableau de repas.
    const meals = results.flatMap((result) => result.meals);

    // Suppression des doublons de recettes en fonction de leur id.
    const mealIds = new Set<number>();

    const uniqueMeals = meals.filter((meal) => {
      if (!mealIds.has(meal.idMeal)) {
        mealIds.add(meal.idMeal);
        return true;
      }
      return false;
    });

    return uniqueMeals.map((meal) => {
      return {
        idMeal: meal.idMeal,
        name: meal.strMeal,
        imageUrl: meal.strMealThumb,
        position: 0,
      };
    });
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
