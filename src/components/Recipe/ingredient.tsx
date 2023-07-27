import { v4 as uuidv4 } from 'uuid';

interface IngredientsListProps {
  ingredients: string[];
  mesures: string[];
}

function IngredientsList({ ingredients, mesures }: IngredientsListProps) {
  return (
    <div className="justify-center text-center foodPattern bg-opacity-25 p-4 rounded-xl shadow-md border border-fourthff text-bgff">
      <h2 className="text-2xl font-bold py-2 text-bgff">
        Ingredients you need:
      </h2>
      <ol className="list-none list-inside py-2 p-10 text-lg">
        {ingredients.map((ingredient, index) => (
          <li className="flex justify-center pb-2" key={uuidv4()}>
            <p className="font-semibold pr-2"> {ingredient}</p> -
            <p className="pl-2 italic truncate">{mesures[index]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default IngredientsList;
