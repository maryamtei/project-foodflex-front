import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { displaySchedule } from '../../store/reducers/user';
import Schedule from '../Schedule/Schedule';

function ScheduleModal() {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(displaySchedule(false));
  };

  const showSchedule = useAppSelector(
    (state) => state.settings.clickAddSchedule
  );

  return (
    <Transition appear show={showSchedule} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 text-titleff"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-2 align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                  <X onClick={closeModal} />
                </div>
                <h2 className="text-2xl mt-6 font-bold text-titleff">
                  Which day to eat this dish?
                </h2>

                <div className="mt-2">
                  <Schedule />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ScheduleModal;
