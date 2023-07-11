import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

interface ProfilState {
  firstName: string;
  mail: string;
}

export const initialState: ProfilState = {
  firstName: 'Mister Flex Redux',
  mail: 'foodflex@Food.redux',
};

export const changeProfilName = createAction<string>(
  'profil/change-profil-firstName'
);

export const editProfilData = createAsyncThunk(
  'user/editProfil',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    console.log(objData);
  }
);

const profilReducer = createReducer(initialState, (builder) => {
  // builder.addCase(editProfilData.fulfilled, (state, action) => {
  //   console.log(state);
  // });
});

export default profilReducer;
