function NotFoundPage(){
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <p className="text-gray-500">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
