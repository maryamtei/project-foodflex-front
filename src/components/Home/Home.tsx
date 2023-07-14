import { useEffect } from 'react';
import HeadHome from './HeadHome';
import MainHome from './MainHome';
import FootHome from './FootHome';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateHome } from '../../store/reducers/home';
import { fetchRandomRecipes } from '../../store/reducers/recipes';

function Home() {
  const dispatch = useAppDispatch();
  const stateHome = useAppSelector((state) => state.home.stateHome);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const recipes = useAppSelector((state) => state.recipes.list);
  console.log(recipes.length);
  useEffect(() => {
    dispatch(fetchRandomRecipes());
  }, [dispatch]);

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
    <div
      className={`bg-bgff relative mb-20 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } `}
    >
      <HeadHome />
      {recipes.length && <MainHome recipes={recipes} />}
      <FootHome />
    </div>
  );
}

export default Home;
