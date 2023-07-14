import { Plus, Heart } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addSchedule, displaySchedule } from '../../store/reducers/schedule';
import { addFavori } from '../../store/reducers/favoris';
import { Recipe } from '../../@types/recipe';

interface CardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: CardProps) {
  const clickAddFavori = useAppSelector(
    (state) => state.schedule.clickAddSchedule
  );
  const dispatch = useAppDispatch();

  function handleAddSchedule(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(displaySchedule(!clickAddFavori));
    dispatch(addSchedule(recipe));
  }

  function handleAddFavori(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(addFavori(recipe));
  }

  return (
    <Link
      to="/recipe"
      className="shadow-md rounded-lg relative hover:shadow-lg transition-all"
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="rounded-t-md cover"
      />
      <div className="text-bgff absolute top-2 right-1 ">
        <div className="card-actions justify-end bg-t">
          <button
            type="button"
            className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
            onClick={(event) => handleAddFavori(event)}
          >
            <Heart size={20} />
          </button>
          <button
            type="button"
            className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
            onClick={(event) => handleAddSchedule(event)}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="rounded-b-lg">
        <h2 className="text-fourthff font-bold p-2 text-center truncate">
          {recipe.name}
        </h2>
      </div>
    </Link>
  );
}

export default RecipeCard;
