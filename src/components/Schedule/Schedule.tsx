import { PDFDownloadLink } from '@react-pdf/renderer';
import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ListBox from './ListBox/ListBox';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateSchedule } from '../../store/reducers/schedule';
import { changeWeek } from '../../store/reducers/user';
import Carousel from '../Carousel/Carousel';
import MyShoppingList from './shoppingListPdf';

function Schedule() {
  // Component State and Redux State
  const currentWeek = useAppSelector((state) => state.settings.currentWeek);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const schedules = useAppSelector(
    (state) => state.settings.currentUser.schedules
  );
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const weekFind = schedules.find((week) => week.week === currentWeek);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Init animation duration
  const animationDuration = 400;
  const resetAnimationDuration = 800;

  // Function for animating week next animate left
  function handleClickNextWeek(nbrSchedule: number) {
    if (currentWeek < 52) {
      setAnimateLeft(true);
      setTimeout(() => {
        dispatch(changeWeek(currentWeek + nbrSchedule));
      }, animationDuration);

      setTimeout(() => {
        setAnimateLeft(false);
      }, resetAnimationDuration);
    }
  }
  // Function for animating week next animate right
  function handleClickBeforeWeek(nbrSchedule: number) {
    if (currentWeek > 1) {
      setAnimateRight(true);
      setTimeout(() => {
        dispatch(changeWeek(currentWeek - nbrSchedule));
      }, animationDuration);

      setTimeout(() => {
        setAnimateRight(false);
      }, resetAnimationDuration);
    }
  }
  // Function for animating week and change value of currentWeek with Listbox
  const changeInputCurrentWeek = (newValue: number | undefined) => {
    if (newValue) {
      // Animate Right
      if (currentWeek > newValue) {
        setAnimateRight(true);
        setTimeout(() => {
          dispatch(changeWeek(newValue));
        }, animationDuration);

        setTimeout(() => {
          setAnimateRight(false);
        }, resetAnimationDuration);
      } else {
        // Animate Left
        setAnimateLeft(true);
        setTimeout(() => {
          dispatch(changeWeek(newValue));
        }, animationDuration);

        setTimeout(() => {
          setAnimateLeft(false);
        }, resetAnimationDuration);
      }
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

  // Render schedule week
  function newShedulesFunction() {
    return schedules
      .filter((schedule) => schedule.week === currentWeek)
      .map((schedule) => (
        <Carousel key={schedule.week} meals={schedule.meals} />
      ));
  }

  // Side effects and functions for Shopping List
  const [shoppingList, setShoppingList] = useState<
    [string | undefined, string | undefined][]
  >([]);
  const [isListReady, setIsListReady] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    setShoppingList([]);
    setIsListReady(false);
  }, [currentWeek]);

  // RETRIEVAL OF CORRESPONDING INGREDIENTS AND MEASURES
  const createList = useCallback(async () => {
    const list: Array<{ ingredient: string; mesure: string }> = [];

    if (!schedules[currentWeek - 1]) {
      return;
    }
    const meals = await Promise.all(
      schedules[currentWeek - 1].meals.map((meal: { idDbMeal: number }) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idDbMeal}`
        ).then((response) => response.json())
      )
    );
    meals.forEach((meal) => {
      meal.meals.forEach((currentMeal: { [x: string]: string | undefined }) => {
        for (let i = 1; i <= 20; i += 1) {
          const ingredient = currentMeal[`strIngredient${i}`];
          const measure = currentMeal[`strMeasure${i}`];
          if (ingredient?.trim() && measure?.trim()) {
            list.push({ ingredient, mesure: measure });
          }
        }
      });
    });
    setIsListReady(false);

    const combined: { [key: string]: string | undefined } = {};

    // COMBINING QUANTITIES WHEN THERE ARE DUPLICATES
    list.forEach(({ ingredient, mesure }) => {
      if (!ingredient) {
        return;
      }
      if (combined[ingredient]) {
        combined[ingredient] = `${combined[ingredient]}, ${mesure}`;
      } else {
        combined[ingredient] = mesure;
      }
    });
    const newList = Object.entries(combined);
    newList.sort((a, b) => a[0].localeCompare(b[0]));
    setShoppingList(newList);
    setIsListReady(true);
  }, [currentWeek, schedules]);

  // CREATION OF THE LIST
  useEffect(() => {
    createList();
  }, [createList]);

  // DISPLAYING THE LIST
  function toggleListVisibility() {
    setIsListVisible(!isListVisible);
    if (!isListReady) {
      createList();
    }
  }
  return (
    <div
      className={` overFlow-hiden flex flex-col justify-center sm:my-2 md:my-10 px-3 sm:px-8 relative`}
    >
      <div className="flex justify-center items-center gap-4 sm:mb-2 md:mb-8 ">
        <button
          type="button"
          className={` ${currentWeek <= 5 ? 'hidden' : ''}`}
          disabled={animateRight}
          onClick={() => {
            handleClickBeforeWeek(5);
          }}
        >
          <ChevronsLeft className="text-titleff h-16 w-16" />
        </button>
        <button
          type="button"
          className={` ${currentWeek <= 1 ? 'hidden' : ''}`}
          disabled={animateRight}
          onClick={() => {
            handleClickBeforeWeek(1);
          }}
        >
          <ChevronLeft className="text-titleff h-16 w-16" />
        </button>
        <p className="text-titleff text-2xl sm:text-4xl font-bold text-center">
          Week
        </p>
        <ListBox value={currentWeek} onChange={changeInputCurrentWeek} />

        <button
          type="button"
          className={` ${currentWeek >= 52 ? 'hidden' : ''}`}
          disabled={animateLeft}
          onClick={() => {
            handleClickNextWeek(1);
          }}
        >
          <ChevronRight className="text-titleff h-16 w-16" />
        </button>
        <button
          type="button"
          className={` ${currentWeek >= 47 ? 'hidden' : ''}`}
          disabled={animateLeft}
          onClick={() => {
            handleClickNextWeek(5);
          }}
        >
          <ChevronsRight className="text-titleff h-16 w-16" />
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4  my-10">
          <button
            type="button"
            onClick={toggleListVisibility}
            className="transition duration-500 ease-in-out rounded-md border border-transparent hover:border-fourthff bg-fourthff py-2 px-4 text-sm font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2"
          >
            {isListVisible ? 'Hide my shopping list' : 'Show my shopping list'}
          </button>
          {isListReady ? (
            <PDFDownloadLink
              document={
                <MyShoppingList
                  shoppingList={shoppingList}
                  currentWeek={currentWeek}
                />
              }
              className="transition duration-500 ease-in-out rounded-md border border-transparent hover:border-fourthff bg-fourthff py-2 px-4 text-sm font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2"
              fileName="MyShoppingList.pdf"
            >
              Export my shopping list to PDF
            </PDFDownloadLink>
          ) : (
            <p className=" transition rounded-md border border-transparent hover:border-fourthff bg-fourthff py-2 px-4 text-sm font-medium text-bgff hover:text-fourthff hover:bg-bgff focus:outline-none focus-visible:ring-2 focus-visible:ring-fourthff focus-visible:ring-offset-2">
              Export my shopping list to PDF
            </p>
          )}
        </div>
        {isListVisible && (
          <div>
            <div className="flex justify-center mb-8">
              {(() => {
                if (shoppingList.length === 0) {
                  return <span>Nothing on the menu 🤷‍♂️</span>;
                }

                let statusMessage;
                if (shoppingList.length < 30) {
                  statusMessage = `The shopping should be quick 🕺🏿`;
                } else if (shoppingList.length <= 80) {
                  statusMessage = `That's a nice shopping list ✨`;
                } else {
                  statusMessage = `That's a lot of ingredients 😱`;
                }

                return (
                  <>
                    <span className="font-bold pr-2">
                      {shoppingList.length} ingredients:
                    </span>
                    <span>{statusMessage}</span>
                  </>
                );
              })()}
            </div>
            <div className="flex justify-center">
              <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-2">
                {shoppingList.map(([ingredient, measure]) => (
                  <li
                    key={`${ingredient}${measure}`}
                    className="flex items-center text-left"
                  >
                    <Check className="h-5 w-5 mx-3" aria-hidden="true" />
                    <span className="font-bold pr-2">{ingredient}:</span>
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
