function FootHome() {
  const handleClick = () => {
    console.log('Bouton cliqué !');
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-4xl font-bold mt-16 sm:mt-36 text-center sm:text-center md:text-center text-thirdff">
        GET STARTED ?
      </h2>
      <div className="mt-4 sm:mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleClick}
          className="px-8 py-4 bg-thirdff text-bgff rounded-lg text-2xl font-bold "
        >
          Sign-Up !
        </button>
      </div>
    </div>
  );
}

export default FootHome;
