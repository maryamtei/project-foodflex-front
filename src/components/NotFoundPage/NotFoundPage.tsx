function NotFoundPage() {
  return (
    <div className="relative translate-y-[-64px]">
      <img
        src="/ingredients.jpg"
        alt="Background"
        className="w-full h-screen sm:h-auto sm:max-h-128 object-cover object-bottom "
        style={{
          objectPosition: 'center top',
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <h1 className="w-auto text-2xl sm:text-3xl md:text-5xl  font-bold text-white text-center sm:text-center md:text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase">
        Culinary creativity unleashed with Food-flex!
      </h1>
    </div>
  );
}

export default NotFoundPage;
