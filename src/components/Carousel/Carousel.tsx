import NukaCarousel from 'nuka-carousel';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import dayjs from 'dayjs';
import { Recipe } from '../../@types/recipe';
import { useAppSelector } from '../../hooks/redux';
import CarouselSlide from './CarouselSlide';

const PLACEHOLDER_MEAL = {
  name: 'burger',
  image: '/burger.svg',
  id: 1,
};

interface RecipeProps {
  meals: Recipe[];
}
function Carousel({ meals }: RecipeProps) {
  const currentWeek = useAppSelector((state) => state.settings.currentWeek);

  const innerWidth = useAppSelector((state) => state.window.innerWidth);
  const changeSlidesToShow = () => {
    switch (true) {
      case innerWidth < 640:
        return 2;
      case innerWidth >= 640 && innerWidth < 800:
        return 3;
      case innerWidth >= 800 && innerWidth < 960:
        return 4;
      case innerWidth >= 960 && innerWidth < 1120:
        return 5;
      case innerWidth >= 1120 && innerWidth < 1280:
        return 6;
      default:
        return 7;
    }
  };

  const getMealByPosition = useCallback(
    (position: number) => {
      const foundMeal = meals.find((meal) => meal.position === position);

      if (!foundMeal) {
        return {
          ...PLACEHOLDER_MEAL,
          position,
          idDbMeal: position.toString(),
        };
      }

      return foundMeal;
    },
    [meals]
  );

  return (
    <div className="text-fourthff max-w-max m-auto">
      <NukaCarousel
        slidesToShow={changeSlidesToShow()}
        renderBottomCenterControls={null}
        enableKeyboardControls
        dragging={false}
        swiping={false}
        className="border p-4 bg-[rgba(255,155,144,0.3)] rounded-lg shadow-lg border-fourthff"
        renderCenterLeftControls={({ previousSlide, previousDisabled }) => {
          if (previousDisabled) {
            return null;
          }
          return (
            <button
              type="button"
              onClick={previousSlide}
              className="absolute left-0"
            >
              <ChevronLeft size={48} />
            </button>
          );
        }}
        renderCenterRightControls={({ nextSlide, nextDisabled }) => {
          if (nextDisabled) {
            return null;
          }
          return (
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-0"
            >
              <ChevronRight size={48} />
            </button>
          );
        }}
      >
        <CarouselSlide
          recipe1={getMealByPosition(0)}
          recipe2={getMealByPosition(1)}
          day={dayjs().week(currentWeek).day(1).format('ddd DD MMM')}
        />
        <CarouselSlide
          recipe1={getMealByPosition(2)}
          recipe2={getMealByPosition(3)}
          day={dayjs().week(currentWeek).day(2).format('ddd DD MMM')}
        />
        <CarouselSlide
          recipe1={getMealByPosition(4)}
          recipe2={getMealByPosition(5)}
          day={dayjs().week(currentWeek).day(3).format('ddd DD MMM')}
        />
        <CarouselSlide
          recipe1={getMealByPosition(6)}
          recipe2={getMealByPosition(7)}
          day={dayjs().week(currentWeek).day(4).format('ddd DD MMM')}
        />
        <CarouselSlide
          recipe1={getMealByPosition(8)}
          recipe2={getMealByPosition(9)}
          day={dayjs().week(currentWeek).day(5).format('ddd DD MMM')}
        />
        <CarouselSlide
          recipe1={getMealByPosition(10)}
          recipe2={getMealByPosition(11)}
          day={dayjs().week(currentWeek).day(6).format('ddd DD MMM')}
        />
        <CarouselSlide
          recipe1={getMealByPosition(12)}
          recipe2={getMealByPosition(13)}
          day={dayjs()
            .week(currentWeek + 1)
            .day(0)
            .format('ddd DD MMM')}
        />
      </NukaCarousel>
    </div>
  );
}

export default Carousel;
