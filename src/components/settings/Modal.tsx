import Signup from './sign-up/Signup';
import Signin from './sign-in/Signin';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function modal() {
  return <Signup />;
}

export default modal;
