// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';
import fakeProfil from '../../fakeData/fakeProfil.json';

import { Favorite } from '../../@types/Profil';

interface RecipesState {
  favoris: Favorite[];
}

export const initialState: RecipesState = {
  favoris: [],
};

export const deleteFavori = createAction<number>('favori/delete-favori');
export const addFavori = createAction<Favorite>('favori/add-favori');

const favoriReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteFavori, (state, action) => {
      const idToDelete = action.payload;

      state.favoris = state.favoris.filter(
        (favori) => favori.idMeal !== idToDelete
      );
    })
    .addCase(addFavori, (state, action) => {
      const favoriToAdd = action.payload;

      state.favoris.push(favoriToAdd);
    });
});

export default favoriReducer;
