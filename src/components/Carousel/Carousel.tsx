import NukaCarousel from 'nuka-carousel';
import { ChevronLeft, ChevronRight } from 'react-feather';
import CarouselSlide from './CarouselSlide';

function Carousel() {
  return (
    <div className="px-6">
      <NukaCarousel
        slidesToShow={2}
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
              className="absolute -left-10"
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
              className="absolute -right-10"
            >
              <ChevronRight size={48} />
            </button>
          );
        }}
      >
        <CarouselSlide day="Monday" />
        <CarouselSlide day="Tuesday" />
        <CarouselSlide day="Wednesday" />
        <CarouselSlide day="Thursday" />
        <CarouselSlide day="Friday" />
        <CarouselSlide day="Saturday" />
        <CarouselSlide day="Sunday" />
      </NukaCarousel>
    </div>
  );
}

export default Carousel;
