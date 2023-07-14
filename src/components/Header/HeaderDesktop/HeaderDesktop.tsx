import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../../store/reducers/settings';

function HeaderDesktop() {
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const stateHome = useAppSelector((state) => state.home.stateHome);
  const dispatch = useAppDispatch();

  const toogleModalSignUpSignIn = () => {
    if (!isLogged) {
      dispatch(toggleIsOpen());
    }
  };
  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
  };
  return (
    <header
      className={`relative bg-fourthff w-full  border-none top-0 px-7 h-16 text-bgff flex items-center justify-between tracking-wide   ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } ${stateHome ? 'sm:bg-transparent sm:z-50' : ''}`}
    >
      <div className="flex gap-3">
        <Facebook className="rounded-full border border-solid p-0.5 w-6 h-6 duration-300 ease-linear hover:scale-125" />
        <Twitter className="rounded-full border border-solid p-0.5 w-6 h-6 duration-300 ease-linear hover:scale-125" />
        <Youtube className="rounded-full border border-solid p-0.5 w-6 h-6 duration-300 ease-linear hover:scale-125" />
        <GitHub className="rounded-full border border-solid p-0.5 w-6 h-6 duration-300 ease-linear hover:scale-125" />
        <Instagram className="rounded-full border border-solid p-0.5 w-6 h-6 duration-300 ease-linear hover:scale-125" />
      </div>
      <h1 className="text-3xl font-bold ">
        <NavLink
          to="/"
          relative="path"
          onClick={() => {
            if (modalIsOpen) {
              toogleModalSignUpSignIn();
            }
          }}
        >
          FoodFlex
        </NavLink>
      </h1>
      <div className="flex justify-between text-md gap-5 ">
        <NavLink
          to="/recipes"
          relative="path"
          className={({ isActive }) =>
            isActive ? 'active font-bold text-thirdff' : ''
          }
          onClick={() => {
            if (modalIsOpen) {
              toogleModalSignUpSignIn();
            }
          }}
        >
          Recipes
        </NavLink>
        <NavLink
          to="/schedule"
          relative="path"
          className={!isLogged ? 'hidden' : ''}
        >
          Planning
        </NavLink>
        <NavLink
          to="/profil"
          relative="path"
          className={!isLogged ? 'hidden' : ''}
        >
          Profil
        </NavLink>
        <button
          className={isLogged ? 'hidden' : ''}
          type="button"
          onClick={() => {
            if (signUpOpen) {
              toggleSignUp();
            }
            if (!modalIsOpen) {
              toogleModalSignUpSignIn();
            }
          }}
        >
          Sign-In
        </button>
        <button
          className={isLogged ? 'hidden' : ''}
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
          Sign-Up
        </button>
      </div>
    </header>
  );
}

export default HeaderDesktop;
