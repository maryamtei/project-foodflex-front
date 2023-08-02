import { useEffect } from 'react';
import { Shuffle, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { MealAdd, Recipe } from '../../@types/recipe';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateModalAnimation } from '../../store/reducers/favoris';

import {
  addSchedule,
  addScheduleFavori,
  deleteMeal,
} from '../../store/reducers/user';
import './RecipeCard.css';
import HeartFavori from './HeartFavori/HeartFavori';
import AddScheduleButton from './AddScheduleButton/AddScheduleButton';

interface CardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: CardProps) {
  const stateSchedule = useAppSelector((state) => state.schedule.stateSchedule);
  const MealFavoriToAdd = useAppSelector(
    (state) => state.settings.MealFavoriToAdd
  );

  const displayScheduleModal = useAppSelector(
    (state) => state.settings.clickAddSchedule
  );

  const currentWeek = useAppSelector((state) => state.settings.currentWeek);
  const dispatch = useAppDispatch();

  // Function to handle adding a recipe to the schedule on a specific day
  function handleClickDay() {
    const newMeal = {
      idDbMeal: MealFavoriToAdd.idDbMeal,
      name: MealFavoriToAdd.name,
      image: MealFavoriToAdd.image,
      position: recipe.position,
    };
    dispatch(addScheduleFavori(newMeal));
    dispatch(addSchedule({ meals: newMeal, week: currentWeek }));
  }

  // Function to handle delete the recipe to schedule
  function handleDeleteMeal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(deleteMeal(recipe.id));
  }

  // Function to handle shuffling and adding a new random recipe to the schedule
  async function handleShuffleMeal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await response.json();

    const meal = data.meals[0];

    const uniqueMeal: MealAdd = {
      idDbMeal: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      position: recipe.position,
    };

    dispatch(addSchedule({ meals: uniqueMeal, week: currentWeek }));
  }

  // useEffect to check if the recipe is in favorites and update recipeFavori accordingly

  useEffect(() => {
    if (displayScheduleModal) {
      dispatch(changeStateModalAnimation(1));
    }
  }, [dispatch, displayScheduleModal]);

  const stateHome = useAppSelector((state) => state.home.stateHome);

  return (
    <Link
      to={recipe.id === 1 ? `/recipes` : `/recipes/${recipe.idDbMeal}`}
      className={`shadow-md rounded-lg relative hover:shadow-lg transition-all  ${
        displayScheduleModal
          ? 'pointer-events-auto border-2 border-thirdff'
          : ''
      }`}
      onClick={(event: { preventDefault: () => void }) => {
        if (displayScheduleModal) {
          event.preventDefault();
          handleClickDay();
        }
      }}
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className={`rounded-t-md h-42 2xl:h-60 object-cover w-full ${
          (stateSchedule || displayScheduleModal) && recipe.id === 1
            ? 'pointer-events-none opacity-60'
            : ''
        }
       `}
      />
      <div
        className={` ${stateHome ? 'hidden' : ''}
          ${displayScheduleModal ? '' : 'hidden'}`}
      >
        <div className="bg-black opacity-40 w-24 h-10 rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        <h2 className="text-white font-bold p-2 text-center truncate text-sm sm:text-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {recipe.id === 1 ? 'Add here !' : 'Replace'}
        </h2>
      </div>
      <div className="text-bgff absolute top-2 right-1 ">
        <div
          className={`card-actions justify-end bg-t ${stateHome ? 'hidden' : ''}
          ${stateSchedule ? 'hidden' : ''}
          ${
            (stateSchedule || displayScheduleModal) && recipe.id === 1
              ? 'blur-[3px] pointer-events-none opacity-60'
              : ''
          }`}
        >
          {/* ---------------- COMPONENT ADD TO FAVORI --------------- */}
          <HeartFavori recipe={recipe} />
          {/* ---------------- COMPONENT ADD TO SCHEDULE --------------- */}
          <AddScheduleButton recipe={recipe} />
        </div>

        {/* Is there a recipe on this card? If yes, we display the delete function; otherwise, we display the shuffle function. */}
        {recipe.id !== 1 ? (
          <div
            className={`card-actions justify-end  ${
              stateHome ? 'hidden' : ''
            } ${stateSchedule ? '' : 'hidden'}     ${
              displayScheduleModal ? 'hidden' : ''
            }`}
          >
            {/* ---------------- Function DELETE ---------------- */}
            {/* ---------------- COMPONENT ADDFAVORI --------------- */}
            <HeartFavori recipe={recipe} />

            <button
              type="button"
              className="hover:text-secondaryff transition-all bg-gray-700/50 rounded-full p-2"
              onClick={(event) => {
                event.preventDefault();
                handleDeleteMeal(event);
              }}
            >
              <X
                size={20}
                className=" text-[rgb(255,0,0)] transition-transform duration-500 hover:rotate-90"
              />
            </button>
          </div>
        ) : (
          <div
            className={`card-actions justify-end  ${
              stateHome ? 'hidden' : ''
            } ${stateSchedule ? '' : 'hidden'}     ${
              displayScheduleModal ? 'hidden' : ''
            }`}
          >
            {/* ----------- Function SHUFFLE ----------- */}
            <button
              type="button"
              className="hover:text-secondaryff transition-all bg-gray-500/50 rounded-full p-2"
              onClick={(event) => {
                event.preventDefault();
                handleShuffleMeal(event);
              }}
            >
              <Shuffle size={20} className=" text-[rgb(255,0,0)]" />
            </button>
          </div>
        )}
      </div>

      <div
        className={`rounded-b-lg foodPattern ${
          (stateSchedule || displayScheduleModal) && recipe.id === 1
            ? ' pointer-events-none opacity-60'
            : ''
        }`}
      >
        <h2 className="text-white font-semibold p-2 text-center truncate text-sm sm:text-md">
          {recipe.name}
        </h2>
      </div>
    </Link>
  );
}

export default RecipeCard;
