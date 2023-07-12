import { FormEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, User, Key } from 'react-feather';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from './Field/Field';
import { editProfilData, infoProfil } from '../../../store/reducers/profil';

function Profil() {
  const [editProfil, setEditProfil] = useState(false);

  function handleEditProfil() {
    setEditProfil(!editProfil);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(infoProfil());
  }, [dispatch]);

  function handleSubmitEditProfil(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    dispatch(editProfilData(formData));
    setEditProfil(!editProfil);
  }

  const { firstName, lastName, email, password } = useAppSelector(
    (state) => state.profilReducer.profil
  );

  return (
    <div className="container">
      <div className="mt-10 flex justify-center mb-16">
        <NavLink
          to="/favoris"
          className={({ isActive }) =>
            isActive
              ? 'btn rounded-3xl  w-28 shadow-lg text-activeff'
              : 'btn rounded-3xl  w-28 shadow-lg'
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? 'ml-10 btn rounded-3xl  w-28 shadow-lg text-activeff'
              : 'ml-10 btn rounded-3xl  w-28 shadow-lg'
          }
        >
          Profil
        </NavLink>
      </div>

      <div className="flex bg-bgff border rounded-2xl mx-8 py-8 px-4 h-96">
        <form onSubmit={handleSubmitEditProfil}>
          {editProfil ? (
            <>
              <div className="flex mb-8">
                <User className="mr-2" />
                <Field name="firstName" label="Firstname :" value={firstName} />
              </div>
              <div className="flex mb-8">
                <User className="mr-2" />
                <Field name="lastName" label="Lastname :" value={lastName} />
              </div>
              <div className="flex mb-8">
                <Mail className="mr-2" />
                <Field name="email" label="Mail :" value={email} />
              </div>
              <div className="flex mb-8">
                <Key className="mr-2" />
                <Field name="password" label="Password :" value={password} />
              </div>

              <button
                type="submit"
                className="btn rounded-3xl w-28 ml-16 shadow-lg"
              >
                Confirmed
              </button>
            </>
          ) : (
            <>
              <p className="flex mb-8">
                <User className="mr-2" /> Name : {firstName}
              </p>
              <p className="flex mb-8">
                <Mail className="mr-2" />
                Mail : {email}
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
          {editProfil ? 'Cancelled' : 'Edit Profil'}
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
