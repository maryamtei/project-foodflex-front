

import React from 'react';
import { useAppSelector } from '../../hooks/redux';

function Message() {
  const message = useAppSelector((state) => state.settings.message);
  const status = useAppSelector((state) => state.settings.status);
  const alert = () => {
    if (status !== 200) {
      return (
        <div
          className={`bg-orange-100 border-l-4 border-red-600 text-red-600 fixed bottom-20 sm:bottom-5 w-60 right-[-15rem] z-[100] p-5 ${
            status ? 'animate-messageAnimation' : ''
          }`}
          role="alert"
        >
          <p className="font-bold">{message}</p>
        </div>
      );
    }
    return (
      <div
        className={`bg-orange-100 border-l-4 border-green-500 text-green-500 fixed bottom-20 sm:bottom-5 w-60 right-[-15rem] z-[100] p-5 ${
          status ? 'animate-messageAnimation' : ''
        }`}
        role="alert"
      >
        <p className="font-bold">{message}</p>
      </div>
    );
  };
  return alert();
}

export default Message;
