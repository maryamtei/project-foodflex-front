/* eslint-disable react-hooks/rules-of-hooks */
// Import necessary modules and custom hooks
import React, { FormEvent, useEffect, useState } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from '../Field/index';

// Import Redux actions from the user slice
import {
  toggleSignUpOpen,
  changeSignUpCredentialsField,
  signUp,
  toggleIsOpen,
} from '../../../store/reducers/user';

// Define the 'signup' component
function Signup() {
  // Get the Redux dispatch function
  const dispatch = useAppDispatch();

  // State variables for enabling/disabling the 'Sign-Up' button based on password matching criteria
  const [disabled, setDisabled] = useState(true);

  // Get the 'email', 'password', 'confirmPassword', 'firstName', and 'lastName' fields from the 'signUpCredentials' state using the 'useAppSelector' hook
  const { email, password, confirmPassword, firstName, lastName } =
    useAppSelector((state) => state.settings.signUpCredentials);

  // useEffect to check if the password is valid and set 'disabled' accordingly
  useEffect(() => {
    if (confirmPassword && confirmPassword === password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, confirmPassword, password]);

  // Function to reset all the fields in the state
  const resetField = () => {
    const fields: (
      | 'email'
      | 'password'
      | 'firstName'
      | 'lastName'
      | 'confirmPassword'
    )[] = ['email', 'password', 'firstName', 'lastName', 'confirmPassword'];

    fields.forEach((name) => {
      dispatch(changeSignUpCredentialsField({ property: name, value: '' }));
    });
  };

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Dispatch the 'signUp' action with all the form field values as payload
    dispatch(
      signUp({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      })
    );
    // Reset all the form fields after form submission
    resetField();
  };
  // Function to handle input field changes for 'email', 'password', 'firstName', 'lastName', and 'confirmPassword'
  const handleChangeField =
    (
      name: 'email' | 'password' | 'firstName' | 'lastName' | 'confirmPassword'
    ) =>
    (value: string) => {
      dispatch(
        changeSignUpCredentialsField({
          property: name,
          value,
        })
      );
    };

  // Function to toggle the modal
  const handleModaltoggle = () => {
    resetField();
    dispatch(toggleIsOpen());
  };
  // Function to handle clicking on the 'Sign-in' button
  const HandleClickButton = () => {
    resetField();
    dispatch(toggleSignUpOpen());
  };

  // Render the sign-up form component
  return (
    <div
      className="
          relative  flex flex-col gap-4 w-80 text-titleff sm:bg-thirdff sm:bg-opacity-95 sm:rounded-xl sm:shadow-xl items-center p-6"
    >
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
        {/* Field component for entering firstname */}
        <Field
          label="Firstname"
          onChange={handleChangeField('firstName')}
          type="text"
          value={firstName.trim()}
        />
        {/* Field component for entering lastname */}
        <Field
          label="Lastname"
          onChange={handleChangeField('lastName')}
          type="text"
          value={lastName.trim()}
        />
        {/* Field component for entering email */}
        <Field
          label="E-mail"
          onChange={handleChangeField('email')}
          value={email.trim()}
          type="email"
        />
        {/* Field component for entering password */}
        <Field
          label="Password"
          onChange={handleChangeField('password')}
          value={password.trim()}
          type="password"
        />
        {/* Password validation messages */}
        {password && password.length < 8 && (
          <p className=" text-red-500 text-sm text-center">
            8 characters minimum
          </p>
        )}
        {/* Field component for confirming password */}
        <Field
          label="Confirm password"
          onChange={handleChangeField('confirmPassword')}
          value={confirmPassword.trim()}
          type="password"
        />
        {/* Confirm password validation messages */}
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
          {/* Sign-Up button */}
          <button
            disabled={disabled}
            type="submit"
            className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2 mt-10 bg-white border-titleff hover:border-fourthff hover:text-fourthff rounded-lg border-2 shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
          >
            Sign-Up
          </button>
        </div>
      </form>
      {/* Close button (X icon) for the sign-up form */}
      <button
        type="button"
        className="absolute top-1 right-1  w-10 h-10 mt-2 block"
        onClick={handleModaltoggle}
      >
        <X className="w-12 h-12" />
      </button>
    </div>
  );
}

export default Signup;
