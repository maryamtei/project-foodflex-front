import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { User } from '../../@types/Profil';
import {
  fetchPost,
  fetchGet,
  fetchDelete,
  fetchPatch,
} from '../../utils/fetch';
import { MealAdd } from '../../@types/recipe';

dayjs.extend(weekOfYear);

interface SettingsState {
  currentUser: User;
  modalIsOpen: boolean;
  isLogged: boolean;
  signUpOpen: boolean;
  signInCredentials: {
    email: string;
    password: string;
  };
  signUpCredentials: {
    email: string;
    password: string;

    firstName: string;
    lastName: string;
  };
  isLoading: boolean;
  message: string | null;
  status: number;
  MealFavoriToAdd: MealAdd;
  idToDelete: number;
  clickAddSchedule: boolean;
  currentWeek: number;
}

const initialValue: SettingsState = {
  currentUser: {
    firstName: '',
    lastName: '',
    email: '',
    favorites: [],
    schedules: [],
  },
  modalIsOpen: false,
  isLogged: false,
  signUpOpen: true,
  signInCredentials: {
    email: '',
    password: '',
  },
  signUpCredentials: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  },
  isLoading: false,
  message: '',
  status: 0,
  MealFavoriToAdd: {
    idDbMeal: '',
    name: '',
    image: '',
    position: 0,
  },
  idToDelete: 1,
  currentWeek: dayjs().week(),
  clickAddSchedule: false,
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

// ---------------- SIGN IN -------------------//
export const signIn = createAsyncThunk(
  'settings/SIGNIN',
  async (credentials: SettingsState['signInCredentials']) => {
    const response = await fetchPost(`login`, credentials);
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);
// ---------------- LOGOUT -------------------//
export const logout = createAsyncThunk('settings/LOGOUT', async () => {
  const response = await fetchGet(`logout`);
  const data = await response.json();
  const status = await response.status;

  return { data, status };
});
// ---------------- DATA USER -------------------//
export const getUserData = createAsyncThunk('settings/USER_DATA', async () => {
  const response = await fetchGet(`user`);
  const data = await response.json();
  const status = await response.status;

  return { data, status };
});

// ---------------- SIGN UP -------------------//
export const signUp = createAsyncThunk(
  'settings/SIGNUP',
  async (credentials: SettingsState['signUpCredentials']) => {
    const response = await fetchPost(`signup`, credentials);
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);
// ------------ EDIT PROFIL --------------//
export const editInfoProfil = createAsyncThunk(
  'user/Edit-Info-Profil',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    const response = await fetchPatch(`profil`, objData);
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);

// ---------------- EDIT FAVORIS -------------------//
export const deleteFavori = createAsyncThunk(
  'user/delete-favori',
  async (idToDelete: SettingsState['idToDelete']) => {
    const response = await fetchDelete(`favorite-delete/${idToDelete}`);
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);

export const addFavori = createAsyncThunk(
  'user/add-favori',
  async (MealFavoriToAdd: SettingsState['MealFavoriToAdd']) => {
    const response = await fetchPost(`favorite-add`, MealFavoriToAdd);
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);

// ----------------------- ADD SCHEDULE ------------------------//

export const addScheduleFavori = createAction<MealAdd>('favori/add-planning');

// ----------------------- DELETE MEAL ------------------------//

export const deleteMeal = createAsyncThunk(
  'user/delete-schedule',
  async (idToDelete: SettingsState['idToDelete']) => {
    const response = await fetchDelete(`schedule-delete/${idToDelete}`);
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);
export const addSchedule = createAsyncThunk(
  'user/add-schedule',
  async (body: {
    meals: SettingsState['MealFavoriToAdd'];
    week: SettingsState['currentWeek'];
  }) => {
    const response = await fetchPost(`schedule-Meal`, {
      meals: body.meals,
      week: body.week,
    });
    const data = await response.json();
    const status = await response.status;

    return { data, status };
  }
);

export const displaySchedule = createAction<boolean>('favori/click-add-favori');
export const changeWeek = createAction<number>('schedule/current-week');

// ----------------- BEGIN REDUCER ------------------------- //
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

    // ---------------- LOGOUT -------------------//
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(logout.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        localStorage.removeItem('token');
        state.isLogged = false;
        state.currentUser = initialValue.currentUser;
      }
    })
    // ---------------- USER -------------------//
    .addCase(getUserData.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(getUserData.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        state.isLogged = true;
        state.currentUser = action.payload.data.newUser;
      }
    })
    // ---------------- SIGN IN -------------------//
    .addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        const authToken = action.payload.data.token;
        localStorage.removeItem('token');
        localStorage.setItem('token', authToken);
        state.currentUser = action.payload.data.newUser;
        state.isLogged = true;
        state.isLoading = false;
        state.modalIsOpen = false;
      }
    })

    // -------------- SIGN UP ---------------- //
    .addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(signUp.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        const authToken = action.payload.data.token;
        localStorage.removeItem('token');
        localStorage.setItem('token', authToken);
        state.currentUser = action.payload.data.newUser;
        state.isLogged = true;
        state.isLoading = false;
        state.modalIsOpen = false;
      }
    })

    // ------------ EDIT PROFIL --------------//
    .addCase(editInfoProfil.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(editInfoProfil.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(editInfoProfil.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser;
      }
    })

    // ---------------- DELETE FAVORIS -------------------//
    .addCase(deleteFavori.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(deleteFavori.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteFavori.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser;
      }
    })

    // ---------------- ADD FAVORIS -------------------//
    .addCase(addFavori.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(addFavori.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(addFavori.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser;
      }
    })

    // ---------------- ADD SCHEDULE -------------------//
    .addCase(changeWeek, (state, action) => {
      state.currentWeek = action.payload;
    })
    .addCase(addScheduleFavori, (state, action) => {
      state.MealFavoriToAdd.idDbMeal = action.payload.idDbMeal;
      state.MealFavoriToAdd.image = action.payload.image;
      state.MealFavoriToAdd.name = action.payload.name;
      state.MealFavoriToAdd.position = action.payload.position;
    })

    .addCase(addSchedule.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(addSchedule.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(addSchedule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        state.clickAddSchedule = false;
        state.currentUser = action.payload.data.newUser;
      }
    })

    .addCase(deleteMeal.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(deleteMeal.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteMeal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser;
      }
    })
    .addCase(displaySchedule, (state, action) => {
      state.clickAddSchedule = action.payload;
    });
});
export default settingsReducer;
