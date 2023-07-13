import { Plus, Heart } from 'react-feather';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteFavori } from '../../../store/reducers/favoris';
import { addFavori } from '../../../store/reducers/schedule';
import { Favorite } from '../../../@types/Profil';

interface CardProps {
  favori: Favorite;
}

function FavoriCard({ favori }: CardProps) {
  const dispatch = useAppDispatch();

  function handleDeleteFavori() {
    dispatch(deleteFavori(favori.idMeal));
  }

  function handleAddFavori() {
    dispatch(addFavori(favori));
  }

  return (
    <div className="shadow-md rounded-lg relative hover:shadow-lg transition-all">
      <img
        src={favori.image}
        alt={favori.name}
        className="rounded-t-md cover"
      />
      <div className="text-bgff absolute top-2 right-1">
        <div className="card-actions justify-end">
          <Heart
            color="black"
            fill="red"
            onClick={() => handleDeleteFavori()}
          />

          <Plus color="red" onClick={() => handleAddFavori()} />
        </div>
      </div>
      <div className="rounded-b-lg">
        <h2 className="text-thirdff p-2 text-center truncate">{favori.name}</h2>
      </div>
    </div>
  );
}

export default FavoriCard;
