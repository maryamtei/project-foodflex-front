import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import FavoriCard from './FavoriCard/FavoriCard';
import ScheduleFavori from './ScheduleFavori/ScheduleFavori';

function Favoris() {
  const favorites = useAppSelector((state) => state.favoris.favoris);

  const displaySchedule = useAppSelector(
    (state) => state.schedule.clickAddFavori
  );

  return (
    <div className="container px-4">
      {displaySchedule && <ScheduleFavori />}
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
          <FavoriCard key={favori.idMeal} favori={favori} />
        ))}
      </div>
    </div>
  );
}

export default Favoris;
