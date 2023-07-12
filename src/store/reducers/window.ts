// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

interface SettingsState {
  innerWidth: number;
}

const initialValue: SettingsState = {
  innerWidth: window.innerWidth,
};

export const changeInnerWidth = createAction<number>(
  'settings/CHANGE_INNER_WIDTH'
);

const settingsReducer = createReducer(initialValue, (builder) => {
  builder.addCase(changeInnerWidth, (state, action) => {
    state.innerWidth = action.payload;
  });
});
export default settingsReducer;
