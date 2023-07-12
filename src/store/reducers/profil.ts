import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { User } from '../../@types/Profil';

interface ProfilState {
  profil: User;
}

export const initialState: ProfilState = {
  profil: {
    firstName: 'Mister Flex',
    lastName: 'Redux',
    email: 'foodflex@Food.redux',
    password: '123456',
  },
};

export const changeProfilName = createAction<string>(
  'profil/change-profil-firstName'
);

export const infoProfil = createAsyncThunk('user/InfoProfil', async () => {
  const response = await fetch('http://localhost:3000/profil');

  const data = await response.json();
  return data;
});

export const editProfilData = createAsyncThunk(
  'user/EditProfil',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const response = await fetch('http://localhost:3000/profil', objData);

    const data = await response.json();
    return data;
  }
);

const profilReducer = createReducer(initialState, (builder) => {
  builder.addCase(editProfilData.fulfilled, (state, action) => {
    state.profil = action.payload;
  });
  // .addCase(editProfilData.pending, (state, action) => {
  // --------- composant Loading a mettre ------- //
  // })
  // .addCase(editProfilData.rejected, (state, action) => {
  // --------- message erreur ------- //
  // });
});

export default profilReducer;
