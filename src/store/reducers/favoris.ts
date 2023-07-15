// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

import { Favorite } from '../../@types/Profil';

interface RecipesState {
  favoris: Favorite[];
}

export const initialState: RecipesState = {
  favoris: [],
};

export const deleteFavori = createAction<number>('favori/delete-favori');
export const addFavori = createAction<Favorite>('favori/add-favori');

const favoriReducer = createReducer(initialState, () => {});

export default favoriReducer;
