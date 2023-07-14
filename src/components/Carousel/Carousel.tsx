import NukaCarousel from 'nuka-carousel';
import { ChevronLeft, ChevronRight } from 'react-feather';
import CarouselSlide from './CarouselSlide';
import { Recipe } from '../../@types/recipe';
import { useAppSelector } from '../../hooks/redux';

interface RecipeProps {
  recipes: Recipe[];
}
function Carousel({ recipes }: RecipeProps) {
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
  return (
    <div className="px-6 text-fourthff">
      <NukaCarousel
        slidesToShow={changeSlidesToShow()}
        renderBottomCenterControls={null}
        enableKeyboardControls
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
        <CarouselSlide recipe1={recipes[0]} recipe2={recipes[1]} day="Monday" />
        <CarouselSlide
          recipe1={recipes[2]}
          recipe2={recipes[3]}
          day="Tuesday"
        />
        <CarouselSlide
          recipe1={recipes[4]}
          recipe2={recipes[5]}
          day="Wednesday"
        />
        <CarouselSlide
          recipe1={recipes[6]}
          recipe2={recipes[7]}
          day="Thursday"
        />
        <CarouselSlide recipe1={recipes[8]} recipe2={recipes[9]} day="Friday" />
        <CarouselSlide
          recipe1={recipes[10]}
          recipe2={recipes[11]}
          day="Saturday"
        />
        <CarouselSlide
          recipe1={recipes[12]}
          recipe2={recipes[13]}
          day="Sunday"
        />
      </NukaCarousel>
    </div>
  );
}

export default Carousel;
