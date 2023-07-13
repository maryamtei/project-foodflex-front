import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  toggleIsOpen,
  toggleSignUpOpen,
} from '../../../store/reducers/settings';

function HeaderDesktop() {
  const isLoged = useAppSelector((state) => state.settings.isLoged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const dispatch = useAppDispatch();

  const toogleModalSignUpSignIn = () => {
    if (!isLoged) {
      dispatch(toggleIsOpen());
    }
  };
  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
  };
  return (
    <header className="relative bg-fourthff w-full  border-none fixed top-0 px-7 h-16 text-bgff flex items-center justify-between tracking-wide">
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
          to="/planning"
          relative="path"
          className={!isLoged ? 'hidden' : ''}
        >
          Planning
        </NavLink>
        <NavLink
          to="/profil"
          relative="path"
          className={!isLoged ? 'hidden' : ''}
        >
          Profil
        </NavLink>
        <button
          className={isLoged ? 'hidden' : ''}
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
          className={isLoged ? 'hidden' : ''}
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
