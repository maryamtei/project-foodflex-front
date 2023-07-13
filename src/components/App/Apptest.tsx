import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../settings/Modal';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeInnerWidth } from '../../store/reducers/window';

function Apptest() {
  const dispatch = useAppDispatch();
  const [Mobile, setMobile] = useState(false);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(changeInnerWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const innerWidth = useAppSelector((state) => state.window.innerWidth);

  useEffect(() => {
    if (innerWidth < 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [innerWidth, setMobile]);

  return (
    <div>
      <Header />
      {modalIsOpen && <Modal />}
      {((!modalIsOpen && Mobile) || !Mobile) && <Outlet />}
      <Footer />
    </div>
  );
}

export default Apptest;
