/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, FormEvent } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from '../Field';

import {
  changeSignInCredentialsField,
  signIn,
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      signIn({
        email,
        password,
      })
    );
  };

  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    dispatch(
      changeSignInCredentialsField({
        property: name,
        value,
      })
    );
  };

  return (
    <div className="relative bg-bgff flex flex-col gap-4 z-10 p-10 w-80 text-thirdff border-2 rounded-lg shadow-2xl items-center p-6">
      <h1 className="text-3xl font-bold text-center "> Sign-In</h1>
      <div className="flex flex-col text-center">
        <p className="text-base ">New customer ?</p>
        <p className="text-base underline underline-offset-2">Sign-Up !</p>
      </div>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <Field
          label="E-mail"
          onChange={handleChangeField('email')}
          value={email}
        />
        <Field
          label="Password"
          onChange={handleChangeField('password')}
          value={password}
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
      <div className="flex flex-col text-center">
        <p className="text-base underline underline-offset-2">
          Forgot your password ?
        </p>
      </div>
      <button
        type="button"
        className="fixed hidden rounded-full border-2 w-12 h-12 mt-2"
        // onClick={handleClickToggle}
      >
        <X className="w-12 h-12" />
      </button>
    </div>
  );
}

export default signup;
