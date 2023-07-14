// eslint-disable-next-line import/no-extraneous-dependencies
import { createAction, createReducer } from '@reduxjs/toolkit';

interface SettingsState {
  innerWidth: number;
  mobileView: boolean;
}

const initialValue: SettingsState = {
  innerWidth: window.innerWidth,
  mobileView: false,
};

export const changeInnerWidth = createAction<number>(
  'settings/CHANGE_INNER_WIDTH'
);
export const changeMobileView = createAction<boolean>(
  'settings/CHANGE_STATE_MOBILE_VIEW'
);

const settingsReducer = createReducer(initialValue, (builder) => {
  builder.addCase(changeInnerWidth, (state, action) => {
    state.innerWidth = action.payload;
  });
  builder.addCase(changeMobileView, (state, action) => {
    state.mobileView = action.payload;
  });
});
export default settingsReducer;
