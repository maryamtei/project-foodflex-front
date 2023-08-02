import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    // Container for the Not Found page
    <div
      className="relative"
      style={{
        height: '100vh',
        backgroundImage: "url('/404.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Absolute positioning for the link */}
      <div
        className="absolute inset-x-0 top-5 flex justify-center"
        style={{ marginBottom: '20px' }}
      >
        {/* Link to the home page */}
        <Link
          to="/"
          className="px-8 py-3 border-2 border-gray-500 focus:outline-none rounded-lg text-2xl font-bold text-center text-white bg-titleff hover:bg-thirdff hover:text-titleff"
        >
          HOME
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
