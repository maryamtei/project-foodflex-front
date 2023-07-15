import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Favorite, Meal, User } from '../../@types/Profil';
import usersData from '../../fakeData/fakeUser.json';

interface SettingsState {
  users: User[];
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
    firstname: string;
    lastname: string;
  };
  isLoading: boolean;
  message: string | null;
  MealFavoriToAdd: Meal;
  clickAddSchedule: boolean;
  currentWeek: number;
}

const initialValue: SettingsState = {
  users: usersData,
  currentUser: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favorites: [],
    schedule: [],
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
    firstname: '',
    lastname: '',
  },
  isLoading: false,
  message: null,
  MealFavoriToAdd: {
    idMeal: '',
    name: '',
    imageUrl: '',
    position: 0,
  },
  currentWeek: 1,
  clickAddSchedule: false,
};

export type KeysOfSignInCredentials = keyof SettingsState['signInCredentials'];
export type KeysOfSignUpCredentials = keyof SettingsState['signUpCredentials'];

export const toggleIsOpen = createAction('settings/TOGGLE_IS_OPEN');

export const toggleSignUpOpen = createAction('settings/TOGGLE_SIGN_UP');

export const logout = createAction('settings/LOGOUT');

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
    // const response = await fetch('http://localhost:3000/signin', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(credentials),
    // });
    // const data = await response.json();

    return credentials;
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
export const deleteFavori = createAction<string>('user/delete-favori');
export const addFavori = createAction<Favorite>('user/add-favori');

// ----------------------- ADD SCHEDULE ------------------------//

export const addSchedule = createAction<Meal>('favori/add-planning');
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
    .addCase(logout, (state) => {
      state.isLogged = false;
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
      const userSignIn = action.payload;
      const userFind = state.users.find(
        (user) =>
          user.email === userSignIn.email &&
          user.password === userSignIn.password
      );

      // state.message = action.payload.message;
      if (userFind) {
        state.isLogged = true;
        state.currentUser = userFind;
      }
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
    })

    // ------------ EDIT PROFIL --------------//
    .addCase(editInfoProfil.fulfilled, (state, action) => {
      const editUser = action.payload;

      // Edit Profil in Redux
      state.users = state.users.map((user) => {
        if (user.email === state.currentUser.email) {
          state.currentUser = {
            ...state.currentUser,
            ...editUser,
          };
          return {
            ...user,
            ...editUser,
          };
        }
        return user;
      });
    })

    // ---------------- DELETE FAVORIS -------------------//
    .addCase(deleteFavori, (state, action) => {
      const idToDelete = action.payload;
      const updatedFavorites = state.currentUser.favorites.filter(
        (favori) => favori.idMeal !== idToDelete
      );

      // Edit favorites in BDD/Redux
      state.users = state.users.map((user) => {
        if (user.email === state.currentUser.email) {
          state.currentUser = {
            ...state.currentUser,
            favorites: updatedFavorites,
          };
          return {
            ...user,
            favorites: updatedFavorites,
          };
        }
        return user;
      });
    })

    // ---------------- ADD FAVORIS -------------------//
    .addCase(addFavori, (state, action) => {
      const favoriToAdd = action.payload;
      state.currentUser.favorites.push(favoriToAdd);

      state.users = state.users.map((user) => {
        if (user.email === state.currentUser.email) {
          state.currentUser = {
            ...state.currentUser,
            favorites: state.currentUser.favorites,
          };
          return {
            ...user,
            favorites: state.currentUser.favorites,
          };
        }
        return user;
      });
    })
    // ---------------- ADD SCHEDULE -------------------//
    .addCase(nextWeek, (state, action) => {
      if (action.payload && state.currentWeek < 4) {
        state.currentWeek += 1;
      }
      if (!action.payload && state.currentWeek > 1) {
        state.currentWeek -= 1;
      }
    })
    .addCase(addSchedule, (state, action) => {
      state.MealFavoriToAdd = action.payload;
    })
    .addCase(displaySchedule, (state, action) => {
      state.clickAddSchedule = action.payload;
    })
    .addCase(selectedDay, (state, action) => {
      const dayPosition = action.payload;

      const findWeek = state.currentUser.schedule.find(
        (week) => week.week === state.currentWeek
      );

      const findFavori = findWeek?.meals.find(
        (day) => day.position === dayPosition
      );

      if (!findFavori) {
        state.MealFavoriToAdd.position = action.payload;

        // Pour chaque semaine, on vérifie si c'est la semaine courant
        // et on change la valeur
        state.currentUser.schedule = state.currentUser.schedule.map((week) => {
          if (week.week === state.currentWeek) {
            week.meals.push(state.MealFavoriToAdd);
          }
          return week;
        });

        state.users = state.users.map((user) => {
          if (user.email === state.currentUser.email) {
            return {
              ...user,
              // spread operator, on fusionne le planning avec le nouveau
              schedule: state.currentUser.schedule,
            };
          }
          return user;
        });

        // fermer la modale planning
        state.clickAddSchedule = false;
      }
    });
});
export default settingsReducer;
