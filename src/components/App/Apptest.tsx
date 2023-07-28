import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ModalSign from '../settings/Modal';
import ModalFavoriProfil from '../Profil/Modal';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import Message from '../Message/message';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeInnerWidth,
  changeMobileView,
} from '../../store/reducers/window';
import { getUserData } from '../../store/reducers/settings';
import ScheduleModal from '../ScheduleModal/ScheduleModal';

function Apptest() {
  const dispatch = useAppDispatch();
  const modalIsOpenSign = useAppSelector((state) => state.settings.modalIsOpen);
  const modalIsOpenFavoriProfil = useAppSelector(
    (state) => state.favoris.modalIsOpen
  );
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const isLoading = useAppSelector((state) => state.settings.isLoading);
  console.log(isLoading);
  const mobileView = useAppSelector((state) => state.window.mobileView);
  // Triggered when the window is resized
  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(changeInnerWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleWindowResize);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const innerWidth = useAppSelector((state) => state.window.innerWidth);
  const status = useAppSelector((state) => state.settings.status);
  // Check if the inner width of the window is less than 640 pixels
  useEffect(() => {
    if (innerWidth < 640) {
      dispatch(changeMobileView(true));
    } else {
      dispatch(changeMobileView(false));
    }
  }, [innerWidth, dispatch]);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  return (
    <div className="relative">
      <Header />
      {status > 0 && <Message />}
      {isLoading && <Loader />}
      {/* Render the Modal component if modalIsOpen is true */}
      {modalIsOpenSign && <ModalSign />}
      {(modalIsOpenFavoriProfil || !mobileView) && isLogged && (
        <ModalFavoriProfil />
      )}
      <ScheduleModal />
      {/* Render the Outlet component if modalIsOpen is false and Mobile is true or Mobile is false */}
      {((!modalIsOpenSign && !modalIsOpenFavoriProfil && mobileView) ||
        !mobileView) && <Outlet />}

      {/* fake div to margin bottom in mobile because footer component is sticky  */}
      <div className="h-16 " />

      <Footer />
    </div>
  );
}

export default Apptest;
