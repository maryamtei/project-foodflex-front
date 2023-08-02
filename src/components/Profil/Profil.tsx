import { FormEvent, useState } from 'react';
import { Mail, User } from 'react-feather';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Field from './Field/Field';
import { editInfoProfil, logout } from '../../store/reducers/user';
import { changeFavoriIsOpen } from '../../store/reducers/favoris';

function Profil() {
  const [editProfil, setEditProfil] = useState(false);

  function handleEditProfil() {
    setEditProfil(!editProfil);
  }

  const dispatch = useAppDispatch();

  function handleSubmitEditProfil(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    dispatch(editInfoProfil(formData));
    setEditProfil(!editProfil);
  }

  function handleLogout() {
    dispatch(logout());
  }

  const { firstName, lastName, email } = useAppSelector(
    (state) => state.settings.currentUser
  );

  const toggleFavoriProfil = () => {
    dispatch(changeFavoriIsOpen(true));
  };
  return (
    <div className="flex flex-col gap-8 h-full container p-3 px-4">
      <div className="mt-10 gap-3 flex justify-center mb-16">
        <button
          type="button"
          className="text-fourthff bg-bgff sm:text-bgff sm:bg-fourthff rounded-3xl  w-28 shadow-lg"
          onClick={toggleFavoriProfil}
        >
          Favorites
        </button>
        <button
          type="button"
          className="text-bgff bg-fourthff sm:text-fourthff sm:bg-bgff rounded-3xl  w-28 shadow-lg"
        >
          Profil
        </button>
      </div>
      <div
        className={`  text-fourthff sm:text-bgff flex flex-col ${
          editProfil ? '' : ''
        } `}
      >
        <form onSubmit={handleSubmitEditProfil}>
          {editProfil ? (
            <>
              <div className="flex mb-6">
                <User className="mr-2" />
                <Field
                  name="firstName"
                  label="Firstname :"
                  value={firstName.trim()}
                />
              </div>
              <div className="flex mb-6">
                <User className="mr-2" />
                <Field
                  name="lastName"
                  label="Lastname :"
                  value={lastName.trim()}
                />
              </div>
              <div className="flex mb-6">
                <Mail className="mr-2" />
                <Field name="email" label="Mail :" value={email.trim()} />
              </div>

              <button
                type="submit"
                className="text-fourthff bg-bgff btn rounded-3xl w-28 ml-16 shadow-lg"
              >
                Confirmed
              </button>
            </>
          ) : (
            <div className=" flex flex-col justify-center">
              <p className="  mb-2 font-semibold">Basic information :</p>
              <div className=" flex gap-1 mb-4 border rounded-lg border-fourthff sm:border-bgff p-1">
                <p className=" flex ">
                  <User className="mr-2" />
                </p>
                <p className="flex ">
                  {firstName} {lastName}
                </p>
              </div>
              <div className=" flex gap-1 mb-4 border rounded-lg border-fourthff sm:border-bgff p-1">
                <p className=" flex ">
                  <Mail className="mr-2" />
                </p>
                <p className="flex ">{email}</p>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          className=" text-fourthff bg-bgff  text-sm rounded-3xl  w-32 shadow-lg mr-5"
          onClick={() => handleEditProfil()}
        >
          {editProfil ? 'Cancelled' : 'Edit Profil'}
        </button>
        <button
          type="button"
          className="text-bgff bg-fourthff  rounded-3xl  w-32 h-1 shadow-lg"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profil;
