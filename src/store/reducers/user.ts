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
  currentUser: User; // Represents the current user object
  modalIsOpen: boolean; // Indicates whether if login modal is open or not (true/false)
  isLogged: boolean; // Indicates if the user is logged in or not (true/false)
  signUpOpen: boolean; // Indicates if the sign-up/sign-in form is open or not (true/false)
  signInCredentials: {
    // Object containing sign-in credentials
    email: string; // Email associated with the sign-in credentials
    password: string; // Password associated with the sign-in credentials
  };
  signUpCredentials: {
    // Object containing sign-up credentials
    email: string; // Email associated with the sign-up credentials
    password: string; // Password associated with the sign-up credentials
    confirmPassword: string; // confirmPassword associated with password
    firstName: string; // First name of the user signing up
    lastName: string; // Last name of the user signing up
  };
  isLoading: boolean; // Indicates if the application is currently loading (pending)(true/false)
  message: string | null; // message coming from the back, null if no message is present
  status: number; // Represents the status of HTTP status code
  MealFavoriToAdd: MealAdd; // Saving meal object when we need to add to favorites
  idToDelete: number; // Represents the ID of a meal to be deleted in schedule
  clickAddSchedule: boolean; // Indicates if there's a click to add a schedule (true/false)
  currentWeek: number; // Represents the current week number
}

export const initialValue: SettingsState = {
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
    confirmPassword: '',
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

// ------------------DEFINE KEYS--------------------------//

// Define a custom type alias 'KeysOfSignInCredentials'
export type KeysOfSignInCredentials = keyof SettingsState['signInCredentials'];
// Define a custom type alias 'KeysOfSignUpCredentials'
export type KeysOfSignUpCredentials = keyof SettingsState['signUpCredentials'];

// ------------------CREATE ACTION--------------------------//

export const changeSignInCredentialsField = createAction<{
  property: KeysOfSignInCredentials;
  value: string;
}>('settings/CHANGE_SIGN_IN_CREDENTIALS_FIELD');

export const changeSignUpCredentialsField = createAction<{
  property: KeysOfSignUpCredentials;
  value: string;
}>('settings/CHANGE_SIGN_UP_CREDENTIALS_FIELD');

export const toggleIsOpen = createAction('settings/TOGGLE_IS_OPEN');
export const toggleSignUpOpen = createAction('settings/TOGGLE_SIGN_UP');

// ---------------- SIGN IN -------------------//
// This thunk represents the process of signing in with the provided credentials.
export const signIn = createAsyncThunk(
  'settings/SIGNIN',
  async (credentials: SettingsState['signInCredentials']) => {
    // Inside the async function, an HTTP POST request is made to a 'login' endpoint with the provided 'credentials'
    const response = await fetchPost(`login`, credentials);
    // The response is processed, parsing the JSON data from the server.
    const data = await response.json();
    // The HTTP status code of the response is extracted to show up message.
    const status = await response.status;
    // The data and status are returned as an object.
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
// Define an asynchronous thunk function called 'getUserData'.
// This thunk represents the process of fetching user data from the server.
export const getUserData = createAsyncThunk('settings/USER_DATA', async () => {
  // Inside the async function, an HTTP GET request is made to the 'user' endpoint.
  const response = await fetchGet(`user`);
  // The response is processed, parsing the JSON data from the server.
  const data = await response.json();
  // The HTTP status code of the response is extracted.
  const status = await response.status;
  // The data and status are returned as an object.
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

// ---------------- CONTACT -------------------//
export const contact = createAsyncThunk(
  'settings/CONTACT',
  async (formData: object) => {
    const response = await fetchPost(`contact`, formData);
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
    // Action: 'toggleIsOpen'
    // When the 'toggleIsOpen' action is dispatched, it toggles the 'modalIsOpen' property.
    .addCase(toggleIsOpen, (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    })

    // Action: 'toggleSignUpOpen'
    // When the 'toggleSignUpOpen' action is dispatched, it toggles the 'signUpOpen' property.
    .addCase(toggleSignUpOpen, (state) => {
      state.signUpOpen = !state.signUpOpen;
    })

    // Action: 'changeSignInCredentialsField'
    // When the 'changeSignInCredentialsField' action is dispatched, it updates a specific property of 'signInCredentials'.
    .addCase(changeSignInCredentialsField, (state, action) => {
      const { property, value } = action.payload;
      state.signInCredentials[property] = value;
    })

    // Action: 'changeSignUpCredentialsField'
    // When the 'changeSignUpCredentialsField' action is dispatched, it updates a specific property of 'signUpCredentials'.
    .addCase(changeSignUpCredentialsField, (state, action) => {
      const { property, value } = action.payload;
      state.signUpCredentials[property] = value;
    })

    // ---------------- LOGOUT -------------------//
    // ... Handling actions for the 'logout' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        // If status OK
        localStorage.removeItem('token'); // Remove item token to localStorage
        state.isLogged = false;
        state.currentUser = initialValue.currentUser; // init data user
        window.location.reload(); // reload
      }
    })
    // ---------------- USER -------------------//
    // ... Handling actions for the 'USER' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        state.isLogged = true; // User is logged
        state.currentUser = action.payload.data.newUser; // init data user
      }
    })
    // ---------------- SIGN IN -------------------//
    // ... Handling actions for the 'SIGN IN' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        const authToken = action.payload.data.token; // Token recovery sent by the back
        localStorage.removeItem('token'); // init token to null
        localStorage.setItem('token', authToken); // Set token to localStorage
        state.currentUser = action.payload.data.newUser; // init data user
        state.isLogged = true; // User is logged
        state.isLoading = false;
        state.modalIsOpen = false; // Sign-up modale is closed
      }
    })

    // -------------- SIGN UP ---------------- //
    // ... Handling actions for the 'SIGN UP' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        const authToken = action.payload.data.token; // Token recovery sent by the back
        localStorage.removeItem('token'); // init token to null
        localStorage.setItem('token', authToken); // Set token to localStorage
        state.currentUser = action.payload.data.newUser; // Init data user
        state.isLogged = true; // User is logged
        state.isLoading = false;
        state.modalIsOpen = false; // Sign-in modale is closed
      }
    })

    // ------------ EDIT PROFIL --------------//
    // ... Handling actions for the 'EDIT PROFIL' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser; // init data user
      }
    })

    // ---------------- DELETE FAVORIS -------------------//
    // ... Handling actions for the 'DELETE FAVORIS' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser; // init data user
      }
    })

    // ---------------- ADD FAVORIS -------------------//
    // ... Handling actions for the 'ADD FAVORIS' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser; // init data user
      }
    })

    // ---------------- ADD SCHEDULE -------------------//
    // ... Handling actions for the 'ADD SCHEDULE' asynchronous thunk (pending, rejected, fulfilled).
    .addCase(changeWeek, (state, action) => {
      state.currentWeek = action.payload; // CurrentWeek was changed
    })
    .addCase(addScheduleFavori, (state, action) => {
      // Save meal information in MealFavoriToAdd
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        state.clickAddSchedule = false; // Schedule modale is closed
        state.currentUser = action.payload.data.newUser; // init data user
      }
    })
    // ---------------- delete SCHEDULE -------------------//
    // ... Handling actions for the 'delete SCHEDULE' asynchronous thunk (pending, rejected, fulfilled).
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
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
      if (state.status === 200) {
        state.currentUser = action.payload.data.newUser; // init data user
      }
    })
    // ---------------- DISPLAY SCHEDULE -------------------//
    // ... Handling actions for the 'display schedule' asynchronous thunk (pending, rejected, fulfilled).
    .addCase(displaySchedule, (state, action) => {
      state.clickAddSchedule = action.payload; // Schedule modale is open
    })

    // ---------------- CONTACT -------------------//
    .addCase(contact.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.status = 0;
    })
    .addCase(contact.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(contact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.message; // message to display
      state.status = action.payload.status; // code status
    });
});
export default settingsReducer;
