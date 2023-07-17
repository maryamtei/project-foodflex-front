import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { nextWeek } from '../../store/reducers/settings';
import Carousel from '../Carousel/Carousel';
import { changeStateSchedule } from '../../store/reducers/schedule';

function Schedule() {
  const [newSchedule, setNewSchedule] = useState([
    {
      idMeal: '',
      name: '',
      imageUrl: '',
      position: 0,
    },
  ]);
  const currentWeek = useAppSelector((state) => state.settings.currentWeek);
  const stateSchedule = useAppSelector((state) => state.schedule.stateSchedule);
  const schedules = useAppSelector(
    (state) => state.settings.currentUser.schedule
  );
  const weekFind = schedules.find((week) => week.week === currentWeek);

  const dispatch = useAppDispatch();

  function handleClickNextWeek() {
    dispatch(nextWeek(true));
  }
  function handleClickBeforeWeek() {
    dispatch(nextWeek(false));
  }
  useEffect(() => {
    dispatch(changeStateSchedule(true));
    const newCurrentSchedule = [];
    // eslint-disable-next-line no-plusplus
    for (let position = 0; position < 14; position++) {
      const userSchedule = weekFind?.meals.find(
        (mealUser) => mealUser.position === position
      );
      if (userSchedule !== undefined) {
        newCurrentSchedule.push({
          idMeal: userSchedule.idMeal.toString(),
          name: userSchedule.name,
          imageUrl: userSchedule.imageUrl,
          position: userSchedule.position,
        });
      } else {
        newCurrentSchedule.push({
          idMeal: position.toString(),
          name: 'test',
          imageUrl: '/images.jpeg',
          position,
        });
      }
    }
    setNewSchedule(newCurrentSchedule);

    return () => {
      dispatch(changeStateSchedule(false));
    };
  }, [weekFind, dispatch]);

  return (
    <div className="flex flex-col justify-center my-10 px-3 sm:px-8">
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
      {newSchedule.length === 14 && (
        <div className="mt-10 block">
          <Carousel recipes={newSchedule} />
        </div>
      )}
    </div>
  );
}

export default Schedule;
