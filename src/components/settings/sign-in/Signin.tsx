/* eslint-disable react-hooks/rules-of-hooks */
import { FormEvent } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from '../Field/index';

import {
  changeSignInCredentialsField,
  signIn,
  toggleSignUpOpen,
  toggleIsOpen,
} from '../../../store/reducers/settings';

function signin() {
  const dispatch = useAppDispatch();
  const email = useAppSelector(
    (state) => state.settings.signInCredentials.email
  );
  const password = useAppSelector(
    (state) => state.settings.signInCredentials.password
  );

  const isLoading = useAppSelector((state) => state.settings.isLoading);

  const resetField = () => {
    dispatch(
      changeSignInCredentialsField({
        property: 'email',
        value: '',
      })
    );
    dispatch(
      changeSignInCredentialsField({
        property: 'password',
        value: '',
      })
    );
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      signIn({
        email,
        password,
      })
    );
    resetField();
  };
  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    dispatch(
      changeSignInCredentialsField({
        property: name,
        value,
      })
    );
  };
  const handleModaltoggle = () => {
    dispatch(toggleIsOpen());
    resetField();
  };
  const HandleClickButton = () => {
    dispatch(toggleSignUpOpen());
    resetField();
  };
  return (
    <div className="relative flex flex-col gap-4 p-10 w-80 text-thirdff bg-bgff sm:rounded-xl sm:shadow-xl items-center p-6">
      <h1 className="text-3xl font-bold text-center "> Sign-In</h1>
      <div className="flex flex-col text-center">
        <p className="text-base ">New customer ?</p>
        <button
          type="button"
          className="text-base underline underline-offset-2"
          onClick={HandleClickButton}
        >
          Sign-up !
        </button>
      </div>

      <form autoComplete="off" onSubmit={handleSubmit}>
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
            className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2 bg-fourthff border-fourthff rounded-lg border-2 h-8 shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
            disabled={isLoading}
          >
            Sign-In
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

export default signin;
