import recipesReducer from './recipes';
import settingsReducer from './settings';

const reducer = {
  recipes: recipesReducer,
  settings: settingsReducer,
};

export default reducer;
