import { scroller } from 'react-scroll';
import { useEffect } from 'react';
import Signup from './sign-up/Signup';
import Signin from './sign-in/Signin';
import { useAppSelector } from '../../hooks/redux';

function Modal() {
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const modalCondition = () => {
    if (!signUpOpen) {
      return <Signin />;
    }
    return <Signup />;
  };

  useEffect(() => {
    scroller.scrollTo('modalSignUpSignIn', {
      duration: 500,
      smooth: true,
    });
  }, [modalIsOpen]);

  return (
    <div
      id="modalSignUpSignIn"
      className="grid justify-items-center sm:absolute sm:top-2/4 sm:left-2/4 sm:z-50 sm:translate-y-[-50%] sm:translate-x-[-50%]"
    >
      {modalCondition()}
    </div>
  );
}

export default Modal;
