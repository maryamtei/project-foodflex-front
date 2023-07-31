import homeReducer from './home';
import recipesReducer from './recipes';
import settingsReducer from './user';
import favorisReducer from './favoris';
import windowReducer from './window';
import scheduleReducer from './schedule';
import recipeDetailsReducer from './recipeDetails';

const reducer = {
  recipes: recipesReducer,
  recipeDetails: recipeDetailsReducer,
  settings: settingsReducer,
  window: windowReducer,
  favoris: favorisReducer,
  schedule: scheduleReducer,
  home: homeReducer,
};

export default reducer;
