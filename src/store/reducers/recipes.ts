import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { Recipe } from '../../@types/recipe';
// Définition de l'interface pour l'état des recettes.
interface RecipesState {
  list: Recipe[];
  loading: boolean;
  error: string | null;
}
// Initialisation de l'état initial des recettes.
export const initialState: RecipesState = {
  list: [],
  loading: false,
  error: null,
};

export interface ApiRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
}

// GENERE RECETTES ALEATOIREMENT
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
  async ({ category, search }: { search: string; category?: string }) => {
    if (search) {
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

      const meals = [...recipeMeals, ...ingredientMeals];

      const mealIds = new Set();
      const uniqueMeals = meals.filter((meal) => {
        if (!mealIds.has(meal.idMeal)) {
          mealIds.add(meal.idMeal);
          return true;
        }
        return false;
      });

      return uniqueMeals
        .filter((meal) => !category || meal.strCategory === category)
        .map((meal) => {
          return {
            idDbMeal: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            position: 0,
          };
        });
    }

    const categoryResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    const categoryData: { meals: ApiRecipe[] | null } =
      await categoryResponse.json();

    const meals = categoryData.meals || [];

    return meals.map((meal) => {
      return {
        idDbMeal: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        position: 0,
      };
    });
  }
);

// export const fetchCategoriesRecipes = createAsyncThunk(
//   'recipes/fetchCategoriesRecipes',
//   async (categorie: string) => {
//     const response = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`
//     );
//     const data: { meals: ApiRecipe[] | null } = await response.json();
//     const meals = data.meals || [];
//     return meals.map((meal) => {
//       return {
//         idDbMeal: meal.idMeal,
//         name: meal.strMeal,
//         image: meal.strMealThumb,
//         position: 0,
//       };
//     });
//   }
// );

// Création d'un reducer pour gérer l'état des recettes.
const recipesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchRandomRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRandomRecipes.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchRandomRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ||
        'Une erreur inattendue sur la generation des recettes aleatoires est survenue';
    })
    .addCase(fetchSearchRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSearchRecipe.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchSearchRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ||
        'Une erreur inattendue sur la recherche de recette est survenue';
    });
});

export default recipesReducer;
