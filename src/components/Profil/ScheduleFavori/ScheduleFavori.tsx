import SelectedDay from './SelectedDay';
import fakeDay from '../../../fakeData/fakeDay.json';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { nextWeek } from '../../../store/reducers/settings';

function Favoris() {
  const currentWeek = useAppSelector((state) => state.settings.currentWeek);

  const currentSchedule = fakeDay?.find((week) => week.week === currentWeek);

  const dispatch = useAppDispatch();

  function handleClickNextWeek() {
    dispatch(nextWeek(true));
  }
  function handleClickBeforeWeek() {
    dispatch(nextWeek(false));
  }
  return (
    <div className="container px-6">
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          type="button"
          className="btn"
          onClick={() => handleClickBeforeWeek()}
        >
          Before
        </button>
        <p>Week : {currentSchedule?.week} </p>
        <button
          type="button"
          className="btn"
          onClick={() => handleClickNextWeek()}
        >
          Next
        </button>
      </div>
      <div className="grid m-2 grid-cols-2 gap-6">
        {currentSchedule?.meals.map((meal) => (
          <SelectedDay
            key={meal.id}
            day={meal.position}
            currentWeek={currentWeek}
          />
        ))}
      </div>
    </div>
  );
}

export default Favoris;
