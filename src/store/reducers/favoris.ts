// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

import { Favorite } from '../../@types/Profil';

interface RecipesState {
  modalIsOpen: boolean;
  favoriIsOpen: boolean;
  favoris: Favorite[];
}

export const initialState: RecipesState = {
  modalIsOpen: false,
  favoriIsOpen: true,
  favoris: [],
};

export const toggleIsOpenProfil = createAction('favori/TOGGLE_IS_OPEN');

export const changeFavoriIsOpen = createAction<boolean>(
  'favori/TOGGLE_FAVORI_IS_OPEN'
);

const favoriReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(toggleIsOpenProfil, (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    })
    .addCase(changeFavoriIsOpen, (state, action) => {
      state.favoriIsOpen = action.payload;
    });
});

export default favoriReducer;
