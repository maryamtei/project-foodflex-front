import { useEffect } from 'react';
import HeadHome from './Components/HeadHome';
import MainHome from './Components/MainHome';
import FootHome from './Components/FootHome';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateHome } from '../../store/reducers/home';
import { fetchRandomRecipes } from '../../store/reducers/recipes';
import { toggleIsOpen, toggleSignUpOpen } from '../../store/reducers/settings';
import ScheduleModal from '../ScheduleModal/ScheduleModal';

interface HomeProps {
  signInDomain: string;
}

function Home({ signInDomain }: HomeProps) {
  const dispatch = useAppDispatch();
  const stateHome = useAppSelector((state) => state.home.stateHome);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const recipes = useAppSelector((state) => state.recipes.list);

  // Redirect to signIn or SignUp
  useEffect(() => {
    if (signInDomain === 'signup') {
      // We display signUp Modal
      dispatch(toggleIsOpen());
    }
    if (signInDomain === 'signin') {
      // We display signIn Modal
      dispatch(toggleIsOpen());
      dispatch(toggleSignUpOpen());
    }
  }, [dispatch, signInDomain]);

  useEffect(() => {
    dispatch(fetchRandomRecipes({ count: 14 }));
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

  useEffect(() => {
    // Fonction pour gérer le comportement du scroll
    const handleScroll = (e: Event) => {
      if (modalIsOpen) {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    };

    // Ajouter ou supprimer l'écouteur d'événement en fonction du modalIsOpen
    if (modalIsOpen) {
      document.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.removeEventListener('scroll', handleScroll);
    }

    return () => {
      // Nettoyage lorsqu'il est désabonné de l'effet
      document.body.style.overflow = 'visible';
      document.removeEventListener('scroll', handleScroll);
    };
  }, [modalIsOpen]);

  return (
    <div
      className={`bg-bgff relative mb-20 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } `}
    >
      <ScheduleModal />

      <HeadHome />
      {recipes.length === 14 && <MainHome recipes={recipes} />}

      <FootHome />
    </div>
  );
}

export default Home;
