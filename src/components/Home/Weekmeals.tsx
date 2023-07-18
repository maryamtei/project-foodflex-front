import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../@types/recipe';

interface RecipeProps {
  recipes: Recipe[];
}

function Weekmeals({ recipes }: RecipeProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4 p-8 ">
      <div>
        <div className=" text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Monday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[0].name}
              key={recipes[0].id}
              imageUrl={recipes[0].imageUrl}
            />
            <RecipeCard
              name={recipes[1].name}
              key={recipes[1].id}
              imageUrl={recipes[1].imageUrl}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Tuesday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[2].name}
              key={recipes[2].id}
              imageUrl={recipes[2].imageUrl}
            />
            <RecipeCard
              name={recipes[3].name}
              key={recipes[3].id}
              imageUrl={recipes[3].imageUrl}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Wednesday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[4].name}
              key={recipes[4].id}
              imageUrl={recipes[4].imageUrl}
            />
            <RecipeCard
              name={recipes[5].name}
              key={recipes[5].id}
              imageUrl={recipes[5].imageUrl}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Thursday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[6].name}
              key={recipes[6].id}
              imageUrl={recipes[6].imageUrl}
            />
            <RecipeCard
              name={recipes[7].name}
              key={recipes[7].id}
              imageUrl={recipes[7].imageUrl}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Friday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[8].name}
              key={recipes[8].id}
              imageUrl={recipes[8].imageUrl}
            />
            <RecipeCard
              name={recipes[9].name}
              key={recipes[9].id}
              imageUrl={recipes[9].imageUrl}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Saturday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[10].name}
              key={recipes[10].id}
              imageUrl={recipes[10].imageUrl}
            />
            <RecipeCard
              name={recipes[11].name}
              key={recipes[11].id}
              imageUrl={recipes[11].imageUrl}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black ">
          Sunday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard
              name={recipes[12].name}
              key={recipes[12].id}
              imageUrl={recipes[12].imageUrl}
            />
            <RecipeCard
              name={recipes[13].name}
              key={recipes[13].id}
              imageUrl={recipes[13].imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weekmeals;
