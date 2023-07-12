// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import fakeProfil from '../../components/Profil/fakeProfil.json';

import { Favorite } from '../../@types/Profil';

interface RecipesState {
  favorisList: Favorite[];
}

export const initialState: RecipesState = {
  favorisList: fakeProfil.user.favorites,
};

export const getFetchFavori = createAsyncThunk(
  'favori/getFetchFavori',
  async () => {
    const response = await fetch('http://localhost:3000/favori');
    const data = await response.json();

    return data;
  }
);

export const deleteFavori = createAction<number>('favori/delete-favori');

const favoriReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFetchFavori.fulfilled, (state, action) => {
      state.favorisList = action.payload;
    })
    .addCase(deleteFavori, (state, action) => {
      const idToDelete = action.payload;

      state.favorisList = state.favorisList.filter(
        (favori) => favori.idMeal !== idToDelete
      );
    });
});

export default favoriReducer;
