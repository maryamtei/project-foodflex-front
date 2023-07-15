import { X } from 'react-feather';
import Profil from './Profil';
import Favoris from './Favoris';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleIsOpenProfil } from '../../store/reducers/favoris';

function Modal() {
  const favoriIsOpen = useAppSelector((state) => state.favoris.favoriIsOpen);
  const dispatch = useAppDispatch();
  const modalCondition = () => {
    if (!favoriIsOpen) {
      return <Profil />;
    }
    return <Favoris />;
  };
  const handleModaltoggle = () => {
    dispatch(toggleIsOpenProfil());
  };
  return (
    <div className="flex flex-col items-center p-6 h-full w-80 sm:fixed sm: bg-fourthff  sm:top-0 sm:right-0 sm:z-50 ">
      <button
        type="button"
        className="absolute top-1 right-2  w-10 h-10 mt-2 hidden sm:block"
        onClick={handleModaltoggle}
      >
        <X className="w-12 h-12 text-bgff" />
      </button>
      <h1 className="text-3xl font-bold text-bgff">Profil</h1>
      {modalCondition()}
    </div>
  );
}

export default Modal;
