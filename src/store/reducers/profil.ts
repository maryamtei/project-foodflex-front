import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { User } from '../../@types/Profil';

interface ProfilState {
  user: User;
}

export const initialState: ProfilState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    favorites: [],
    schedule: [],
  },
};

// export const infoProfil = createAsyncThunk('user/InfoProfil', async () => {
//   const response = await fetch('http://localhost:3000/profil');

//   const data = await response.json();
//   return data;
// });

export const editProfilData = createAsyncThunk(
  'user/EditProfil',
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

const profilReducer = createReducer(initialState, (builder) => {
  builder.addCase(editProfilData.fulfilled, (state, action) => {
    // state.user = action.payload;
  });
});

export default profilReducer;
