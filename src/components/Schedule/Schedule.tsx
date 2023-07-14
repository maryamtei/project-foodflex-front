import fakeDay from '../../fakeData/fakeDay.json';
import Day from './Day';

function Schedule() {
  return (
    <div className="container mt-28 px-6">
      <div className="grid m-2 grid-cols-2 gap-6">
        {fakeDay.map((day) => (
          <Day key={day.id} day={day.position} />
        ))}
      </div>
    </div>
  );
}

export default Schedule;
