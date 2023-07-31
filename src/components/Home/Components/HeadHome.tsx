import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HowItWorks from './HowItWorks';

function HeadHome() {
  return (
    <div>
      <div>
        <div className="relative translate-y-[-64px]">
          <img
            src="/ingredients.jpg"
            alt="Background"
            className="w-full h-screen sm:h-auto sm:max-h-128 object-cover object-bottom "
            style={{
              objectPosition: 'center top',
            }}
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <h1 className="w-auto text-2xl sm:text-3xl md:text-5xl  font-bold text-white text-center sm:text-center md:text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase">
            Culinary creativity unleashed with Food-flex!
          </h1>
        </div>
        <h2 className="text-titleff text-3xl sm:text-4xl font-bold mb-0 text-center sm:text-center md:text-center">
          HOW IT WORKS ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-500">
          <HowItWorks
            imageHome="./poke.png"
            content="Immerse yourself in our collection of recipes designed for the delight of your taste buds, promising a gastronomic journey of unparalleled pleasure"
          />
          <HowItWorks
            imageHome="./calendar.png"
            content="Orchestrate your culinary journey for the current week and the next ones, delineating a gastronomic roadmap for your upcoming meals"
          />
          <HowItWorks
            imageHome="./shoppingList.png"
            content="Employ the convenience of exporting your grocery list, a feature designed to streamline your life, leaving you more time to relish the joys of cooking"
          />
        </div>
      </div>
    </div>
  );
}

export default HeadHome;
