import { useEffect } from 'react';
import Modal from '../settings/Modal';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recipes from '../Recipes/Recipes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeInnerWidth } from '../../store/reducers/window';

function Apptest() {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  // const HandleClickButton = () => {
  //  dispatch(toggleIsOpen());
  // };

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(changeInnerWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <div className="">
      <Header />
      <Modal />

      <Footer />
    </div>
  );
}

export default Apptest;
