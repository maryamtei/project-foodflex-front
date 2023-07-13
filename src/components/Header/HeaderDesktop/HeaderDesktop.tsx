import { Twitter, Instagram, Facebook, GitHub, Youtube } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleIsOpen } from '../../../store/reducers/settings';

function HeaderDesktop() {
  const isLoged = useAppSelector((state) => state.settings.isLoged);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const dispatch = useAppDispatch();

  const toogleSignUpSignIn = () => {
    if (!isLoged) {
      dispatch(toggleIsOpen());
    }
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
              toogleSignUpSignIn();
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
              toogleSignUpSignIn();
            }
          }}
        >
          Recipes
        </NavLink>
        <NavLink
          to={`${isLoged ? '/planning' : ''}`}
          relative="path"
          className={!isLoged ? 'hidden' : ''}
        >
          Planning
        </NavLink>
        <NavLink
          to={`${isLoged ? '/profil' : ''}`}
          relative="path"
          className={!isLoged ? 'hidden' : ''}
        >
          Profil
        </NavLink>
        <NavLink
          to=""
          relative="path"
          onClick={() => {
            if (!modalIsOpen) {
              toogleSignUpSignIn();
            }
          }}
          className={isLoged ? 'hidden' : ''}
        >
          Sign-In
        </NavLink>
        <NavLink
          onClick={() => {
            if (!modalIsOpen) {
              toogleSignUpSignIn();
            }
          }}
          to=""
          relative="path"
          className={isLoged ? 'hidden' : ''}
        >
          Sign-Up
        </NavLink>
      </div>
    </header>
  );
}

export default HeaderDesktop;
