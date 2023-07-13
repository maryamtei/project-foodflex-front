import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { User } from '../../@types/Profil';
import fakeProfil from '../../components/Profil/fakeProfil.json';

interface ProfilState {
  user: User;
}

export const initialState: ProfilState = {
  user: {
    firstName: fakeProfil.user.firstName,
    lastName: fakeProfil.user.lastName,
    email: fakeProfil.user.mail,
    password: fakeProfil.user.password,
  },
};

// export const infoProfil = createAsyncThunk('user/InfoProfil', async () => {
//   const response = await fetch('http://localhost:3000/profil');

//   const data = await response.json();
//   return data;
// });

export const changeProfilName = createAction<string>(
  'profil/change-profil-firstName'
);

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
    state.user = action.payload;
  });
});

export default profilReducer;
