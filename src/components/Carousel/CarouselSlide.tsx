import RecipeCard from '../RecipeCard/RecipeCard';

interface CarouselSlideProps {
  day: string;
}

export default function CarouselSlide({ day }: CarouselSlideProps) {
  const myImage = '/images.jpeg';
  return (
    <div className="p-4">
      <div className="py-4 text-center">{day}</div>
      <div className="space-y-4">
        <RecipeCard name="poulet" key="1" imageUrl={myImage} />
        <RecipeCard name="poulet" key="1" imageUrl={myImage} />
      </div>
    </div>
  );
}
