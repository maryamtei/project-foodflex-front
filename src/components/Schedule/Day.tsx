import { useAppSelector } from '../../hooks/redux';

interface DayProps {
  day: number;
}

function SelectedDay({ day }: DayProps) {
  const schedules = useAppSelector((state) => state.schedule.schedule);

  const full = schedules.find((schedule) => schedule.position === day);

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
