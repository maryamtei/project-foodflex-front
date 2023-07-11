import { NavLink } from 'react-router-dom';

function Favoris() {
  return (
    <div className="container">
      <div className="mt-10 flex justify-center mb-16	">
        <NavLink
          to="/favoris"
          className="btn rounded-3xl text-black w-28 shadow-lg"
        >
          Favorites
        </NavLink>
        <NavLink
          to="/profil"
          className="ml-10 btn rounded-3xl text-black w-28 shadow-lg"
        >
          Profil
        </NavLink>
      </div>
    </div>
  );
}

export default Favoris;
