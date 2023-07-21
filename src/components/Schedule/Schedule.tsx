import NukaCarousel from 'nuka-carousel';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeStateSchedule } from '../../store/reducers/schedule';
import { nextWeek } from '../../store/reducers/settings';
import Carousel from '../Carousel/Carousel';

function Schedule() {
  const currentWeek = useAppSelector((state) => state.settings.currentWeek);
  const schedules = useAppSelector(
    (state) => state.settings.currentUser.schedules
  );
  const isLogged = useAppSelector((state) => state.settings.isLogged);
  const weekFind = schedules.find((week) => week.week === currentWeek);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClickNextWeek() {
    dispatch(nextWeek(true));
  }
  function handleClickBeforeWeek() {
    dispatch(nextWeek(false));
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

  return (
    <div className={` flex flex-col justify-center my-10 px-3 sm:px-8 `}>
      <div className="flex justify-center items-center gap-4 mb-8">
        <button type="button" onClick={() => handleClickBeforeWeek()}>
          <ChevronLeft className="text-thirdff h-16 w-16" />
        </button>
        <p className="text-thirdff text-2xl sm:text-4xl font-bold text-center">
          Week {currentWeek}
        </p>
        <button type="button" onClick={() => handleClickNextWeek()}>
          <ChevronRight className="text-thirdff h-16 w-16" />
        </button>
      </div>
      <NukaCarousel withoutControls slideIndex={currentWeek - 1}>
        {schedules.map((schedule) => (
          <Carousel key={schedule.week} meals={schedule.meals} />
        ))}
      </NukaCarousel>
    </div>
  );
}

export default Schedule;
