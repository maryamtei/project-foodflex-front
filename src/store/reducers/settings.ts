import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Meal, User } from '../../@types/Profil';
import { fetchPost, fetchGet, fetchDelete } from '../../utils/fetch';

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
  MealFavoriToAdd: Meal;
  idToDelete: string;
  clickAddSchedule: boolean;
  currentWeek: number;
}

const initialValue: SettingsState = {
  currentUser: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
  message: null,
  MealFavoriToAdd: {
    idDbMeal: '',
    name: '',
    image: '',
    position: 0,
  },
  idToDelete: '',
  currentWeek: 1,
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

    return data;
  }
);
// ---------------- LOGOUT -------------------//
export const logout = createAsyncThunk('settings/LOGOUT', async () => {
  const response = await fetchGet(`logout`);
  const data = await response.json();

  return data;
});
// ---------------- DATA USER -------------------//
export const getUserData = createAsyncThunk('settings/USER_DATA', async () => {
  const response = await fetchGet(`user`);
  const data = await response.json();

  return data;
});

// ---------------- SIGN UP -------------------//
export const signUp = createAsyncThunk(
  'settings/SIGNUP',
  async (credentials: SettingsState['signUpCredentials']) => {
    const response = await fetchPost(`signup`, credentials);
    const data = await response.json();

    return data;
  }
);
// ------------ EDIT PROFIL --------------//
export const editInfoProfil = createAsyncThunk(
  'user/Edit-Info-Profil',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    // const response = await fetch('http://localhost:3000/profil', objData);
    // const data = await response.json();

    return objData as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  }
);

// ---------------- EDIT FAVORIS -------------------//
export const deleteFavori = createAsyncThunk(
  'user/delete-favori',
  async (idToDelete: SettingsState['idToDelete']) => {
    const response = await fetchDelete(`favorite-delete/${idToDelete}`);
    const data = await response.json();

    return data;
  }
);

export const addFavori = createAsyncThunk(
  'user/add-favori',
  async (MealFavoriToAdd: SettingsState['MealFavoriToAdd']) => {
    const response = await fetchPost(`favorite-add`, MealFavoriToAdd);
    const data = await response.json();

    return data;
  }
);

// ----------------------- ADD SCHEDULE ------------------------//

export const addScheduleFavori = createAction<Meal>('favori/add-planning');

export const addWeekSchedule = createAsyncThunk(
  'user/add-week-schedule',
  async (week: { week: SettingsState['currentWeek'] }) => {
    const response = await fetchPost(`scheduleAddWeek`, week);
    const data = await response.json();

    return data;
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

    return data;
  }
);

export const displaySchedule = createAction<boolean>('favori/click-add-favori');
export const selectedDay = createAction<number>('favori/selected-day');
export const nextWeek = createAction<boolean>('schedule/current-week');

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
    })
    .addCase(logout.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(logout.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status) {
        state.isLogged = false;
        state.currentUser = initialValue.currentUser;
        localStorage.removeItem('token');
      }
    })
    // ---------------- USER -------------------//
    .addCase(getUserData.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(getUserData.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(getUserData.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.message === 'Authentification réussie.') {
        state.isLogged = true;
        state.currentUser = response.user;
        console.log(response);
      }
    })
    // ---------------- SIGN IN -------------------//
    .addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(signIn.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.message === 'Connexion réussie.') {
        const authToken = response.token;
        localStorage.removeItem('token');
        localStorage.setItem('token', authToken);
        state.currentUser = response.user;
        state.isLogged = true;
      }
      state.isLoading = false;
      state.modalIsOpen = false;
    })

    // -------------- SIGN UP ---------------- //
    .addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(signUp.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.modalIsOpen = false;
    })

    // ------------ EDIT PROFIL --------------//
    .addCase(editInfoProfil.fulfilled, (state, action) => {
      // const editUser = action.payload;
      /// / Edit Profil in Redux
      // state.users = state.users.map((user) => {
      //  if (user.email === state.currentUser.email) {
      //    state.currentUser = {
      //      ...state.currentUser,
      //      ...editUser,
      //    };
      //    return {
      //      ...user,
      //      ...editUser,
      //    };
      //  }
      //  return user;
      // });
    })

    // ---------------- DELETE FAVORIS -------------------//
    .addCase(deleteFavori.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(deleteFavori.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(deleteFavori.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status) {
        state.currentUser = response.user;
      }
    })

    // ---------------- ADD FAVORIS -------------------//
    .addCase(addFavori.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(addFavori.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(addFavori.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status) {
        state.currentUser = response.user;
      }
    })

    // ---------------- ADD SCHEDULE -------------------//
    .addCase(nextWeek, (state, action) => {
      if (action.payload && state.currentWeek < 52) {
        state.currentWeek += 1;
      }
      if (!action.payload && state.currentWeek > 1) {
        state.currentWeek -= 1;
      }
    })
    .addCase(addScheduleFavori, (state, action) => {
      state.MealFavoriToAdd = action.payload;
    })

    .addCase(addWeekSchedule.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(addWeekSchedule.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(addWeekSchedule.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
    })

    .addCase(addSchedule.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    })
    .addCase(addSchedule.rejected, (state) => {
      state.message = 'rejected';
      state.isLoading = false;
    })
    .addCase(addSchedule.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
    })
    .addCase(displaySchedule, (state, action) => {
      state.clickAddSchedule = action.payload;
    })
    .addCase(selectedDay, (state, action) => {
      const dayPosition = action.payload;
      const findWeek = state.currentUser.schedules.find(
        (week) => week.week === state.currentWeek
      );
      const findFavori = findWeek?.meals.find(
        (day) => day.position === dayPosition
      );
      if (!findFavori) {
        state.MealFavoriToAdd.position = action.payload;
        // Pour chaque semaine, on vérifie si c'est la semaine courant
        // et on change la valeur
        state.currentUser.schedules = state.currentUser.schedules.map(
          (week) => {
            if (week.week === state.currentWeek) {
              week.meals.push(state.MealFavoriToAdd);
            }
            return week;
          }
        );
        // state.users = state.users.map((user) => {
        //   if (user.email === state.currentUser.email) {
        //     return {
        //       ...user,
        //       schedule: state.currentUser.schedule,
        //     };
        //   }
        //   return user;
        // });
        // // fermer la modale planning
        // state.clickAddSchedule = false;
      }
    });
});
export default settingsReducer;
