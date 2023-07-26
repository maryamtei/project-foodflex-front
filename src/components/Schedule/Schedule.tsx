import { PDFDownloadLink } from '@react-pdf/renderer';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateSchedule } from '../../store/reducers/schedule';
import { changeWeek } from '../../store/reducers/settings';
import Carousel from '../Carousel/Carousel';
import MyShoppingList from './shoppingListPdf';

function Schedule() {
  const [shoppingList, setShoppingList] = useState<
    [string | undefined, string | undefined][]
  >([]);

  const currentWeek = useAppSelector((state) => state.settings.currentWeek);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  useEffect(() => {
    setShoppingList([]);
  }, [currentWeek]);

  const schedules = useAppSelector(
    (state) => state.settings.currentUser.schedules
  );
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const weekFind = schedules.find((week) => week.week === currentWeek);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClickNextWeek(nbrSchedule: number) {
    if (currentWeek < 52) {
      setAnimateLeft(true);
      setTimeout(() => {
        dispatch(changeWeek(currentWeek + nbrSchedule));
      }, 400);

      setTimeout(() => {
        setAnimateLeft(false);
      }, 800);
    }
  }
  function handleClickBeforeWeek(nbrSchedule: number) {
    if (currentWeek > 1) {
      setAnimateRight(true);
      setTimeout(() => {
        dispatch(changeWeek(currentWeek - nbrSchedule));
      }, 400);

      setTimeout(() => {
        setAnimateRight(false);
      }, 800);
    }
  }

  const changeInputCurrentWeek = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    if (currentWeek > Number(newInputValue)) {
      setAnimateRight(true);
      setTimeout(() => {
        dispatch(changeWeek(Number(newInputValue)));
      }, 400);

      setTimeout(() => {
        setAnimateRight(false);
      }, 800);
    } else {
      setAnimateLeft(true);
      setTimeout(() => {
        dispatch(changeWeek(Number(newInputValue)));
      }, 400);

      setTimeout(() => {
        setAnimateLeft(false);
      }, 800);
    }
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
    dispatch(changeStateSchedule(true));
    return () => {
      dispatch(changeStateSchedule(false));
    };
  }, [weekFind, dispatch, isLogged, navigate]);

  function newShedulesFunction() {
    return schedules
      .filter((schedule) => schedule.week === currentWeek)
      .map((schedule) => (
        <Carousel key={schedule.week} meals={schedule.meals} />
      ));
  }

  async function createList() {
    const ingredients: string[] = [];
    const mesures: string[] = [];
    const mealsOfTheWeek = schedules[currentWeek - 1].meals.map(
      async (meal: { idDbMeal: any }) => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idDbMeal}`
        );
        const data = await response.json();

        data.meals.map((currentMeal: { [x: string]: any }) => {
          for (let i = 1; i <= 20; i += 1) {
            if (
              currentMeal[`strIngredient${i}`] &&
              currentMeal[`strIngredient${i}`].trim() !== ' '
            ) {
              ingredients.push(currentMeal[`strIngredient${i}`]);
            }

            if (
              currentMeal[`strMeasure${i}`] &&
              currentMeal[`strMeasure${i}`].trim() !== ''
            ) {
              mesures.push(currentMeal[`strMeasure${i}`]);
            }
          }

          return { ingredients, mesures };
        });
      }
    );
    await Promise.all(mealsOfTheWeek);
    return { ingredients, mesures };
  }

  function generateList() {
    createList().then((result) => {
      const completeArray: [string | undefined, string | undefined][] =
        result.ingredients.map((item, index) => [item, result.mesures[index]]);

      const combined: { [key: string]: string | undefined } = {};

      // combinaison quantites lorsqu'il y des doublons
      completeArray.forEach(([ingredient, quantity]) => {
        if (!ingredient) {
          return;
        }
        if (combined[ingredient]) {
          combined[ingredient] = `${combined[ingredient]}, ${quantity}`;
        } else {
          combined[ingredient] = quantity;
        }
      });

      const newList = Object.entries(combined);
      newList.sort((a, b) => a[0].localeCompare(b[0]));

      setShoppingList(newList);
    });
  }
  return (
    <div
      className={` flex flex-col justify-center my-10 px-3 sm:px-8 relative`}
    >
      <div className="flex justify-center items-center gap-4 mb-8 ">
        <button
          type="button"
          className={` ${currentWeek <= 5 ? 'hidden' : ''}`}
          disabled={animateRight}
          onClick={() => {
            handleClickBeforeWeek(5);
          }}
        >
          <ChevronsLeft className="text-thirdff h-16 w-16" />
        </button>
        <button
          type="button"
          className={` ${currentWeek <= 1 ? 'hidden' : ''}`}
          disabled={animateRight}
          onClick={() => {
            handleClickBeforeWeek(1);
          }}
        >
          <ChevronLeft className="text-thirdff h-16 w-16" />
        </button>
        <p className="text-thirdff text-2xl sm:text-4xl font-bold text-center">
          Week
        </p>
        <input
          type="number"
          id="weekInput"
          min="1"
          max="52"
          className="text-thirdff text-2xl sm:text-4xl font-bold text-center w-8 sm:w-16"
          value={currentWeek}
          onChange={changeInputCurrentWeek}
        />

        <button
          type="button"
          className={` ${currentWeek >= 52 ? 'hidden' : ''}`}
          disabled={animateLeft}
          onClick={() => {
            handleClickNextWeek(1);
          }}
        >
          <ChevronRight className="text-thirdff h-16 w-16" />
        </button>
        <button
          type="button"
          className={` ${currentWeek >= 47 ? 'hidden' : ''}`}
          disabled={animateLeft}
          onClick={() => {
            handleClickNextWeek(5);
          }}
        >
          <ChevronsRight className="text-thirdff h-16 w-16" />
        </button>
      </div>
      <section
        className={` relative ${
          animateLeft ? 'animate-animateCarouselLeft' : ''
        }${animateRight ? 'animate-animateCarouselRight' : ''}`}
      >
        {newShedulesFunction()}
      </section>

      <div className="text-center">
        <button
          type="button"
          onClick={generateList}
          className="rounded-md border border-transparent hover:border-fourthff bg-fourthff py-2 px-4 text-sm font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2 m-10"
        >
          Show my shopping list
        </button>
        <PDFDownloadLink
          document={<MyShoppingList shoppingList={shoppingList} />}
          className="rounded-md border border-transparent hover:border-fourthff bg-fourthff py-2 px-4 text-sm font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2 my-10"
        >
          Export my shopping list as pdf
        </PDFDownloadLink>
        <ul>
          {shoppingList.map(([ingredient, measure], index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 mx-3" aria-hidden="true" />
              {ingredient}: {measure}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Schedule;
