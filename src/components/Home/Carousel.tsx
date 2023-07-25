import myImage from '../../../img/images.jpeg';
import RecipeCard from '../RecipeCard/RecipeCard';

function Carousel() {
  return (
    <div className="carousel ">
      <div id="slide1" className="carousel-item relative w-full justify-center">
        <div className="absolute flex justify-between -translate-y-1/2 top-1/2 items-center">
          <a
            href="#slide4"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❮
          </a>
          <div className="m-4">
            <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
              Monday
            </div>
            <div className="space-y-4">
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            </div>
          </div>
          <div>
            <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
              Monday
            </div>
            <div className="space-y-4">
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            </div>
          </div>
          <a
            href="#slide2"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❯
          </a>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full justify-center">
        <div className="absolute flex justify-between -translate-y-1/2 top-1/2 items-center">
          <a
            href="#slide1"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❮
          </a>
          <div className="m-4">
            <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
              Monday
            </div>
            <div className="space-y-4">
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            </div>
          </div>
          <div>
            <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
              Monday
            </div>
            <div className="space-y-4">
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            </div>
          </div>
          <a
            href="#slide3"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❯
          </a>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full justify-center">
        <div className="absolute flex justify-between -translate-y-1/2 top-1/2 items-center">
          <a
            href="#slide2"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❮
          </a>
          <div className="m-4">
            <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
              Monday
            </div>
            <div className="space-y-4">
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            </div>
          </div>
          <div>
            <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
              Monday
            </div>
            <div className="space-y-4">
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
              <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            </div>
          </div>
          <a
            href="#slide4"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❯
          </a>
        </div>
      </div>

      <div id="slide4" className="carousel-item relative w-full justify-center">
        <div className="m-4">
          <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
            Monday
          </div>
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
        <div>
          <div className="mt-2 text-center sm:text-center md:text-center text-black m-4">
            Monday
          </div>
          <div className="space-y-4">
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
            <RecipeCard name="poulet" key="1" imageUrl={myImage} />
          </div>
        </div>
        <div className="absolute flex justify-between -translate-y-1/2 top-1/2 items-center">
          <a
            href="#slide3"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❮
          </a>

          <a
            href="#slide1"
            className="btn btn-circle bg-transparent border-transparent"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
