export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Favorite {
  idMeal: number;
  name: string;
  image: string;
  position: number;
}
export default interface Profil {
  user: User;
  favorites: Favorite[];
}
