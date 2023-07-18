// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

interface SettingsState {
  stateHome: boolean;
}

const initialValue: SettingsState = {
  stateHome: false,
};

export const changeStateHome = createAction<boolean>('settings/CHANGE_STATE');

const homeReducer = createReducer(initialValue, (builder) => {
  builder.addCase(changeStateHome, (state, action) => {
    state.stateHome = action.payload;
  });
});
export default homeReducer;
