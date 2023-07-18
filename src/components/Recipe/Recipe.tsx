interface RecipeProps {
  name: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
}

const recipe = {
  name: 'Spaghetti Bolognese',
  imageUrl: 'https://example.com/spaghetti.jpg',
  ingredients: [
    '500g ground beef',
    '1 onion, diced',
    '2 cloves of garlic, minced',
    '1 can crushed tomatoes',
    '1/4 cup tomato paste',
    '1 tsp dried basil',
    '1 tsp dried oregano',
    'Salt and pepper to taste',
    '250g spaghetti',
  ],
  instructions: [
    'In a large pan, cook the ground beef over medium heat until browned.',
    'Add the onion and garlic, and cook until the onion is softened.',
    'Stir in the crushed tomatoes, tomato paste, basil, oregano, salt, and pepper. Simmer for 20 minutes.',
    'Meanwhile, cook the spaghetti according to the package instructions until al dente. Drain.',
    'Serve the spaghetti topped with the Bolognese sauce. Enjoy!',
  ],
};

function Recipe({ name, imageUrl, ingredients, instructions }: RecipeProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{recipe.name}</h1>

      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="mb-6 rounded-lg"
      />
      <div className="flex flex-col md:flex-row">
        <div className="md:hidden  md:w-1/3 md:pl-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-xl font-bold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={instruction}> {instruction}</li>
            ))}
          </ol>
        </div>
        <div className="hidden md:block md:w-1/3 md:pl-8 ">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
