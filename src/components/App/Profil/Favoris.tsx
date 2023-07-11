import { NavLink } from 'react-router-dom';

function Favoris() {
  return (
    <div className="container">
      <div className="mt-10 flex justify-center mb-16	">
        <NavLink
          to="/favoris"
          className={({ isActive }) =>
            isActive
              ? 'btn rounded-3xl  w-28 shadow-lg text-activeff'
              : 'btn rounded-3xl  w-28 shadow-lg'
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? 'ml-10 btn rounded-3xl  w-28 shadow-lg text-activeff'
              : 'ml-10 btn rounded-3xl  w-28 shadow-lg'
          }
        >
          Profil
        </NavLink>
      </div>
    </div>
  );
}

export default Favoris;
