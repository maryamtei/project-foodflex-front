// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';
import fakeProfil from '../../fakeData/fakeProfil.json';

import { Favorite } from '../../@types/Profil';

interface RecipesState {
  modalIsOpen: boolean;
  favoriIsOpen: boolean;
  favoris: Favorite[];
}

export const initialState: RecipesState = {
  modalIsOpen: true,
  favoriIsOpen: true,
  favoris: fakeProfil.user.favorites,
};

export const deleteFavori = createAction<number>('favori/delete-favori');
export const addFavori = createAction<Favorite>('favori/add-favori');

export const toggleIsOpenProfil = createAction('favori/TOGGLE_IS_OPEN');

export const changeFavoriIsOpen = createAction<boolean>(
  'favori/TOGGLE_FAVORI_IS_OPEN'
);

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
    })
    .addCase(toggleIsOpenProfil, (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    })
    .addCase(changeFavoriIsOpen, (state, action) => {
      state.favoriIsOpen = action.payload;
    });
});

export default favoriReducer;
