export interface Recipe {
  id: number;
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface RecipeDetails {
  id: string;
  name: string;
  imageUrl: string;
  instruction: string;
  ingredients: string[];
  mesures: string[];
  videoUrl: string;
}
