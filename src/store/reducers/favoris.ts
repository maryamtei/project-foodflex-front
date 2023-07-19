// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

interface RecipesState {
  modalIsOpen: boolean;
  favoriIsOpen: boolean;
  modalAnimationState: number;
}

export const initialState: RecipesState = {
  modalIsOpen: false,
  favoriIsOpen: true,
  modalAnimationState: 0,
};

export const toggleIsOpenProfil = createAction('favori/TOGGLE_IS_OPEN');

export const changeFavoriIsOpen = createAction<boolean>(
  'favori/TOGGLE_FAVORI_IS_OPEN'
);
export const changeStateModalAnimation = createAction<number>(
  'settings/CHANGE_STATE_MODAL_ANIMATION'
);

const favorisReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeStateModalAnimation, (state, action) => {
      state.modalAnimationState = action.payload;
    })
    .addCase(toggleIsOpenProfil, (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    })
    .addCase(changeFavoriIsOpen, (state, action) => {
      state.favoriIsOpen = action.payload;
    });
});

export default favorisReducer;
