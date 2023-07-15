import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import FavoriCard from './FavoriCard/FavoriCard';
import ScheduleFavori from './ScheduleFavori/ScheduleFavori';
import { changeFavoriIsOpen } from '../../store/reducers/favoris';

function Favoris() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.settings.currentUser.favorites
  );

  const displaySchedule = useAppSelector(
    (state) => state.settings.clickAddSchedule
  );
  const toggleFavoriProfil = () => {
    dispatch(changeFavoriIsOpen(false));
  };
  return (
    <div className="container px-1">
      {displaySchedule && <ScheduleFavori />}
      <div className="mt-10 gap-3  flex justify-center mb-16	">
        <button
          type="button"
          className=" text-fourthff btn rounded-3xl  w-28 shadow-lg"
        >
          Favorites
        </button>
        <button
          type="button"
          className=" btn rounded-3xl  w-28 shadow-lg"
          onClick={toggleFavoriProfil}
        >
          Profil
        </button>
      </div>
      <div className="grid grid-cols-2  gap-4 mt-10">
        {favorites.map((favori) => (
          <FavoriCard key={favori.idMeal} favori={favori} />
        ))}
      </div>
    </div>
  );
}

export default Favoris;
