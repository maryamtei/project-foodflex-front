// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';
import fakeschedule from '../../components/Profil/fakeschedule.json';

import { Week } from '../../@types/schedule';

interface ScheduleState {
  schedule: Week[];
}

export const initialState: ScheduleState = {
  schedule: fakeschedule.week,
};

export const addFavori = createAction<Week>('favori/add-favori');

const scheduleReducer = createReducer(initialState, (builder) => {
  builder.addCase(addFavori, (state, action) => {
    const favoriAdded = action.payload;

    const findFavori = state.schedule.find(
      (favori) => favori.idMeal === favoriAdded.idMeal
    );

    if (!findFavori) {
      state.schedule.push(favoriAdded);
    }
  });
});

export default scheduleReducer;
