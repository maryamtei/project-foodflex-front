export interface Recipe {
  idMeal: string;
  name: string;
  imageUrl: string;
  position: number;
}

export interface RecipeDetails {
  id: string;
  name: string;
  imageUrl: string;
  instruction: string;
  ingredients: string[];
  mesures: string[];
}
