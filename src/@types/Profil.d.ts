export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favorites: Favorite[];
  schedule: Schedule[];
}

export interface Favorite {
  idMeal: number;
  name: string;
  imageUrl: string;
  position: number;
}

export interface Meal {
  idMeal: number;
  name: string;
  imageUrl: string;
  position: number;
}

export interface Schedule {
  week: number;
  meals: Meal[];
}
