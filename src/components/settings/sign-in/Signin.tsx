/* eslint-disable react-hooks/rules-of-hooks */
// Import necessary modules and custom hooks
import { FormEvent } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Field from '../Field/index';

// Import Redux actions from the user slice
import {
  changeSignInCredentialsField,
  signIn,
  toggleSignUpOpen,
  toggleIsOpen,
} from '../../../store/reducers/user';

// Define the 'signin' component
function signin() {
  // Get the Redux dispatch function
  const dispatch = useAppDispatch();
  // Get the 'email' and 'password' fields from the 'signInCredentials' state using the 'useAppSelector' hook
  const { email, password } = useAppSelector(
    (state) => state.settings.signInCredentials
  );

  // Get the 'isLoading' state from the Redux store using the 'useAppSelector' hook
  const isLoading = useAppSelector((state) => state.settings.isLoading);

  // Function to reset the 'email' and 'password' fields in the state
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

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Dispatch the 'signIn' action with 'email' and 'password' as payload
    dispatch(
      signIn({
        email,
        password,
      })
    );
    // Reset the 'email' and 'password' fields after form submission
    resetField();
  };
  // Function to handle new input value in field for 'email' and 'password'
  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    dispatch(
      changeSignInCredentialsField({
        property: name,
        value,
      })
    );
  };
  // Function to toggle the modal
  const handleModaltoggle = () => {
    dispatch(toggleIsOpen());
    resetField();
  };
  // Function to handle clicking on the 'Sign-up' button
  const HandleClickButton = () => {
    dispatch(toggleSignUpOpen());
    resetField();
  };
  // Render the sign-in form component
  return (
    <div className="relative flex flex-col gap-4 w-80 text-titleff font-medium sm:bg-thirdff sm:bg-opacity-95 sm:rounded-xl sm:shadow-xl items-center p-6">
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
        <div className="flex justify-center ">
          {/* Sign-In button */}
          <button
            type="submit"
            className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2 mt-10 bg-white border-titleff hover:border-fourthff hover:text-fourthff rounded-lg border-2 shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
            disabled={isLoading}
          >
            Sign-In
          </button>
        </div>
      </form>
      {/* Close button (X icon) for the sign-in form */}
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
// Export the 'signin' component as the default export
export default signin;
