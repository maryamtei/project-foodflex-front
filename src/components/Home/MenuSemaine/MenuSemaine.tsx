import RecipeCard from '../../RecipeCard/RecipeCard';

function MenuSemaine() {
  const myImage = '/images.jpeg';
  return (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
      <div>
        <div className=" text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Monday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Tuesday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Wednesday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Thursday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Friday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black">
          Saturday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-fourthff mt-2 text-center sm:text-center md:text-center text-black ">
          Sunday
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSemaine;
