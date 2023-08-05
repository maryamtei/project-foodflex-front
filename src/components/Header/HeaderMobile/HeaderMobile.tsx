import { useRef, useState } from 'react';
import {
  Twitter,
  Instagram,
  Facebook,
  GitHub,
  Youtube,
  Search,
  Calendar,
  User,
} from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleIsOpen, toggleSignUpOpen } from '../../../store/reducers/user';
import {
  toggleIsOpenProfil,
  changeFavoriIsOpen,
} from '../../../store/reducers/favoris';
import MenuIcon from './burgerMenu';

function HeaderMobile() {
  // Ref for the menu button
  const btnMenuRef = useRef<HTMLButtonElement>(null);

  // State for menu activation
  const [menuActive, setmenuActive] = useState(false);

  // Fetch data from Redux store
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const modalIsOpenFavoriProfil = useAppSelector(
    (state) => state.favoris.modalIsOpen
  );
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const dispatch = useAppDispatch();

  // Function to handle modal for Sign-Up and Sign-In
  const toogleModalSignUpSignIn = () => {
    if (!isLogged) {
      dispatch(toggleIsOpen());
    }
  };

  // Function to handle menu button click
  const menuOnClick = () => {
    setmenuActive(!menuActive);
  };

  // Function to toggle Sign-Up modal
  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
  };

  // Function to open the Profile modal
  const openProfilModal = () => {
    dispatch(changeFavoriIsOpen(true));
    dispatch(toggleIsOpenProfil());
  };

  // Function to close the Profile modal
  const closeProfilModal = () => {
    dispatch(toggleIsOpenProfil());
  };

  return (
    <header className="relative mt-20">
      {/* Header container for mobile devices */}
      <div
        className={`bg-fourthff w-full border-none fixed top-0 px-7 py-4 z-20 ease-in duration-500 overflow-hidden ${
          menuActive ? 'h-screen' : 'h-16'
        }`}
      >
        <div className="sm:hidden text-bgff flex items-center justify-between">
          {/* Logo */}
          <div className="h-9 w-9" />
          <h1 className="text-3xl font-bold">
            <NavLink
              to="/"
              relative="path"
              className="text-white hover:text-[#AF4A40]"
              onClick={() => {
                if (modalIsOpen) {
                  toogleModalSignUpSignIn();
                }
                if (modalIsOpenFavoriProfil) {
                  closeProfilModal();
                }
                if (menuActive) {
                  menuOnClick();
                }
              }}
            >
              FoodFlex
            </NavLink>
          </h1>
          {/* Menu button */}
          <button
            ref={btnMenuRef}
            type="button"
            onClick={menuOnClick}
            className="h-9 w-9 cursor"
          >
            <MenuIcon menuActive={menuActive} />
          </button>
        </div>
        {/* Menu items */}
        <div className="text-bgff flex items-center flex-col h-full p-5 gap-7 z-10 ease-in duration-500 text-center ">
          <p className="text-md text-center font-medium text-white">
            Culinary creativity unleashed with FoodFlex!
          </p>
          {/* Quick Links */}
          <div className="flex-col mt-4">
            <h2 className="text-2xl font-bold uppercase underline text-white">
              Quick Links :
            </h2>
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink
                  to="/"
                  relative="path"
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  onClick={() => {
                    if (modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    if (modalIsOpenFavoriProfil) {
                      closeProfilModal();
                    }
                    menuOnClick();
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipes"
                  className="no-underline font-semibold uppercase text-white text-lg hover:text-titleff "
                  onClick={() => {
                    if (modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    if (modalIsOpenFavoriProfil) {
                      closeProfilModal();
                    }
                    menuOnClick();
                  }}
                >
                  Recipes
                </NavLink>
              </li>
              {/* Display the "Planning" option only if the user is logged in */}
              <li className={!isLogged ? 'hidden' : ''}>
                <NavLink
                  to="/schedule"
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  onClick={() => {
                    if (modalIsOpenFavoriProfil) {
                      closeProfilModal();
                    }
                    menuOnClick();
                  }}
                >
                  Planning
                </NavLink>
              </li>
              {/* Display the "Profil" option only if the user is logged in */}
              <li className={!isLogged ? 'hidden' : ''}>
                <button
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  type="button"
                  onClick={() => {
                    menuOnClick();
                    openProfilModal();
                  }}
                >
                  Profil
                </button>
              </li>
              {/* Display the "Sign-In" option only if the user is not logged in */}
              <li className={isLogged ? 'hidden' : ''}>
                <button
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff "
                  type="button"
                  onClick={() => {
                    if (signUpOpen) {
                      toggleSignUp();
                    }
                    if (!modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                >
                  Sign-In
                </button>
              </li>
              {/* Display the "Sign-Up" option only if the user is not logged in */}
              <li className={isLogged ? 'hidden' : ''}>
                <button
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  type="button"
                  onClick={() => {
                    if (!signUpOpen) {
                      toggleSignUp();
                    }
                    if (!modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                >
                  Sign-Up
                </button>
              </li>
            </ul>
          </div>
          {/* Team section */}
          <div className="flex-col mt-4">
            <h2 className="text-2xl font-bold uppercase underline text-white">
              Team :
            </h2>
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink
                  to="/about"
                  relative="path"
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  onClick={() => {
                    if (modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    if (modalIsOpenFavoriProfil) {
                      closeProfilModal();
                    }
                    menuOnClick();
                  }}
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  relative="path"
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  onClick={() => {
                    if (modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    if (modalIsOpenFavoriProfil) {
                      closeProfilModal();
                    }
                    menuOnClick();
                  }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Legal section */}
          <div className="flex-col mt-4">
            <h2 className="text-2xl font-bold uppercase underline text-white">
              Legal :
            </h2>
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink
                  to="/terms"
                  relative="path"
                  className="no-underline font-semibold uppercase text-lg text-white hover:text-titleff"
                  onClick={() => {
                    if (modalIsOpen) {
                      toogleModalSignUpSignIn();
                    }
                    if (modalIsOpenFavoriProfil) {
                      closeProfilModal();
                    }
                    menuOnClick();
                  }}
                >
                  Terms & Conditions of Use
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div className="flex flex-col items-left gap-3">
            <h2 className="text-2xl font-bold uppercase underline text-white">
              Follow Us On:
            </h2>
            <div className="flex gap-3">
              <Facebook className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
              <Twitter className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
              <Youtube className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
              <GitHub className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
              <Instagram className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
            </div>
          </div>
          <p className="text-md italic mb-2 text-white">
            Crafted with a dash of gluttony by FoodFlex - @2023
          </p>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-fourthff w-full border-none fixed bottom-0 px-8 py-4 z-10 h-16 overflow-hidden flex justify-between text-bgff">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'active text-titleff font-bold ' : 'text-white'
          }
          to="/recipes"
          relative="path"
          onClick={() => {
            if (modalIsOpen) {
              toogleModalSignUpSignIn();
            }
            if (modalIsOpenFavoriProfil) {
              closeProfilModal();
            }
          }}
        >
          <Search className="h-9 w-9" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'active text-titleff font-bold ' : 'text-white'
          }
          to="/schedule"
          relative="path"
          onClick={() => {
            if (!isLogged && !modalIsOpen) {
              toogleModalSignUpSignIn();
            }
            if (modalIsOpenFavoriProfil) {
              closeProfilModal();
            }
          }}
        >
          <Calendar className="h-9 w-9" />
        </NavLink>
        <NavLink
          className={
            modalIsOpenFavoriProfil
              ? 'active text-titleff font-bold '
              : 'text-white'
          }
          to="/"
          onClick={() => {
            if (!isLogged && !modalIsOpen) {
              toogleModalSignUpSignIn();
            }
            if (isLogged && !modalIsOpenFavoriProfil) {
              openProfilModal();
            }
          }}
        >
          <User className="h-9 w-9" />{' '}
        </NavLink>
      </div>
    </header>
  );
}

export default HeaderMobile;
