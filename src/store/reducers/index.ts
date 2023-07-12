import profilReducer from './profil';
import recipesReducer from './recipes';
import settingsReducer from './settings';
import favorisReducer from './favoris';

const reducer = {
  recipes: recipesReducer,
  settings: settingsReducer,
  profil: profilReducer,
  favoris: favorisReducer,
};

export default reducer;
