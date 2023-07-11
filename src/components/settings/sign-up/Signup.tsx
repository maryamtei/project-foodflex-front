/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from '../Field';

import {
  toggleSignUpOpen,
  changeSignUpCredentialsField,
  signUp,
  toggleIsOpen,
} from '../../../store/reducers/settings';

function signup() {
  const dispatch = useAppDispatch();
  const email = useAppSelector(
    (state) => state.settingsReducer.signUpCredentials.email
  );
  const password = useAppSelector(
    (state) => state.settingsReducer.signUpCredentials.password
  );
  const firstname = useAppSelector(
    (state) => state.settingsReducer.signUpCredentials.firstname
  );
  const lastname = useAppSelector(
    (state) => state.settingsReducer.signUpCredentials.lastname
  );

  const isLoading = useAppSelector((state) => state.settingsReducer.isLoading);
  // const message = useAppSelector((state) => state.settingsReducer.message);

  const resetField = () => {
    dispatch(
      changeSignUpCredentialsField({
        property: 'email',
        value: '',
      })
    );
    dispatch(
      changeSignUpCredentialsField({
        property: 'password',
        value: '',
      })
    );
    dispatch(
      changeSignUpCredentialsField({
        property: 'firstname',
        value: '',
      })
    );
    dispatch(
      changeSignUpCredentialsField({
        property: 'lastname',
        value: '',
      })
    );
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      signUp({
        email,
        password,
        firstname,
        lastname,
      })
    );
    resetField();
  };
  const handleChangeField =
    (name: 'email' | 'password' | 'firstname' | 'lastname') =>
    (value: string) => {
      dispatch(
        changeSignUpCredentialsField({
          property: name,
          value,
        })
      );
    };

  const handleModaltoggle = () => {
    resetField();
    dispatch(toggleIsOpen());
  };
  const HandleClickButton = () => {
    resetField();
    dispatch(toggleSignUpOpen());
  };
  return (
    <div className="relative flex flex-col gap-4 z-10 p-10 w-80 text-thirdff bg-bgff rounded-xl shadow-xl items-center p-6">
      <h1 className="text-3xl font-bold text-center "> Sign-Up</h1>
      <div className="flex flex-col text-center">
        <p className="text-base ">Already registered ?</p>
        <button
          type="button"
          className="text-base underline underline-offset-2"
          onClick={HandleClickButton}
        >
          Sign-in !
        </button>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Field
          label="Firstname"
          onChange={handleChangeField('firstname')}
          type="text"
          value={firstname.trim()}
        />
        <Field
          label="Lastname"
          onChange={handleChangeField('lastname')}
          type="text"
          value={lastname.trim()}
        />
        <Field
          label="E-mail"
          onChange={handleChangeField('email')}
          value={email.trim()}
          type="email"
        />
        <Field
          label="Password"
          onChange={handleChangeField('password')}
          value={password.trim()}
          type="password"
        />

        <div className="flex justify-center ">
          <button
            type="submit"
            className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2  border-fourthff rounded-lg border-2 h-8 shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
            disabled={isLoading}
          >
            Sign-Up
          </button>
        </div>
      </form>
      <button
        type="button"
        className="absolute top-1 right-1  w-10 h-10 mt-2"
        onClick={handleModaltoggle}
      >
        <X className="w-12 h-12" />
      </button>
    </div>
  );
}

export default signup;
