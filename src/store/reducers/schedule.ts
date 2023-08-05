import { createAction, createReducer } from '@reduxjs/toolkit';

interface ScheduleState {
  stateSchedule: boolean;
}

export const initialState: ScheduleState = {
  stateSchedule: false,
};

export const changeStateSchedule = createAction<boolean>(
  'schedule/CHANGE_STATE'
);

const scheduleReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeStateSchedule, (state, action) => {
    state.stateSchedule = action.payload;
  });
});

export default scheduleReducer;
