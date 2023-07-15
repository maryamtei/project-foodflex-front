import SelectedDay from './SelectedDay';
import fakeDay from '../../../fakeData/fakeDay.json';

function Favoris() {
  return (
    <div className="container mt-26 px-6">
      <div className="grid m-2 grid-cols-2 gap-6">
        {fakeDay.map((week) =>
          week.meal.map((day) => (
            <SelectedDay key={day.id} day={day.position} />
          ))
        )}
      </div>
    </div>
  );
}

export default Favoris;
