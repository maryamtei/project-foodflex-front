import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectedDay } from '../../../store/reducers/schedule';

interface DayProps {
  day: number;
}

function SelectedDay({ day }: DayProps) {
  const schedules = useAppSelector((state) => state.schedule.schedule);

  const weekFind = schedules.find((week) => week.week === 1);
  const full = weekFind?.meals.find((meal) => meal.position === day);

  const dispatch = useAppDispatch();

  function handleClickDay() {
    dispatch(selectedDay(day));
  }

  return (
    <button
      type="button"
      className={
        full
          ? 'btn btn-success text-sm rounded-3xl w-32 shadow-lg mr-5'
          : 'btn text-sm rounded-3xl text-black w-32 shadow-lg mr-5'
      }
      onClick={() => handleClickDay()}
    >
      Jour {day}
    </button>
  );
}

export default SelectedDay;
