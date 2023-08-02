import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleIsOpen, toggleSignUpOpen } from '../../../store/reducers/user';
import {
  toggleIsOpenProfil,
  changeFavoriIsOpen,
} from '../../../store/reducers/favoris';

function HeaderDesktop() {
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const modalIsOpenFavoriProfil = useAppSelector(
    (state) => state.favoris.modalIsOpen
  );
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
  const openProfilModal = () => {
    dispatch(changeFavoriIsOpen(true));
    dispatch(toggleIsOpenProfil());
  };
  const closeProfilModal = () => {
    dispatch(changeFavoriIsOpen(false));
  };
  return (
    <header
      className={`relative bg-fourthff w-full  border-none top-0 px-7 h-16 text-bgff flex items-center justify-between tracking-wide   ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } ${stateHome ? 'sm:bg-transparent sm:z-50' : ''}`}
    >
      <div className="flex gap-3">
        <Facebook className="rounded-full border-3 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
        <Twitter className="rounded-full border-23border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
        <Youtube className="rounded-full border-3 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
        <GitHub className="rounded-full border-3 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
        <Instagram className="rounded-full border-3 border-solid p-1 w-8 h-8 duration-300 ease-linear hover:scale-125 text-white hover:text-[#AF4A40] border-white hover:border-[#AF4A40] focus:text-secondaryff focus:border-secondaryff" />
      </div>
      <h1 className="text-3xl font-bold ">
        <NavLink
          to="/"
          relative="path"
          className="no-underline font-semibold uppercase text-white  transition-all duration-300 hover:text-titleff "
          onClick={() => {
            if (modalIsOpen) {
              toogleModalSignUpSignIn();
            }
            if (modalIsOpenFavoriProfil) {
              closeProfilModal();
            }
          }}
        >
          FoodFlex
        </NavLink>
      </h1>
      <div className="flex justify-between text-lg gap-5 ">
        <NavLink
          to="/recipes"
          relative="path"
          className="uppercase font-bold text-white transition-all duration-300 transition-all duration-300 hover:text-titleff"
          onClick={() => {
            if (modalIsOpen) {
              toogleModalSignUpSignIn();
            }
            if (modalIsOpenFavoriProfil) {
              closeProfilModal();
            }
          }}
        >
          Recipes
        </NavLink>
        <NavLink
          to="/schedule"
          relative="path"
          className={`uppercase font-bold text-white transition-all duration-300  hover:text-titleff ${
            isLogged ? '' : 'hidden'
          } `}
          onClick={() => {
            if (modalIsOpenFavoriProfil) {
              closeProfilModal();
            }
          }}
        >
          Planning
        </NavLink>
        <button
          className={`uppercase font-bold text-white transition-all duration-300 hover:text-titleff ${
            isLogged ? '' : 'hidden'
          } `}
          type="button"
          onClick={openProfilModal}
        >
          Profil
        </button>
        <button
          className={`uppercase font-bold text-white transition-all duration-300  hover:text-titleff ${
            isLogged ? 'hidden' : ''
          }`}
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
          className={`uppercase font-bold text-white transition-all duration-300  hover:text-titleff ${
            isLogged ? 'hidden' : ''
          }`}
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
