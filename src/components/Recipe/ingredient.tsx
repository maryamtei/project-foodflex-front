// Define the type for the props that the IngredientsList component receives
interface IngredientsListProps {
  ingredients: string[];
  mesures: string[];
}

// IngredientsList component displays the list of ingredients and their measures
function IngredientsList({ ingredients, mesures }: IngredientsListProps) {
  return (
    // Container for the ingredients list
    <div className="justify-center text-center foodPattern bg-opacity-25 p-4 rounded-xl shadow-md border border-fourthff text-bgff">
      <h2 className="text-2xl font-bold py-2 text-bgff">
        Ingredients you need:
      </h2>
      {/* Ordered list to display ingredients */}
      <ol className="list-none list-inside py-2 p-10 text-lg">
        {/* Map through the ingredients and their measures */}
        {ingredients.map((ingredient, index) => (
          // List item for each ingredient and its measure
          <li
            className="flex justify-center pb-2"
            key={`${ingredient}_${mesures[index]}`}
          >
            {/* Display the ingredient name */}
            <p className="font-semibold pr-2"> {ingredient}</p> -
            {/* Display the measure for the ingredient */}
            <p className="pl-2 italic truncate">{mesures[index]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default IngredientsList;
