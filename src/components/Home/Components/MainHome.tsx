// Import the required modules and components
import Carousel from '../../Carousel/Carousel'; // Custom Carousel component for displaying recipes
import { Recipe } from '../../../@types/recipe'; // Import the Recipe type
import HomeTitle from './HomeTitles'; // Custom HomeTitle component for displaying section titles

// Define the props interface for the MainHome component
interface RecipeProps {
  recipes: Recipe[]; // An array of recipes to be displayed in the carousel
}

// MainHome component displays a carousel with example menu recipes
function MainHome({ recipes }: RecipeProps) {
  return (
    // Main container for the component
    <div>
      {/* Display the section title using the HomeTitle component */}
      <HomeTitle content="EXAMPLE MENU" />
      <div className="px-6">
        {/* Use the Carousel component to display the recipe cards */}
        <Carousel meals={recipes} />
      </div>
    </div>
  );
}

// Export the MainHome component as the default export
export default MainHome;
