/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
  const [confirmePassword, setConfirmePassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { email, password, firstName, lastName } = useAppSelector(
    (state) => state.settings.signUpCredentials
  );

  useEffect(() => {
    if (password) {
      if (password.length >= 8 && confirmePassword === password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [setDisabled, confirmePassword, password]);

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

  const handleChangeConfirmPassword = (value: string) => {
    setConfirmePassword(value);
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
    <div className="relative flex flex-col gap-4 w-80 text-thirdff bg-bgff sm:rounded-xl sm:shadow-xl items-center p-6">
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
          onChange={handleChangeField('firstName')}
          type="text"
          value={firstName.trim()}
        />
        <Field
          label="Lastname"
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
        {password && password.length < 8 && (
          <p className=" text-red-500 text-sm text-center">
            8 characters minimum
          </p>
        )}
        <Field
          label="Confirm password"
          onChange={handleChangeConfirmPassword}
          value={confirmePassword.trim()}
          type="password"
        />
        {password && !disabled && (
          <p className=" text-green-500 text-sm text-center ">
            Both passwords are similar
          </p>
        )}
        {password && disabled && (
          <p className=" text-red-500 text-sm text-center">
            Both passwords are not similar
          </p>
        )}
        <div className="flex justify-center ">
          <button
            disabled={disabled}
            type="submit"
            className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2 mt-10 border-fourthff rounded-lg border-2  shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
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
