// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';
import fakeschedule from '../../fakeData/fakeschedule.json';

import { ScheduleType, Week } from '../../@types/schedule';

interface ScheduleState {
  schedule: ScheduleType[];
  clickAddSchedule: boolean;
  MealFavoriToAdd: Week;
  currentWeek: number;
}

export const initialState: ScheduleState = {
  schedule: fakeschedule,
  currentWeek: 1,
  clickAddSchedule: false,
  MealFavoriToAdd: {
    idMeal: 0,
    name: '',
    imageUrl: '',
    position: 0,
  },
};

export const addSchedule = createAction<Week>('favori/add-planning');
export const displaySchedule = createAction<boolean>('favori/click-add-favori');
export const selectedDay = createAction<number>('favori/selected-day');
export const nextWeek = createAction<boolean>('schedule/current-week');

const scheduleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(nextWeek, (state, action) => {
      if (action.payload && state.currentWeek < state.schedule.length) {
        state.currentWeek += 1;
      } else if (state.currentWeek > 1) {
        state.currentWeek -= 1;
      }
    })
    .addCase(addSchedule, (state, action) => {
      state.MealFavoriToAdd = action.payload;
    })
    .addCase(displaySchedule, (state, action) => {
      state.clickAddSchedule = action.payload;
    })
    .addCase(selectedDay, (state, action) => {
      const dayPosition = action.payload;

      const weekFind = state.schedule.find(
        (week) => week.week === state.currentWeek
      );

      const findFavori = weekFind?.meals.find(
        (day) => day.position === dayPosition
      );

      if (!findFavori) {
        state.MealFavoriToAdd.position = action.payload;
        weekFind?.meals.push(state.MealFavoriToAdd);
        // fermer la modale planning
        state.clickAddSchedule = false;
      }
    });
});

export default scheduleReducer;
