interface IngredientsListProps {
  ingredients: string[];
  mesures: string[];
}

function IngredientsList({ ingredients, mesures }: IngredientsListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold py-2 text-bgff">
        Ingredients you need:
      </h2>
      <ol className="list-none list-inside py-2 p-10 text-lg ">
        {ingredients.map((ingredient, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="flex justify-center pb-2" key={`${ingredient}`}>
            <p className="font-semibold pr-2"> {ingredient}</p> -
            <p className="pl-2 italic">{mesures[index]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default IngredientsList;
