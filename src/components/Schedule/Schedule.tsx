import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateSchedule } from '../../store/reducers/schedule';
import { changeWeek } from '../../store/reducers/settings';
import Carousel from '../Carousel/Carousel';

function Schedule() {
  const currentWeek = useAppSelector((state) => state.settings.currentWeek);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const [weekInput, setweekInput] = useState(currentWeek);
  const schedules = useAppSelector(
    (state) => state.settings.currentUser.schedules
  );
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const weekFind = schedules.find((week) => week.week === currentWeek);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClickNextWeek() {
    if (currentWeek < 52) {
      setAnimateLeft(true);
      setTimeout(() => {
        dispatch(changeWeek(currentWeek + 1));
      }, 400);

      setTimeout(() => {
        setAnimateLeft(false);
      }, 800);
    }
  }
  function handleClickBeforeWeek() {
    if (currentWeek > 1) {
      setAnimateRight(true);

      setTimeout(() => {
        dispatch(changeWeek(currentWeek - 1));
      }, 400);
      setTimeout(() => {
        setAnimateRight(false);
      }, 800);
    }
  }

  function changeInputCurrentWeek() {
    setweekInput();
  }

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
          className={` ${currentWeek <= 1 ? 'hidden' : ''}`}
          disabled={animateRight}
          onClick={() => {
            handleClickBeforeWeek();
          }}
        >
          <ChevronLeft className="text-thirdff h-16 w-16" />
        </button>
        <input
          type="number"
          id="weekInput"
          min="1"
          max="52"
          className="text-thirdff text-2xl sm:text-4xl font-bold text-center"
          value={weekInput}
          // onChange={changeInputCurrentWeek()}
        />

        <button
          type="button"
          className={` ${currentWeek >= 52 ? 'hidden' : ''}`}
          disabled={animateLeft}
          onClick={() => {
            handleClickNextWeek();
          }}
        >
          <ChevronRight className="text-thirdff h-16 w-16" />
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
