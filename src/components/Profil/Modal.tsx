import { X } from 'react-feather';
import { useEffect } from 'react';
import Profil from './Profil';
import Favoris from './Favoris';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  toggleIsOpenProfil,
  changeStateModalAnimation,
} from '../../store/reducers/favoris';
import { getUserData } from '../../store/reducers/settings';

function Modal() {
  const favoriIsOpen = useAppSelector((state) => state.favoris.favoriIsOpen);
  const modalIsOpen = useAppSelector((state) => state.favoris.modalIsOpen);
  const modalAnimationState = useAppSelector(
    (state) => state.favoris.modalAnimationState
  );
  const mobileView = useAppSelector((state) => state.window.mobileView);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const modalCondition = () => {
    if (!favoriIsOpen) {
      return <Profil />;
    }
    return <Favoris />;
  };

  useEffect(() => {
    if (modalIsOpen) {
      dispatch(changeStateModalAnimation(2));
    }
  }, [modalIsOpen, dispatch]);

  const handleModaltoggle = () => {
    dispatch(changeStateModalAnimation(1));
    dispatch(toggleIsOpenProfil());
  };
  return (
    <div
      className={`flex flex-col items-center h-screen p-4 sm:p-6 w-full  sm:w-80 sm:fixed bg-bgff sm:bg-fourthff sm:top-0 sm:z-50 overflow-auto ${
        modalAnimationState === 2 && !mobileView
          ? 'right-0 animate-modalProfilOpen'
          : ''
      }${
        modalAnimationState === 1 && !mobileView
          ? 'right-[-20rem] animate-modalProfilClose'
          : ''
      }${modalAnimationState === 0 && !mobileView ? 'right-[-20rem]' : ''}`}
    >
      <button
        type="button"
        className="absolute top-1 right-2  w-10 h-10 mt-2 hidden sm:block"
        onClick={handleModaltoggle}
      >
        <X className="w-12 h-12 text-bgff" />
      </button>
      <h1 className="text-3xl hidden sm:block font-bold text-fourthff sm:text-bgff">
        Profil
      </h1>
      {modalCondition()}
    </div>
  );
}

export default Modal;
