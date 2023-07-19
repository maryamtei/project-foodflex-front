import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import FavoriCard from './FavoriCard/FavoriCard';
import { changeFavoriIsOpen } from '../../store/reducers/favoris';

function Favoris() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.settings.currentUser.favorites
  );

  const toggleFavoriProfil = () => {
    dispatch(changeFavoriIsOpen(false));
  };
  return (
    <div className="container px-1">
      <div className="mt-10 gap-3  flex justify-center mb-16	">
        <button
          type="button"
          className=" text-bgff bg-fourthff sm:text-fourthff sm:bg-bgff  btn rounded-3xl  w-28 shadow-lg"
        >
          Favorites
        </button>
        <button
          type="button"
          className=" text-fourthff bg-bgff sm:text-bgff sm:bg-fourthff btn rounded-3xl  w-28 shadow-lg"
          onClick={toggleFavoriProfil}
        >
          Profil
        </button>
      </div>
      <div className="grid grid-cols-2  gap-4 mt-10">
        {favorites.map((favori) => (
          <FavoriCard key={favori.id} favori={favori} />
        ))}
      </div>
    </div>
  );
}

export default Favoris;
