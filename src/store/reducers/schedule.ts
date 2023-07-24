// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

import { Week } from '../../@types/schedule';

interface ScheduleState {
  clickAddSchedule: boolean;
  MealFavoriToAdd: Week;
  currentWeek: number;
  stateSchedule: boolean;
}

export const initialState: ScheduleState = {
  currentWeek: 1,
  clickAddSchedule: false,
  MealFavoriToAdd: {
    idMeal: 0,
    name: '',
    imageUrl: '',
    position: 0,
  },
  stateSchedule: false,
};

export const addSchedule = createAction<Week>('favori/add-planning');
export const displaySchedule = createAction<boolean>('favori/click-add-favori');
export const selectedDay = createAction<number>('favori/selected-day');
export const nextWeek = createAction<boolean>('schedule/current-week');
export const changeStateSchedule = createAction<boolean>(
  'schedule/CHANGE_STATE'
);

const scheduleReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeStateSchedule, (state, action) => {
    state.stateSchedule = action.payload;
  });
});

export default scheduleReducer;
