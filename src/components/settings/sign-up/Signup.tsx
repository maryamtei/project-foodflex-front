/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from '../Field/index';

import {
  toggleSignUpOpen,
  changeSignUpCredentialsField,
  signUp,
  toggleIsOpen,
} from '../../../store/reducers/settings';

function signup() {
  const dispatch = useAppDispatch();
  const { email, password, firstName, lastName } = useAppSelector(
    (state) => state.settings.signUpCredentials
  );

  const isLoading = useAppSelector((state) => state.settings.isLoading);

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
        property: 'firstName',
        value: '',
      })
    );
    dispatch(
      changeSignUpCredentialsField({
        property: 'lastName',
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
        firstName,
        lastName,
      })
    );
    resetField();
  };
  const handleChangeField =
    (name: 'email' | 'password' | 'firstName' | 'lastName') =>
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
    <div className="relative flex flex-col gap-4 p-10 w-80 text-thirdff bg-bgff sm:rounded-xl sm:shadow-xl items-center p-6">
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
          label="FirstName"
          onChange={handleChangeField('firstName')}
          type="text"
          value={firstName.trim()}
        />
        <Field
          label="lastName"
          onChange={handleChangeField('lastName')}
          type="text"
          value={lastName.trim()}
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
            className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2 mt-10 border-fourthff rounded-lg border-2 h-8 shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
          >
            Sign-Up
          </button>
        </div>
      </form>
      <button
        type="button"
        className="absolute top-1 right-1  w-10 h-10 mt-2 hidden sm:block"
        onClick={handleModaltoggle}
      >
        <X className="w-12 h-12" />
      </button>
    </div>
  );
}

export default signup;
