// Import the required CSS for the carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Import the HowItWorks component
import HowItWorks from './HowItWorks';

// HeadHome component represents the top section of the home page
function HeadHome() {
  return (
    <div>
      {/* Container for the top section */}
      <div>
        {/* Background image section */}
        <div className="relative translate-y-[-64px]">
          {/* Background image */}
          <div
            className="relative bg-cover bg-center"
            style={{
              backgroundImage: `url('/ingredients.jpg')`,
              height: '750px',
            }}
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-50" />
          {/* Title */}
          <h1 className="w-auto text-2xl sm:text-3xl md:text-5xl  font-bold text-white text-center sm:text-center md:text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase">
            Culinary creativity unleashed with Food-flex!
          </h1>
        </div>
        {/* Section title */}
        <h2 className="text-titleff text-3xl sm:text-4xl font-bold mb-0 text-center sm:text-center md:text-center">
          HOW IT WORKS ?
        </h2>
        {/* Grid layout for the HowItWorks components */}
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 text-gray-500">
          {/* Display the HowItWorks component with poke image and content */}
          <HowItWorks
            imageHome="./poke.png"
            content="Immerse yourself in our collection of recipes designed for the delight of your taste buds, promising a gastronomic journey of unparalleled pleasure"
          />
          {/* Display the HowItWorks component with calendar image and content */}
          <HowItWorks
            imageHome="./calendar.png"
            content="Orchestrate your culinary journey for the current week and the next ones, delineating a gastronomic roadmap for your upcoming meals"
          />
          {/* Display the HowItWorks component with shoppingList image and content */}
          <HowItWorks
            imageHome="./shoppingList.png"
            content="Employ the convenience of exporting your grocery list, a feature designed to streamline your life, leaving you more time to relish the joys of cooking"
          />
        </div>
      </div>
    </div>
  );
}

// Export the HeadHome component as the default export
export default HeadHome;
