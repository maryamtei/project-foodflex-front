// Import necessary modules and components
import { scroller } from 'react-scroll';
import { useEffect, useRef } from 'react';
import Signup from './sign-up/Signup';
import Signin from './sign-in/Signin';
import { useAppSelector } from '../../hooks/redux';

// Define the 'Modal' component
function Modal() {
  // Get the 'modalIsOpen' and 'signUpOpen' states from the Redux store using the 'useAppSelector' hook
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const signUpOpen = useAppSelector((state) => state.settings.signUpOpen);

  // Create a ref for the modal container element
  const modalRef = useRef(null);

  // Function to conditionally render the 'Signup' or 'Signin' component based on the 'signUpOpen' state
  const modalCondition = () => {
    if (!signUpOpen) {
      return <Signin />;
    }
    return <Signup />;
  };

  // useEffect to scroll to the modal when it becomes open ('modalIsOpen' changes)
  useEffect(() => {
    scroller.scrollTo('modalSignUpSignIn', {
      duration: 500,
      smooth: true,
      offset: -100,
    });
  }, [modalIsOpen]);

  // Render the modal component with 'Signup' or 'Signin' component based on 'signUpOpen' state
  return (
    <div
      ref={modalRef}
      id="modalSignUpSignIn"
      className="grid justify-items-center sm:absolute sm:top-2/4 sm:left-2/4 sm:z-50 sm:translate-y-[-50%] sm:translate-x-[-50%]"
    >
      {modalCondition()}
    </div>
  );
}
// Export the 'Modal' component as the default export
export default Modal;
