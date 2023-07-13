import { useEffect } from 'react';
import HeadHome from './HeadHome';
import MainHome from './MainHome';
import FootHome from './FootHome';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateHome } from '../../store/reducers/home';

function Home() {
  const dispatch = useAppDispatch();
  const stateHome = useAppSelector((state) => state.home.stateHome);
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
    <div className="bg-neutral-50 relative">
      <HeadHome />
      <MainHome />
      <FootHome />
    </div>
  );
}

export default Home;
