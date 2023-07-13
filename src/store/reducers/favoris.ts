// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';
import fakeProfil from '../../fakeData/fakeProfil.json';

import { Favorite } from '../../@types/Profil';

interface RecipesState {
  favoris: Favorite[];
}

export const initialState: RecipesState = {
  favoris: fakeProfil.user.favorites,
};

export const deleteFavori = createAction<number>('favori/delete-favori');

const favoriReducer = createReducer(initialState, (builder) => {
  builder.addCase(deleteFavori, (state, action) => {
    const idToDelete = action.payload;

    state.favoris = state.favoris.filter(
      (favori) => favori.idMeal !== idToDelete
    );
  });
});

export default favoriReducer;
