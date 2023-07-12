import profilReducer from './profil';
import recipesReducer from './recipes';
import settingsReducer from './settings';

const reducer = {
  recipes: recipesReducer,
  settings: settingsReducer,
  profil: profilReducer,
};

export default reducer;
