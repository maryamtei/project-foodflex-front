import Carousel from '../Carousel/Carousel';
import MenuSemaine from './MenuSemaine/MenuSemaine';

function MainHome() {
  return (
    <div>
      <h2 className="text-lg sm:text-2xl font-bold mt-8 text-center sm:text-center md:text-center">
        EXAMPLE MENU
      </h2>

      <div className="sm:hidden block">
        <Carousel />
      </div>

      <div className="md:block hidden">
        <MenuSemaine />
      </div>
    </div>
  );
}

export default MainHome;
