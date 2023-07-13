// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

interface SettingsState {
  modalIsOpen: boolean;
  isLoged: boolean;
  signUpOpen: boolean;
  signInCredentials: {
    email: string;
    password: string;
  };
  signUpCredentials: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
  isLoading: boolean;
  message: string | null;
}

const initialValue: SettingsState = {
  modalIsOpen: true,
  isLoged: false,
  signUpOpen: true,
  signInCredentials: {
    email: '',
    password: '',
  },
  signUpCredentials: {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  },
  isLoading: false,
  message: null,
};

export type KeysOfSignInCredentials = keyof SettingsState['signInCredentials'];
export type KeysOfSignUpCredentials = keyof SettingsState['signUpCredentials'];

export const toggleIsOpen = createAction('settings/TOGGLE_IS_OPEN');

export const toggleSignUpOpen = createAction('settings/TOGGLE_SIGN_UP');

export const changeSignInCredentialsField = createAction<{
  property: KeysOfSignInCredentials;
  value: string;
}>('settings/CHANGE_SIGN_IN_CREDENTIALS_FIELD');

export const changeSignUpCredentialsField = createAction<{
  property: KeysOfSignUpCredentials;
  value: string;
}>('settings/CHANGE_SIGN_UP_CREDENTIALS_FIELD');

export const signIn = createAsyncThunk(
  'settings/SIGNIN',
  async (credentials: SettingsState['signInCredentials']) => {
    const response = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  }
);

export const signUp = createAsyncThunk(
  'settings/SIGNUP',
  async (credentials: SettingsState['signUpCredentials']) => {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  }
);

const settingsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(toggleIsOpen, (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    })
    .addCase(toggleSignUpOpen, (state) => {
      state.signUpOpen = !state.signUpOpen;
    })
    .addCase(changeSignInCredentialsField, (state, action) => {
      const { property, value } = action.payload;
      state.signInCredentials[property] = value;
    })
    .addCase(changeSignUpCredentialsField, (state, action) => {
      const { property, value } = action.payload;
      state.signUpCredentials[property] = value;
    })

    // SIGN IN

    .addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(signIn.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
      state.modalIsOpen = false;
    })

    // SIGN Up

    .addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(signUp.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
      state.modalIsOpen = false;
    });
});
export default settingsReducer;
