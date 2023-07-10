export interface User {
  name: string;
  mail: string;
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
