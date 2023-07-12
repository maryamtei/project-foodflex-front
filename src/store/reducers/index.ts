import profilReducer from './profil';
import recipesReducer from './recipes';
import settingsReducer from './settings';
import windowReducer from './window';

const reducer = {
  recipes: recipesReducer,
  settings: settingsReducer,
  window: windowReducer,
  profil: profilReducer,
};

export default reducer;
