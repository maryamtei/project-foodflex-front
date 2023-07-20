export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favorites: Favorite[];
  schedules: Schedule[];
}

export interface Favorite {
  id: string;
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface Meal {
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface Schedule {
  week: number;
  meals: Meal[];
}
