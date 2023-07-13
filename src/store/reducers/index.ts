import profilReducer from './profil';
import recipesReducer from './recipes';
import settingsReducer from './settings';
import favorisReducer from './favoris';
import windowReducer from './window';
import scheduleReducer from './schedule';

const reducer = {
  recipes: recipesReducer,
  settings: settingsReducer,
  window: windowReducer,
  profil: profilReducer,
  favoris: favorisReducer,
  schedule: scheduleReducer,
};

export default reducer;
