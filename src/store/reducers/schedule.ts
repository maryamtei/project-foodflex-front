// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';
import fakeschedule from '../../fakeData/fakeschedule.json';

import { Week } from '../../@types/schedule';

interface ScheduleState {
  schedule: Week[];
  clickAddFavori: boolean;
  MealFavoriToAdd: Week;
}

export const initialState: ScheduleState = {
  schedule: fakeschedule.week,
  clickAddFavori: false,
  MealFavoriToAdd: {
    idMeal: 0,
    name: '',
    imageUrl: '',
    position: 0,
  },
};

export const addFavori = createAction<Week>('favori/add-favori');
export const displaySchedule = createAction<boolean>('favori/click-add-favori');
export const selectedDay = createAction<number>('favori/selected-day');

const scheduleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addFavori, (state, action) => {
      state.MealFavoriToAdd = action.payload;
    })
    .addCase(displaySchedule, (state, action) => {
      state.clickAddFavori = action.payload;
    })
    .addCase(selectedDay, (state, action) => {
      const dayPosition = action.payload;

      const findFavori = state.schedule.find(
        (favori) => favori.position === dayPosition
      );
      if (!findFavori) {
        state.MealFavoriToAdd.position = action.payload;
        state.schedule.push(state.MealFavoriToAdd);
        // fermer la modale planning
        state.clickAddFavori = false;
      }
    });
});

export default scheduleReducer;
