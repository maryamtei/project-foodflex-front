import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

interface SettingsState {
  modalIsOpen: boolean;
  signUpOpen: boolean;
  signInCredentials: {
    email: string;
    password: string;
  };
  signUpCredentials: {
    email: string;
    password: string;
    firtname: string;
    lastname: string;
  };
  isLoading: boolean;
  message: string | null;
}

const initialValue: SettingsState = {
  modalIsOpen: false,
  signUpOpen: true,
  signInCredentials: {
    email: '',
    password: '',
  },
  signUpCredentials: {
    email: '',
    password: '',
    firtname: '',
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
    .addCase(changeSignInCredentialsField, (state, action) => {
      const { property, value } = action.payload;
      state.credentials[property] = value;
    })
    .addCase(changeSignUpCredentialsField, (state, action) => {
      const { property, value } = action.payload;
      state.credentials[property] = value;
    })

    // SIGN IN

    .addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(signIn.rejected, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
      state.isOpen = false;
    })

    // SIGN IN

    .addCase(signUp.pending, (state) => {
      // Lorsque mon action login est en cours d'exécution
      state.isLoading = true;
      // Je remet à null l'erreur, ici je suis dans le cas où ma requête viens d'être lancer
      state.error = null;
    })
    .addCase(signUp.rejected, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
      state.isOpen = false;
    });
});

export default settingsReducer;
