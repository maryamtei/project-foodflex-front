import Modal from '../settings/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleIsOpen } from '../../store/reducers/settings';

function Apptest() {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);
  const HandleClickButton = () => {
    dispatch(toggleIsOpen());
  };

  return (
    <div className="App">
      {modalIsOpen === true && <Modal />}
      <button
        type="submit"
        className="btn text-secondary"
        onClick={HandleClickButton}
      >
        Ouvrir modal
      </button>
    </div>
  );
}

export default Apptest;
