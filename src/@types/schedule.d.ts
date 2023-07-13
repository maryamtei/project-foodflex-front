export interface Week {
  idMeal: number;
  name: string;
  image: string;
  position: number;
}

export interface Schedule {
  week: Week[];
}
