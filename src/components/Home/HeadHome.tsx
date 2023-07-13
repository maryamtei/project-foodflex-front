import 'react-responsive-carousel/lib/styles/carousel.min.css';

function HeadHome() {
  return (
    <div>
      <div>
        <div className="relative translate-y-[-64px]">
          <img
            src="/ingredients.jpg"
            alt="Background"
            className="w-full h-auto max-h-128 object-cover object-bottom "
            style={{
              objectPosition: 'center top',
            }}
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <h1 className="text-2xl sm:text-5xl  font-bold text-white text-center sm:text-center md:text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase">
            Culinary creativity unleashed with Food-flex!
          </h1>
        </div>
        <h2 className="text-thirdff text-3xl sm:text-4xl font-bold md:mb-20 mb-10 text-center sm:text-center md:text-center">
          HOW IT WORKS ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-fourthff">
          <div className="flex flex-col items-center">
            <img
              src="/images.jpeg"
              alt="imageHello"
              className="mt-4 rounded-full w-24 h-24 object-cover"
            />
            <div className=" mt-2 text-center sm:text-center md:text-center">
              My text
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images.jpeg"
              alt="image2"
              className="mt-4 rounded-full w-24 h-24 object-cover"
            />
            <div className="mt-2 text-center sm:text-center md:text-center">
              My text
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images.jpeg"
              alt="image3"
              className="mt-4 rounded-full w-24 h-24 object-cover"
            />
            <div className="mt-2 text-center sm:text-center md:text-center">
              My text
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadHome;
