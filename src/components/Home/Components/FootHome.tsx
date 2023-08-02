import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleIsOpen, toggleSignUpOpen } from '../../../store/reducers/user';
import HomeTitle from './HomeTitles';

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
      <HomeTitle content="GET STARTED ?" />
      <div className="mt-4 sm:mt-8 flex justify-center">
        <button
          className={
            isLogged
              ? 'hidden'
              : 'transition duration-500 ease-in-out rounded-md border border-transparent hover:border-fourthff bg-fourthff py-3 px-6 text-2xl font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2'
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
              ? 'transition duration-500 ease-in-out rounded-md border border-transparent hover:border-fourthff bg-fourthff py-3 px-6 text-2xl font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2'
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
