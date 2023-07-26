import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateSchedule } from '../../store/reducers/schedule';
import { nextWeek } from '../../store/reducers/settings';
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

  function handleClickNextWeek() {
    setAnimateLeft(true);
    setTimeout(() => {
      dispatch(nextWeek(true));
    }, 400);

    setTimeout(() => {
      setAnimateLeft(false);
    }, 800);
  }
  function handleClickBeforeWeek() {
    setAnimateRight(true);

    setTimeout(() => {
      dispatch(nextWeek(false));
    }, 400);
    setTimeout(() => {
      setAnimateRight(false);
    }, 800);
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
          disabled={animateRight}
          onClick={() => handleClickBeforeWeek()}
        >
          <ChevronLeft className="text-thirdff h-16 w-16" />
        </button>
        <p className="text-thirdff text-2xl sm:text-4xl font-bold text-center">
          Week {currentWeek}
        </p>
        <button
          type="button"
          disabled={animateLeft}
          onClick={() => handleClickNextWeek()}
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
