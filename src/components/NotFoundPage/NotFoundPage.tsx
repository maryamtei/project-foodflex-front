import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="relative translate-y-[-64px]">
      <img
        src="./img/404.jpg"
        alt="Background"
        className="w-full h-screen sm:h-auto sm:max-h-128 object-cover object-bottom"
        style={{
          objectPosition: 'center top',
        }}
      />
      <div className="absolute inset-x-0 bottom-20 flex justify-center">
        <Link
          to="/"
          className="px-8 py-3 text-lg font-bold text-red-700 bg-fourthff rounded hover:bg-thirdff"
        >
          HOME
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
