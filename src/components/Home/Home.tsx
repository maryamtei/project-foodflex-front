import { useEffect } from 'react';
import HeadHome from './HeadHome';
import MainHome from './MainHome';
import FootHome from './FootHome';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateHome } from '../../store/reducers/home';

function Home() {
  const dispatch = useAppDispatch();
  const stateHome = useAppSelector((state) => state.home.stateHome);

  // update the stateHome state to change header background to transparent
  useEffect(() => {
    if (stateHome === false) {
      dispatch(changeStateHome(true));
    }

    return () => {
      dispatch(changeStateHome(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ne pas supprimer sinon le code fonctionne plus

  return (
    <div className="bg-bgff relative mb-20">
      <HeadHome />
      <MainHome />
      <FootHome />
    </div>
  );
}

export default Home;
