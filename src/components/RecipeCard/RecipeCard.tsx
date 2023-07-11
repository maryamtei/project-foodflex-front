import { Plus, Heart } from 'react-feather';

interface CardProps {
  name: string;
  imageUrl: string;
}

function RecipeCard({ name, imageUrl }: CardProps) {
  return (
    <div className="shadow-md rounded-lg relative hover:shadow-lg transition-all">
      <img src={imageUrl} alt={name} className="rounded-t-md cover" />
      <div className="text-bgff absolute top-2 right-1">
        <div className="card-actions justify-end">
          <a href="./">
            <Heart />
          </a>
          <a href="./">
            <Plus />
          </a>
        </div>
      </div>
      <div className="rounded-b-lg">
        <h2 className="text-thirdff p-2 text-center truncate">{name}</h2>
      </div>
    </div>
  );
}

export default RecipeCard;
