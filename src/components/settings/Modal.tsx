import Signup from './sign-up/Signup';
import Signin from './sign-in/Signin';
import { useAppSelector } from '../../hooks/redux';

function Modal() {
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const modalCondition = () => {
    if (signUpOpen) {
      return <Signup />;
    }
    return <Signin />;
  };

  return (
    <div className="grid justify-items-center py-20 ">{modalCondition()}</div>
  );
}

export default Modal;
