export interface User {
  firstName: string;
  lastName: string;
  email: string;
  favorites: Favorite[];
  schedules: Schedule[];
}

export interface Favorite {
  id: number;
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface Meal {
  id: number;
  idDbMeal: string;
  name: string;
  image: string;
  position: number;
}

export interface ScheduleType {
  week: number;
  meals: Meal[];
}
