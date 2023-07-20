import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';

import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleIsOpen, toggleSignUpOpen } from '../../store/reducers/settings';
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Blanditiis, fuga.
          </p>
          <div className="flex flex-col gap-3">
            <h2 className="text-md font-bold ">Folow Us On :</h2>
            <div className="flex gap-3 justify-center">
              <Facebook className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <Twitter className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <Youtube className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <GitHub className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
              <Instagram className="rounded-full border-2 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125" />
            </div>
            <p className="text-sm italic ">@2023 Foodflex</p>
          </div>
        </div>

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
              <button type="button" onClick={openProfilModal}>
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
                to="/"
                relative="path"
                onClick={() => {
                  scrollToTop();
                }}
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                relative="path"
                onClick={() => {
                  scrollToTop();
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
