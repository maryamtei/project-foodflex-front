import { ChangeEvent, useEffect, useState } from 'react';
import {
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

function Schedule() {
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
    </div>
  );
}

export default Schedule;
