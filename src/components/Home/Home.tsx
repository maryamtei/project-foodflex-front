// Import necessary dependencies and components
import { useEffect } from 'react';
import HeadHome from './Components/HeadHome';
import MainHome from './Components/MainHome';
import FootHome from './Components/FootHome';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateHome } from '../../store/reducers/home';
import { fetchRandomRecipes } from '../../store/reducers/recipes';
import { toggleIsOpen, toggleSignUpOpen } from '../../store/reducers/user';

// Define the props interface for the Home component
interface HomeProps {
  signInDomain: string;
}

// Home component that represents the home page
function Home({ signInDomain }: HomeProps) {
  const dispatch = useAppDispatch();
  const stateHome = useAppSelector((state) => state.home.stateHome);
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const recipes = useAppSelector((state) => state.recipes.list);

  // Redirect to signIn or SignUp modal based on the signInDomain prop
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

  // Fetch random recipes when the component mounts
  useEffect(() => {
    dispatch(fetchRandomRecipes({ count: 14 }));
  }, [dispatch]);

  // Update the stateHome state to change header background to transparent
  useEffect(() => {
    if (stateHome === false) {
      dispatch(changeStateHome(true));
    }

    // Clean up when the component is unmounted
    return () => {
      dispatch(changeStateHome(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Do not remove, otherwise the code may not work

  // Function to handle scroll behavior
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (modalIsOpen) {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    };

    // Add or remove the event listener based on modalIsOpen
    if (modalIsOpen) {
      document.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.removeEventListener('scroll', handleScroll);
    }

    // Clean up when the component is unmounted or modalIsOpen changes
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('scroll', handleScroll);
    };
  }, [modalIsOpen]);

  // Return the JSX content of the Home component
  return (
    <div
      className={`bg-bgff relative mb-20 ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } `}
    >
      <HeadHome />
      {recipes.length === 14 && <MainHome recipes={recipes} />}

      <FootHome />
    </div>
  );
}

// Export the Home component as the default export
export default Home;
