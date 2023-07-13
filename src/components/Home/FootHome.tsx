import React from 'react';
import { RootState } from '../../store';

function FootHome() {
  const handleClick = () => {
    console.log('Bouton cliqué !');
  };

  return (
    <div>
      <h2 className="text-lg sm:text-2xl font-bold mt-8 text-center sm:text-center md:text-center">
        GET STARTED ?
      </h2>
      <div className="mt-4 sm:mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 bg-black text-white rounded-lg text-lg font-bold"
        >
          Click me
        </button>
      </div>
    </div>
  );
}

export default FootHome;
