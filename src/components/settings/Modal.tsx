/* eslint-disable react-hooks/rules-of-hooks */
import Signup from './sign-up/Signup';
import Signin from './sign-in/Signin';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function modal() {
  const signUpOpen = useAppSelector(
    (state) => state.settingsReducer.signUpOpen
  );
  const modalCondition = () => {
    if (signUpOpen) {
      return <Signup />;
    }
    return <Signin />;
  };

  return modalCondition();
}

export default modal;
