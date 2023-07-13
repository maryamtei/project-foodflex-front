import { useAppSelector } from '../../../hooks/redux';
import SelectedDay from './SelectedDay';
import fakeDay from '../../../fakeData/fakeDay.json';

function Favoris() {
  const schedule = useAppSelector((state) => state.schedule.schedule);

  return (
    <div className="grid grid-cols-2 grid-flow-row gap-4">
      {fakeDay.map((day) => (
        <SelectedDay key={day.id} day={day.position} />
      ))}
    </div>
  );
}

export default Favoris;
