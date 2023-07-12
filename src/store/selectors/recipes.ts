import { Recipe } from '../../@types/recipe';

export default function findRecipe(recipes: Recipe[], searched: string) {
  const recipe = recipes.find((testedRecipe) => {
    return testedRecipe.name === searched;
  });
  return recipe;
}
