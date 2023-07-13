import Carousel from '../Carousel/Carousel';
import MenuSemaine from './MenuSemaine/MenuSemaine';

function MainHome() {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold mt-36 text-center sm:text-center md:text-center text-thirdff">
        EXAMPLE MENU
      </h2>

      <div className="sm:hidden mt-10 block">
        <Carousel />
      </div>

      <div className="md:block md:mt-20 hidden ">
        <MenuSemaine />
      </div>
    </div>
  );
}

export default MainHome;
