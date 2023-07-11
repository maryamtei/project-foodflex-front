import { configureStore } from '@reduxjs/toolkit';
import profilReducer from './reducers/profilReducer';

const store = configureStore({
  reducer: {
    profil: profilReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
