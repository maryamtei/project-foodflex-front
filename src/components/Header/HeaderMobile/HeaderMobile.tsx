import { useRef, useState } from 'react';
import {
  Menu,
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

function HeaderMobile() {
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const [menuActive, setmenuActive] = useState(false);
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const modalIsOpenFavoriProfil = useAppSelector(
    (state) => state.favoris.modalIsOpen
  );
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);
  const dispatch = useAppDispatch();

  const toogleModalSignUpSignIn = () => {
    if (!isLogged) {
      dispatch(toggleIsOpen());
    }
  };

  const menuOnClick = () => {
    setmenuActive(!menuActive);
  };
  const toggleSignUp = () => {
    dispatch(toggleSignUpOpen());
  };
  const openProfilModal = () => {
    dispatch(changeFavoriIsOpen(true));
    dispatch(toggleIsOpenProfil());
  };
  const closeProfilModal = () => {
    dispatch(toggleIsOpenProfil());
  };
  return (
    <header className="relative mt-20 ">
      <div
        className={`bg-fourthff w-full border-none fixed top-0 px-7 py-4 z-20 ease-in duration-500 overflow-hidden ${
          menuActive ? ' h-screen ' : 'h-16'
        }`}
      >
        <div className="sm:hidden text-bgff flex items-center justify-between ">
          <div className="h-9 w-9" />
          <h1 className="text-3xl font-bold ">
            <NavLink
              to="/"
              relative="path"
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
          <button
            ref={btnMenuRef}
            type="button"
            onClick={menuOnClick}
            className="h-9 w-9 cursor"
          >
            <Menu className="h-9 w-9" />
          </button>
        </div>
        <div className="text-bgff flex items-center h-full flex-col p-5 text-center gap-3 z-10 ease-in duration-500 justify-between">
          <p className="text-md font-medium">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Blanditiis, fuga.
          </p>

          <div>
            <h2 className="text-md font-bold ">Quick Links :</h2>
            <ul className="flex flex-col gap-1 underline">
              <li>
                <NavLink
                  to="/"
                  relative="path"
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
                  relative="path"
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
              <li className={`${!isLogged ? 'hidden' : ''} `}>
                <NavLink
                  to="/schedule"
                  relative="path"
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
              <li className={`${!isLogged ? 'hidden' : ''} `}>
                <button
                  className="underline"
                  type="button"
                  onClick={() => {
                    menuOnClick();
                    openProfilModal();
                  }}
                >
                  Profil
                </button>
              </li>
              <li className={`${isLogged ? 'hidden' : ''} `}>
                <button
                  className="underline"
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
              <li className={`${isLogged ? 'hidden' : ''} `}>
                <button
                  className="underline"
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
          <div>
            <h2 className="text-md font-bold ">Team :</h2>
            <ul className="flex flex-col gap-1 underline">
              <li>
                <NavLink
                  to="/about"
                  relative="path"
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
          <div>
            <h2 className="text-md font-bold ">Legal :</h2>
            <ul className="flex flex-col gap-1 underline">
              <li>
                <NavLink
                  to="/terms"
                  relative="path"
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

          <h2 className="text-md font-bold ">Folow Us On :</h2>
          <div className="flex gap-3">
            <Facebook className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
            <Twitter className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
            <Youtube className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
            <GitHub className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
            <Instagram className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
          </div>
          <p className="text-sm italic ">@2023 Foodflex</p>
        </div>
      </div>
      <div className="bg-fourthff w-full border-none fixed bottom-0 px-8 py-4 z-10 h-16 overflow-hidden flex justify-between text-bgff">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'active font-bold text-bgff ' : 'text-thirdff'
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
            isActive ? 'active font-bold text-bgff ' : 'text-thirdff'
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
        <button
          className={
            modalIsOpenFavoriProfil
              ? 'text-bgff font-bold active'
              : 'text-thirdff'
          }
          type="button"
          onClick={() => {
            if (!isLogged && !modalIsOpen) {
              toogleModalSignUpSignIn();
            }
            if (isLogged && !modalIsOpenFavoriProfil) {
              openProfilModal();
            }
          }}
        >
          <User className="h-9 w-9 " />
        </button>
      </div>
    </header>
  );
}

export default HeaderMobile;
