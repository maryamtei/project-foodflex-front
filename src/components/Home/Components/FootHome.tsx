import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../../store/reducers/settings';

function FootHome() {
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const dispatch = useAppDispatch();

  const toogleModalSignUpSignIn = () => {
    if (!isLogged) {
      dispatch(toggleIsOpen());
    }
  };
  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <h2 className="text-2xl sm:text-4xl font-bold mt-16 sm:mt-36 text-center sm:text-center md:text-center text-thirdff">
        GET STARTED ?
      </h2>
      <div className="mt-4 sm:mt-8 flex justify-center">
        <button
          className={
            isLogged
              ? 'hidden'
              : 'px-8 py-4 bg-thirdff text-bgff rounded-lg text-2xl font-bold'
          }
          type="button"
          onClick={() => {
            if (!signUpOpen) {
              toggleSignUp();
            }
            if (!modalIsOpen) {
              toogleModalSignUpSignIn();
            }
          }}
        >
          Sign-Up !
        </button>
        <NavLink
          className={
            isLogged
              ? 'px-8 py-4 bg-thirdff text-bgff rounded-lg text-2xl font-bold'
              : 'hidden'
          }
          to="/schedule"
          relative="path"
          onClick={scrollToTop}
        >
          My planning !
        </NavLink>
      </div>
    </div>
  );
}

export default FootHome;
