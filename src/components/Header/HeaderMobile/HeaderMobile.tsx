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
import { toggleIsOpen } from '../../../store/reducers/settings';

function HeaderMobile() {
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const [menuActive, setmenuActive] = useState(false);
  const isLoged = useAppSelector((state) => state.settings.isLoged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const dispatch = useAppDispatch();

  const toogleSignUpSignIn = () => {
    if (!isLoged) {
      dispatch(toggleIsOpen());
    }
  };

  const menuOnClick = () => {
    setmenuActive(!menuActive);
  };

  return (
    <header className="relative mt-20">
      <div
        className={`bg-fourthff w-full border-none fixed top-0 px-7 py-4 z-20 ease-in duration-500 overflow-hidden ${
          menuActive ? ' h-screen ' : 'h-16'
        }`}
      >
        <div className="sm:hidden text-bgff flex items-center justify-between ">
          <div className="h-9 w-9" />
          <h1 className="text-3xl font-bold ">FoodFlex</h1>
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
                      toogleSignUpSignIn();
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
                      toogleSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${isLoged ? '/Schedule' : ''}`}
                  relative="path"
                  onClick={() => {
                    if (!isLoged && !modalIsOpen) {
                      toogleSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                >
                  Planning
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${isLoged ? '/profil' : ''}`}
                  relative="path"
                  onClick={() => {
                    if (!isLoged && !modalIsOpen) {
                      toogleSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                >
                  Profil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  relative="path"
                  onClick={() => {
                    if (!isLoged && !modalIsOpen) {
                      toogleSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                >
                  Sign-In
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    if (!isLoged && !modalIsOpen) {
                      toogleSignUpSignIn();
                    }
                    menuOnClick();
                  }}
                  to=""
                  relative="path"
                >
                  Sign-Up
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-md font-bold ">Team :</h2>
            <ul className="flex flex-col gap-1 underline">
              <li>
                <NavLink to="/" relative="path">
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink to="/" relative="path">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-md font-bold ">Legal :</h2>
            <ul className="flex flex-col gap-1 underline">
              <li>
                <NavLink to="/" relative="path">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/" relative="path">
                  Terms & Conditions
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
          className="active:text-thirdff"
          to="/recipes"
          relative="path"
          onClick={() => {
            if (modalIsOpen) {
              toogleSignUpSignIn();
            }
          }}
        >
          <Search className="h-9 w-9  hover:text-thirdff duration-300 ease-linear" />
        </NavLink>
        <NavLink
          className="active:text-thirdff"
          to="/Schedule"
          relative="path"
          onClick={() => {
            if (!isLoged && !modalIsOpen) {
              toogleSignUpSignIn();
            }
          }}
        >
          <Calendar className="h-9 w-9 hover:text-thirdff duration-300 ease-linear" />
        </NavLink>
        <NavLink
          className="active:text-thirdff"
          to="/profil"
          relative="path"
          onClick={() => {
            if (!isLoged && !modalIsOpen) {
              toogleSignUpSignIn();
            }
          }}
        >
          <User className="h-9 w-9  hover:text-thirdff duration-300 ease-linear" />
        </NavLink>
      </div>
    </header>
  );
}

export default HeaderMobile;
