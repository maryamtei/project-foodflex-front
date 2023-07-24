import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function Message() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.settings.message);
  const codeMessage = useAppSelector((state) => state.settings.codeMessage);

  useEffect(() => {
    console.log(message);
    console.log(codeMessage);
  }, [message, codeMessage]);

  const alert = () => {
    if (codeMessage < 100) {
      return (
        <div
          className={`bg-orange-100 border-l-4 border-red-600 text-red-600 fixed bottom-20 sm:bottom-5 w-60 right-[-15rem] z-[100] p-5 ${
            codeMessage ? 'animate-messageAnimation' : ''
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
          codeMessage ? 'animate-messageAnimation' : ''
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
