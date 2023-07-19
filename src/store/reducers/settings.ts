import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Favorite, Meal, User } from '../../@types/Profil';
import usersData from '../../Data/UserData.json';
import { fetchPost, fetchGet, fetchDelete } from '../../utils/fetch';

interface SettingsState {
  // users: User[];
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
  // users: usersData,
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
    firstName: '',
    lastName: '',
  },
  isLoading: false,
  message: null,
  MealFavoriToAdd: {
    idMeal: '',
    name: '',
    imageUrl: '',
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

export const logout = createAction('settings/LOGOUT');

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
    // const response = await fetch('http://localhost:3000/signup', {
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
      localStorage.removeItem('token');
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
      // const userSignIn = action.payload;
      //  const userFind = state.users.find(
      //    (user) => user.email === userSignIn.email
      //  );
      //  state.message = action.payload.message;
      //  ----------------- CREATION ACCOUNT USER ----------------------//
      // if (!userFind) {
      //   const newUser = {
      //     firstName: userSignIn.firstName || '',
      //     lastName: userSignIn.lastName || '',
      //     email: userSignIn.email,
      //     password: userSignIn.password,
      //     favorites: [],
      //     // on crée un tableau de taille 10 et pour chaque élément du tableau,
      //     // on met un objet week,meal[]
      //     schedule: Array.from({ length: 10 }, (_, index) => ({
      //       week: index,
      //       meals: [],
      //     })),
      //   };
      //   state.users.push(newUser);
      //   state.message = `Your account is created, please Sign In`;
      // } else {
      //   state.message = `User ${userSignIn.email} already exists`;
      // }
      // // state.message = action.payload.message;
      // state.isLoading = false;
      // state.modalIsOpen = false;
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
        console.log(response.user);
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
        console.log(response.user);
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
    .addCase(addSchedule, (state, action) => {
      state.MealFavoriToAdd = action.payload;
    })
    .addCase(displaySchedule, (state, action) => {
      state.clickAddSchedule = action.payload;
    })
    .addCase(selectedDay, (state, action) => {
      // const dayPosition = action.payload;
      // const findWeek = state.currentUser.schedule.find(
      //   (week) => week.week === state.currentWeek
      // );
      // const findFavori = findWeek?.meals.find(
      //   (day) => day.position === dayPosition
      // );
      // if (!findFavori) {
      //   state.MealFavoriToAdd.position = action.payload;
      //   // Pour chaque semaine, on vérifie si c'est la semaine courant
      //   // et on change la valeur
      //   state.currentUser.schedule = state.currentUser.schedule.map((week) => {
      //     if (week.week === state.currentWeek) {
      //       week.meals.push(state.MealFavoriToAdd);
      //     }
      //     return week;
      //   });
      //   state.users = state.users.map((user) => {
      //     if (user.email === state.currentUser.email) {
      //       return {
      //         ...user,
      //         schedule: state.currentUser.schedule,
      //       };
      //     }
      //     return user;
      //   });
      //   // fermer la modale planning
      //   state.clickAddSchedule = false;
      // }
    });
});
export default settingsReducer;
