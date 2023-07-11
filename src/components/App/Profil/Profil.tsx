import { useState } from 'react';

import { Mail, User, Key } from 'react-feather';
import DataProfil from './fakeProfil.json';
import ProfilData from '../../../@types/Profil';
import Field from './Field/Field';

function Profil() {
  const [editProfil, setEditProfil] = useState(false);

  const profil: ProfilData = DataProfil;

  function handleEditProfil() {
    setEditProfil(!editProfil);
  }

  return (
    <div className="container">
      <div className="mt-10 flex justify-center mb-16	">
        <button
          type="button"
          className="btn rounded-3xl text-black w-28 shadow-lg"
        >
          Favorites
        </button>
        <button
          type="button"
          className="ml-10 btn rounded-3xl text-black w-28 shadow-lg"
        >
          Profil
        </button>
      </div>

      <div className="flex bg-bgff border rounded-2xl mx-8 py-8 px-4 h-56">
        <form action="">
          {editProfil ? (
            <>
              <div className="flex mb-8">
                <User className="mr-2" />
                <Field
                  className="w-40 ml-1 pl-1 bg-bgff border"
                  label="Name :"
                  placeholder={profil.user.name}
                  type="name"
                  name="name"
                />
              </div>
              <div className="flex mb-8">
                <Mail className="mr-2" />
                <Field
                  className="w-44 ml-1 pl-1 bg-bgff border"
                  label="Mail :"
                  placeholder={profil.user.mail}
                  type="mail"
                  name="mail"
                />
              </div>
              <div className="flex mb-8">
                <Key className="mr-2" />
                <Field
                  className="w-36 ml-1 pl-1 bg-bgff border"
                  label="Password :"
                  placeholder="********"
                  type="password"
                  name="password"
                />
              </div>
            </>
          ) : (
            <>
              <p className="flex mb-8">
                <User className="mr-2" /> Name : {profil.user.name}
              </p>
              <p className="flex mb-8">
                <Mail className="mr-2" />
                Mail : {profil.user.mail}
              </p>
              <p className="flex mb-8">
                <Key className="mr-2" />
                Password : *********
              </p>
            </>
          )}
        </form>
      </div>
      <div className="flex flex-col mt-10 items-center">
        <button
          type="button"
          className="btn text-sm rounded-3xl text-black w-32 mb-5 shadow-lg"
          onClick={() => handleEditProfil()}
        >
          {editProfil ? 'Confirmed' : 'Edit Profil'}
        </button>
        <button
          type="button"
          className="btn rounded-3xl text-black w-32 h-1 shadow-lg"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Profil;
