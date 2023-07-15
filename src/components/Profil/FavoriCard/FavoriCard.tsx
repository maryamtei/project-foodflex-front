import { Plus, Heart } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  addSchedule,
  displaySchedule,
  deleteFavori,
} from '../../../store/reducers/settings';
import { Favorite } from '../../../@types/Profil';

interface CardProps {
  favori: Favorite;
}

function FavoriCard({ favori }: CardProps) {
  const clickAddSchedule = useAppSelector(
    (state) => state.schedule.clickAddSchedule
  );

  const dispatch = useAppDispatch();

  // Function to handle deleting the favorite item
  function handleDeleteFavori() {
    dispatch(deleteFavori(favori.idMeal));
  }

  // Function to handle adding the recipe to the schedule
  function handleAddSchedule() {
    dispatch(displaySchedule(!clickAddSchedule));
    dispatch(addSchedule(favori));
  }

  return (
    <div className="shadow-md rounded-lg relative hover:shadow-lg transition-all">
      <img
        src={favori.imageUrl}
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

          <Plus color="red" onClick={() => handleAddSchedule()} />
        </div>
      </div>
      <div className="rounded-b-lg">
        <h2 className="text-bgff p-2 text-center truncate">{favori.name}</h2>
      </div>
    </div>
  );
}

export default FavoriCard;
