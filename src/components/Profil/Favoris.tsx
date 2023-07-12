import { NavLink } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import { useAppSelector } from '../../hooks/redux';

function Favoris() {
  const favorites = useAppSelector((state) => state.favoris.favorisList);

  return (
    <div className="container">
      <div className="mt-10 flex justify-center mb-16	">
        <NavLink
          to="/favoris"
          className={({ isActive }) =>
            isActive
              ? 'btn rounded-3xl  w-28 shadow-lg text-red-600'
              : 'btn rounded-3xl  w-28 shadow-lg'
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? 'ml-10 btn rounded-3xl  w-28 shadow-lg text-red-600'
              : 'ml-10 btn rounded-3xl  w-28 shadow-lg'
          }
        >
          Profil
        </NavLink>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
        {favorites.map((favori) => (
          <RecipeCard
            name={favori.name}
            key={favori.idMeal}
            imageUrl={favori.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Favoris;
