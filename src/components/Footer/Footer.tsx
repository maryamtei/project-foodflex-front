import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';

import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleIsOpen, toggleSignUpOpen } from '../../store/reducers/user';
import {
  toggleIsOpenProfil,
  changeFavoriIsOpen,
} from '../../store/reducers/favoris';

function Footer() {
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const modalIsOpenFavoriProfil = useAppSelector(
    (state) => state.favoris.modalIsOpen
  );
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
  const openProfilModal = () => {
    dispatch(changeFavoriIsOpen(true));
    dispatch(toggleIsOpenProfil());
  };
  const closeProfilModal = () => {
    dispatch(changeFavoriIsOpen(false));
  };
  return (
    <footer
      className={`hidden sm:block bg-fourthff w-full px-7 py-6 z-10 h-60   ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      }`}
    >
      <div className="text-bgff flex items-center h-full p-5 text-center gap-3 justify-between flex-row ">
        <div className="flex flex-col gap-3 ">
          <p className="text-md font-medium">
            Culinary creativity unleashed with FoodFlex!
          </p>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold uppercase underline underline-offset-4 text-white">
              Folow Us On :
            </h2>
            <div className="flex gap-3 justify-center">
              <NavLink to="https://www.facebook.com/profile.php?id=100095063211456">
                <Facebook className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 " />
              </NavLink>

              <Twitter className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-titleff border-white hover:border-titleff  focus:border-secondaryff" />
              <Youtube className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-titleff border-white hover:border-titleff  focus:border-secondaryff" />
              <GitHub className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-titleff border-white hover:border-titleff  focus:border-secondaryff" />
              <Instagram className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-titleff border-white hover:border-titleff  focus:border-secondaryff" />
            </div>
            <p className="text-sm italic ">
              Crafted with a dash of gluttony by FoodFlex - @2023
            </p>
          </div>
        </div>

        <div className="flex-col mb-5">
          <h2 className="text-xl font-bold uppercase underline underline-offset-4 text-white">
            Quick Links :
          </h2>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                to="/"
                relative="path"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={() => {
                  if (modalIsOpen) {
                    toogleModalSignUpSignIn();
                  }
                  if (modalIsOpenFavoriProfil) {
                    closeProfilModal();
                  }
                  scrollToTop();
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recipes"
                relative="path"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={() => {
                  if (modalIsOpen) {
                    toogleModalSignUpSignIn();
                  }
                  if (modalIsOpenFavoriProfil) {
                    closeProfilModal();
                  }
                  scrollToTop();
                }}
              >
                Recipes
              </NavLink>
            </li>
            <li className={`${!isLogged ? 'hidden' : ''} `}>
              <NavLink
                to="/schedule"
                relative="path"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={() => {
                  if (modalIsOpenFavoriProfil) {
                    closeProfilModal();
                  }
                  scrollToTop();
                }}
              >
                Planning
              </NavLink>
            </li>
            <li className={`${!isLogged ? 'hidden' : ''} `}>
              <button
                type="button"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={openProfilModal}
              >
                Profil
              </button>
            </li>
            <li className={`${isLogged ? 'hidden' : ''} `}>
              <button
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
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
            </li>
            <li className={`${isLogged ? 'hidden' : ''} `}>
              <button
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
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
            </li>
          </ul>
        </div>
        <div className="flex-col mb-5">
          <h2 className="text-xl font-bold uppercase underline underline-offset-4 text-white">
            Team :
          </h2>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                to="/about"
                relative="path"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={() => {
                  scrollToTop();
                }}
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                relative="path"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={() => {
                  scrollToTop();
                }}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-col mb-5">
          <h2 className="text-xl font-bold uppercase underline underline-offset-4 text-white">
            Legal :
          </h2>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                to="/terms"
                relative="path"
                className="no-underline font-semibold uppercase text-white hover:text-titleff "
                onClick={() => {
                  scrollToTop();
                }}
              >
                Terms & Conditions of Use
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
