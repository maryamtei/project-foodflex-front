import { useAppSelector } from '../../hooks/redux';

interface DayProps {
  day: number;
  currentWeek: number;
}

function SelectedDay({ day, currentWeek }: DayProps) {
  const schedules = useAppSelector(
    (state) => state.settings.currentUser.schedule
  );

  const weekFind = schedules.find((week) => week.week === currentWeek);
  const full = weekFind?.meals.find((meal) => meal.position === day);

  return (
    <button
      type="button"
      className={
        full
          ? 'btn btn-success text-sm rounded-3xl w-32 shadow-lg mr-5'
          : 'btn text-sm rounded-3xl text-black w-32 shadow-lg mr-5'
      }
    >
      Jour {day}
    </button>
  );
}

export default SelectedDay;
