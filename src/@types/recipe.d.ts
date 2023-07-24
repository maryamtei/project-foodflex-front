export interface Recipe {
  id: number;
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface RecipeWithoutId {
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

export interface MealAdd {
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface Category {
  id: number;
  name: string;
  unavailable: boolean;
}

export type SelectedCategory = Category | undefined;
